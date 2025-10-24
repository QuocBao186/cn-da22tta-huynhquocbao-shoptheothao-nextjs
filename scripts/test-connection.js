const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('🔍 Testing MySQL connection...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
    });

    console.log('✅ Successfully connected to MySQL server');
    
    // Test database creation
    await connection.query('CREATE DATABASE IF NOT EXISTS sports_store');
    console.log('✅ Database sports_store created or exists');
    
    // Test using database
    await connection.query('USE sports_store');
    console.log('✅ Using database sports_store');
    
    // Test table creation
    await connection.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
      )
    `);
    console.log('✅ Table creation works');
    
    // Test insert
    await connection.query('INSERT INTO test_table (name) VALUES (?)', ['test']);
    console.log('✅ Insert operation works');
    
    // Test select
    const [rows] = await connection.query('SELECT * FROM test_table');
    console.log('✅ Select operation works:', rows);
    
    // Clean up
    await connection.query('DROP TABLE test_table');
    console.log('✅ Cleanup completed');
    
    await connection.end();
    console.log('🎉 All tests passed! Database is ready.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure XAMPP is running');
    console.log('2. Start MySQL service in XAMPP Control Panel');
    console.log('3. Check if port 3306 is available');
    console.log('4. Verify MySQL credentials');
    process.exit(1);
  }
}

testConnection();
