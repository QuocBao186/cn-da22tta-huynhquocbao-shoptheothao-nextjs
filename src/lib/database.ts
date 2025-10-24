import mysql from 'mysql2/promise';
import { config } from './config';

const dbConfig = {
  ...config.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool: mysql.Pool | null = null;

export async function getConnection() {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      console.log('MySQL connection pool created');
    } catch (error) {
      console.error('Error creating connection pool:', error);
      throw error;
    }
  }
  return pool;
}

export async function getConnectionForTransaction() {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      console.log('MySQL connection pool created');
    } catch (error) {
      console.error('Error creating connection pool:', error);
      throw error;
    }
  }
  return pool;
}

export async function closeConnection() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('Database connection pool closed');
  }
}

// Tạo database nếu chưa tồn tại
export async function initializeDatabase() {
  try {
    const tempConnection = await mysql.createConnection({
      host: config.DATABASE.host,
      user: config.DATABASE.user,
      password: config.DATABASE.password,
      port: config.DATABASE.port,
    });

    await tempConnection.execute('CREATE DATABASE IF NOT EXISTS sports_store');
    await tempConnection.end();

    const conn = await getConnection();
    
    // Tạo bảng users
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tạo bảng products
    await conn.execute(`
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

    // Tạo bảng cart
    await conn.execute(`
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

    // Thêm dữ liệu mẫu cho products
    const [existingProducts] = await conn.execute('SELECT COUNT(*) as count FROM products');
    if ((existingProducts as any)[0].count === 0) {
      await conn.execute(`
        INSERT INTO products (name, description, price, image, category, stock) VALUES
        ('Nike Air Max 270', 'Comfortable running shoes with Air Max technology', 120.00, '/images/nike-air-max-270.jpg', 'Shoes', 50),
        ('Adidas Ultraboost 22', 'High-performance running shoes', 180.00, '/images/adidas-ultraboost-22.jpg', 'Shoes', 30),
        ('Puma RS-X', 'Retro-inspired lifestyle sneakers', 90.00, '/images/puma-rs-x.jpg', 'Shoes', 25),
        ('Nike Dri-FIT T-Shirt', 'Moisture-wicking athletic t-shirt', 25.00, '/images/nike-dri-fit.jpg', 'Clothing', 100),
        ('Adidas Originals Hoodie', 'Classic three-stripe hoodie', 65.00, '/images/adidas-hoodie.jpg', 'Clothing', 40),
        ('Puma Training Shorts', 'Lightweight training shorts', 35.00, '/images/puma-shorts.jpg', 'Clothing', 60)
      `);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
