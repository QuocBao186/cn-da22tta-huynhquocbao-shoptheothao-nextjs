const mysql = require('mysql2/promise');

async function initializeDatabase() {
  try {
    // Kết nối đến MySQL server (không chỉ định database)
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Mặc định XAMPP không có password
      port: 3306,
    });

    console.log('Connected to MySQL server');

    // Tạo database
    await connection.query('CREATE DATABASE IF NOT EXISTS sports_store');
    console.log('Database sports_store created or already exists');

    // Chuyển sang database sports_store
    await connection.query('USE sports_store');

    // Tạo bảng users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table users created or already exists');

    // Tạo bảng products
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255),
        category VARCHAR(100),
        stock INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table products created or already exists');

    // Tạo bảng cart
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product (user_id, product_id)
      )
    `);
    console.log('Table cart created or already exists');

    // Kiểm tra xem đã có dữ liệu mẫu chưa
    const [existingProducts] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (existingProducts[0].count === 0) {
      // Thêm dữ liệu mẫu cho products
      await connection.query(`
        INSERT INTO products (name, description, price, image, category, stock) VALUES
        ('Nike Air Max 270', 'Comfortable running shoes with Air Max technology', 120.00, '/images/nike-air-max-270.jpg', 'Shoes', 50),
        ('Adidas Ultraboost 22', 'High-performance running shoes', 180.00, '/images/adidas-ultraboost-22.jpg', 'Shoes', 30),
        ('Puma RS-X', 'Retro-inspired lifestyle sneakers', 90.00, '/images/puma-rs-x.jpg', 'Shoes', 25),
        ('Nike Dri-FIT T-Shirt', 'Moisture-wicking athletic t-shirt', 25.00, '/images/nike-dri-fit.jpg', 'Clothing', 100),
        ('Adidas Originals Hoodie', 'Classic three-stripe hoodie', 65.00, '/images/adidas-hoodie.jpg', 'Clothing', 40),
        ('Puma Training Shorts', 'Lightweight training shorts', 35.00, '/images/puma-shorts.jpg', 'Clothing', 60)
      `);
      console.log('Sample products added');
    }

    await connection.end();
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
