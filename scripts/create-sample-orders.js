const mysql = require('mysql2/promise');

async function createSampleOrders() {
  let connection;
  
  try {
    console.log('🛍️ Creating sample orders...');
    
    // Kết nối database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });
    
    console.log('✅ Database connected');
    
    // Xóa đơn hàng cũ
    await connection.execute('DELETE FROM order_items');
    await connection.execute('DELETE FROM orders');
    console.log('🗑️ Cleared old orders');
    
    // Tạo đơn hàng mẫu
    const [orderResult] = await connection.execute(`
      INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      1, // user_id
      120000, // total_amount (120k VND)
      'pending',
      JSON.stringify({
        firstName: 'Quốc Bảo',
        lastName: 'Nguyễn',
        email: 'q.bao2k4@gmail.com',
        phone: '0123456789',
        address: '123 Đường ABC',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng'
      }),
      'cod',
      'Giao hàng vào cuối tuần'
    ]);
    
    const orderId = orderResult.insertId;
    
    // Tạo order items
    await connection.execute(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `, [orderId, 10, 1, 120000]); // Nike Air Max 270
    
    console.log('✅ Sample order created with ID:', orderId);
    
    // Tạo đơn hàng thứ 2
    const [orderResult2] = await connection.execute(`
      INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      1, // user_id
      245000, // total_amount (245k VND)
      'confirmed',
      JSON.stringify({
        firstName: 'Quốc Bảo',
        lastName: 'Nguyễn',
        email: 'q.bao2k4@gmail.com',
        phone: '0123456789',
        address: '123 Đường ABC',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng'
      }),
      'bank_transfer',
      ''
    ]);
    
    const orderId2 = orderResult2.insertId;
    
    // Tạo order items cho đơn hàng thứ 2
    await connection.execute(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `, [orderId2, 11, 1, 180000]); // Adidas Ultraboost 22
    
    await connection.execute(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `, [orderId2, 13, 2, 32500]); // 2x Nike Dri-FIT T-Shirt
    
    console.log('✅ Sample order 2 created with ID:', orderId2);
    
    console.log('\n🎉 Sample orders created successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createSampleOrders();
