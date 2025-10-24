const mysql = require('mysql2/promise');

const config = {
  DATABASE: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sports_store',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
};

async function checkAndFixAdminRole() {
  let connection;
  try {
    console.log('🔧 Checking admin role...');
    connection = await mysql.createConnection({
      host: config.DATABASE.host,
      user: config.DATABASE.user,
      password: config.DATABASE.password,
      port: config.DATABASE.port,
      database: config.DATABASE.database,
    });
    console.log('✅ Connected to MySQL server');

    // Kiểm tra tài khoản admin
    const [users] = await connection.query(
      'SELECT id, email, role FROM users WHERE email = ?',
      ['admin@sportsstore.com']
    );

    if (users.length === 0) {
      console.log('❌ Admin account not found');
      return;
    }

    const adminUser = users[0];
    console.log('📋 Current admin user:', adminUser);

    if (adminUser.role !== 'admin') {
      console.log('🔧 Updating admin role...');
      await connection.query(
        'UPDATE users SET role = ? WHERE email = ?',
        ['admin', 'admin@sportsstore.com']
      );
      console.log('✅ Updated admin role to "admin"');
    } else {
      console.log('✅ Admin role is already correct');
    }

    // Kiểm tra lại
    const [updatedUsers] = await connection.query(
      'SELECT id, email, role FROM users WHERE email = ?',
      ['admin@sportsstore.com']
    );
    console.log('📋 Updated admin user:', updatedUsers[0]);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) await connection.end();
  }
}

checkAndFixAdminRole();
