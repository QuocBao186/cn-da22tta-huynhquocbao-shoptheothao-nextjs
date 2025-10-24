const mysql = require('mysql2/promise');

async function testCompleteCartFlow() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });

    console.log('=== TESTING COMPLETE CART FLOW ===');
    
    // 1. Clear existing cart for user 4
    await connection.execute('DELETE FROM cart WHERE user_id = 4');
    console.log('1. Cleared existing cart for user 4');
    
    // 2. Add a product to cart
    await connection.execute(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [4, 16, 2]
    );
    console.log('2. Added product 16 (qty: 2) to cart for user 4');
    
    // 3. Check cart data
    const [cartRows] = await connection.execute('SELECT * FROM cart WHERE user_id = 4');
    console.log('3. Cart data after adding:');
    console.log(JSON.stringify(cartRows, null, 2));
    
    // 4. Simulate cart API call
    const [cartItems] = await connection.execute(`
      SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.image, p.description
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `, [4]);

    console.log('4. Cart API result:');
    console.log(JSON.stringify(cartItems, null, 2));
    
    // 5. Test display logic
    const shouldDisplay = cartItems && Array.isArray(cartItems) && cartItems.length > 0;
    console.log('5. Should display products:', shouldDisplay);
    
    if (shouldDisplay) {
      console.log('6. Products that should be displayed:');
      cartItems.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.name} - Qty: ${item.quantity} - Price: ${item.price}`);
      });
    }
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCompleteCartFlow();