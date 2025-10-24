const mysql = require('mysql2/promise');

async function testOrders() {
  let connection;
  
  try {
    console.log('🧪 Testing orders system...');
    
    // Kết nối database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });
    
    console.log('✅ Database connected');
    
    // Kiểm tra bảng orders
    const [orders] = await connection.execute('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');
    console.log('📦 Recent orders:', orders);
    
    // Kiểm tra bảng order_items
    const [orderItems] = await connection.execute('SELECT * FROM order_items ORDER BY id DESC LIMIT 5');
    console.log('📋 Recent order items:', orderItems);
    
    // Kiểm tra users
    const [users] = await connection.execute('SELECT id, name, email, role FROM users LIMIT 5');
    console.log('👥 Users:', users);
    
    // Kiểm tra products
    const [products] = await connection.execute('SELECT id, name, price, stock FROM products LIMIT 5');
    console.log('🛍️ Products:', products);
    
    console.log('\n🎉 Orders system test completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testOrders();
