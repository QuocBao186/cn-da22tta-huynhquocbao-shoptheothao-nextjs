const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

async function testCartFlow() {
  let connection;
  
  try {
    console.log('🛒 Testing cart and checkout flow...');
    
    // Kết nối database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });
    
    console.log('✅ Database connected');
    
    // Kiểm tra user
    const [users] = await connection.execute('SELECT id, name, email, role FROM users WHERE email = ?', ['q.bao2k4@gmail.com']);
    const user = users[0];
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('👤 User:', user);
    
    // Kiểm tra cart table
    const [cartItems] = await connection.execute('SELECT * FROM cart WHERE user_id = ?', [user.id]);
    console.log('🛒 Cart items:', cartItems);
    
    // Kiểm tra products
    const [products] = await connection.execute('SELECT id, name, price, stock FROM products LIMIT 3');
    console.log('🛍️ Products:', products);
    
    // Kiểm tra orders
    const [orders] = await connection.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [user.id]);
    console.log('📦 Orders:', orders);
    
    // Tạo JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      'your-secret-key',
      { expiresIn: '7d' }
    );
    
    console.log('🎫 JWT Token:', token);
    
    console.log('\n🎉 Cart flow test completed!');
    console.log('\n📝 Instructions:');
    console.log('1. Truy cập: http://localhost:3000');
    console.log('2. Đăng nhập với email: q.bao2k4@gmail.com, password: admin123');
    console.log('3. Thêm sản phẩm vào giỏ hàng');
    console.log('4. Vào trang giỏ hàng để kiểm tra');
    console.log('5. Bấm thanh toán để test checkout');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testCartFlow();
