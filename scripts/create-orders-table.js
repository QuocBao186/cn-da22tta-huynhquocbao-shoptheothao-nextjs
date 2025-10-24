const mysql = require('mysql2/promise');

async function createOrdersTable() {
  let connection;
  
  try {
    console.log('🔧 Creating orders and order_items tables...');
    
    // Kết nối database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });
    
    console.log('✅ Database connected');
    
    // Tạo bảng orders
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        shipping_address TEXT,
        payment_method VARCHAR(50) DEFAULT 'cod',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    console.log('✅ Orders table created');
    
    // Tạo bảng order_items
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    
    console.log('✅ Order items table created');
    
    // Tạo sample orders
    await connection.execute(`
      INSERT IGNORE INTO orders (user_id, total_amount, status) VALUES
      (1, 150.00, 'pending'),
      (1, 250.00, 'confirmed'),
      (1, 100.00, 'delivered')
    `);
    
    console.log('✅ Sample orders created');
    
    // Tạo sample order items
    await connection.execute(`
      INSERT IGNORE INTO order_items (order_id, product_id, quantity, price) VALUES
      (1, 1, 2, 75.00),
      (1, 2, 1, 75.00),
      (2, 3, 1, 250.00),
      (3, 1, 1, 100.00)
    `);
    
    console.log('✅ Sample order items created');
    
    console.log('\n🎉 Orders system setup completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createOrdersTable();
