const mysql = require('mysql2/promise');

async function fixDatabase() {
  try {
    console.log('🔧 Fixing database schema...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
    });

    console.log('✅ Connected to MySQL server');

    // Chuyển sang database sports_store
    await connection.query('USE sports_store');
    console.log('✅ Using database sports_store');

    // Kiểm tra cấu trúc bảng products hiện tại
    console.log('\n📋 Current products table structure:');
    const [columns] = await connection.query('DESCRIBE products');
    console.table(columns);

    // Thêm cột image nếu chưa có
    try {
      await connection.query('ALTER TABLE products ADD COLUMN image VARCHAR(255)');
      console.log('✅ Added image column to products table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  Image column already exists');
      } else {
        throw error;
      }
    }

    // Thêm cột stock nếu chưa có
    try {
      await connection.query('ALTER TABLE products ADD COLUMN stock INT DEFAULT 0');
      console.log('✅ Added stock column to products table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  Stock column already exists');
      } else {
        throw error;
      }
    }

    // Thêm cột category nếu chưa có
    try {
      await connection.query('ALTER TABLE products ADD COLUMN category VARCHAR(100)');
      console.log('✅ Added category column to products table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  Category column already exists');
      } else {
        throw error;
      }
    }

    // Xóa dữ liệu cũ và thêm dữ liệu mới
    console.log('\n🔄 Replacing sample data...');
    await connection.query('DELETE FROM products');
    
    await connection.query(`
      INSERT INTO products (name, description, price, image, category, stock, slug) VALUES
      ('Nike Air Max 270', 'Comfortable running shoes with Air Max technology', 120.00, '/images/nike-air-max-270.jpg', 'Shoes', 50, 'nike-air-max-270'),
      ('Adidas Ultraboost 22', 'High-performance running shoes', 180.00, '/images/adidas-ultraboost-22.jpg', 'Shoes', 30, 'adidas-ultraboost-22'),
      ('Puma RS-X', 'Retro-inspired lifestyle sneakers', 90.00, '/images/puma-rs-x.jpg', 'Shoes', 25, 'puma-rs-x'),
      ('Nike Dri-FIT T-Shirt', 'Moisture-wicking athletic t-shirt', 25.00, '/images/nike-dri-fit.jpg', 'Clothing', 100, 'nike-dri-fit-tshirt'),
      ('Adidas Originals Hoodie', 'Classic three-stripe hoodie', 65.00, '/images/adidas-hoodie.jpg', 'Clothing', 40, 'adidas-originals-hoodie'),
      ('Puma Training Shorts', 'Lightweight training shorts', 35.00, '/images/puma-shorts.jpg', 'Clothing', 60, 'puma-training-shorts')
    `);

    console.log('✅ Added new sample data with correct schema');

    // Kiểm tra cấu trúc bảng products sau khi sửa
    console.log('\n📋 Updated products table structure:');
    const [updatedColumns] = await connection.query('DESCRIBE products');
    console.table(updatedColumns);

    // Kiểm tra dữ liệu
    console.log('\n📊 Sample products data:');
    const [products] = await connection.query('SELECT id, name, price, image, stock FROM products LIMIT 3');
    console.table(products);

    await connection.end();
    console.log('\n🎉 Database schema fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing database:', error.message);
    process.exit(1);
  }
}

fixDatabase();
