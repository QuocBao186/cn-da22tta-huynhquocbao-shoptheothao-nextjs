const mysql = require('mysql2/promise');

async function checkCartData() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });

    console.log('=== CHECKING CART DATA ===');
    
    // Check cart table
    const [cartRows] = await connection.execute('SELECT * FROM cart ORDER BY created_at DESC LIMIT 10');
    console.log('Cart table:');
    console.log(JSON.stringify(cartRows, null, 2));
    
    // Check products table
    const [productRows] = await connection.execute('SELECT id, name, price FROM products WHERE id = 16');
    console.log('\nProduct 16:');
    console.log(JSON.stringify(productRows, null, 2));
    
    // Check cart with product info
    const [cartWithProducts] = await connection.execute(`
      SELECT c.id, c.user_id, c.product_id, c.quantity, p.name, p.price, p.image
      FROM cart c
      JOIN products p ON c.product_id = p.id
      ORDER BY c.created_at DESC
    `);
    console.log('\nCart with products:');
    console.log(JSON.stringify(cartWithProducts, null, 2));
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkCartData();
