const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

async function testAuth() {
  let connection;
  
  try {
    console.log('🔐 Testing authentication system...');
    
    // Kết nối database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });
    
    console.log('✅ Database connected');
    
    // Kiểm tra users
    const [users] = await connection.execute('SELECT id, name, email, role FROM users');
    console.log('👥 Users:', users);
    
    // Test JWT token
    const testUser = users[0];
    if (testUser) {
      const token = jwt.sign(
        { userId: testUser.id, email: testUser.email, role: testUser.role },
        'your-secret-key',
        { expiresIn: '7d' }
      );
      
      console.log('🎫 Test token:', token);
      
      // Verify token
      const decoded = jwt.verify(token, 'your-secret-key');
      console.log('✅ Decoded token:', decoded);
    }
    
    console.log('\n🎉 Authentication test completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testAuth();
