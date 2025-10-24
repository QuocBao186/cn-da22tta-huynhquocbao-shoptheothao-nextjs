const mysql = require('mysql2/promise');

const config = {
  DATABASE: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sports_store',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
};

async function addAdminRole() {
  let connection;
  try {
    console.log('🔧 Adding admin role to users table...');
    connection = await mysql.createConnection({
      host: config.DATABASE.host,
      user: config.DATABASE.user,
      password: config.DATABASE.password,
      port: config.DATABASE.port,
      database: config.DATABASE.database,
    });
    console.log('✅ Connected to MySQL server');

    // Thêm cột role vào bảng users
    await connection.query(`
      ALTER TABLE users 
      ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' AFTER password
    `);
    console.log('✅ Added role column to users table');

    // Tạo tài khoản admin mặc định
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await connection.query(`
      INSERT INTO users (email, password, name, role) 
      VALUES ('admin@sportsstore.com', ?, 'Administrator', 'admin')
      ON DUPLICATE KEY UPDATE role = 'admin'
    `, [hashedPassword]);
    console.log('✅ Created default admin account: admin@sportsstore.com / admin123');

    console.log('\n🎉 Admin role setup completed!');
    console.log('\n📋 Admin credentials:');
    console.log('Email: admin@sportsstore.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error adding admin role:', error);
  } finally {
    if (connection) await connection.end();
  }
}

addAdminRole();
