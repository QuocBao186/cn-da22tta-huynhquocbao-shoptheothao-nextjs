const mysql = require('mysql2/promise');

async function testCartCheckoutFlow() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });

    console.log('=== TESTING CART CHECKOUT FLOW ===');
    
    // 1. Check current cart data
    const [cartRows] = await connection.execute('SELECT * FROM cart ORDER BY created_at DESC LIMIT 5');
    console.log('1. Current cart data:');
    console.log(JSON.stringify(cartRows, null, 2));
    
    // 2. Check cart with product info for user 4
    const [cartWithProducts] = await connection.execute(`
      SELECT c.id, c.user_id, c.product_id, c.quantity, p.name, p.price, p.image
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = 4
      ORDER BY c.created_at DESC
    `);
    console.log('\n2. Cart with products for user 4:');
    console.log(JSON.stringify(cartWithProducts, null, 2));
    
    // 3. Simulate API response
    const apiResponse = { cartItems: cartWithProducts };
    console.log('\n3. Simulated API response:');
    console.log(JSON.stringify(apiResponse, null, 2));
    
    // 4. Check if cartItems would be displayed
    const cartItems = apiResponse.cartItems;
    console.log('\n4. Cart display check:');
    console.log('cartItems exists:', !!cartItems);
    console.log('cartItems is array:', Array.isArray(cartItems));
    console.log('cartItems length:', cartItems?.length);
    console.log('Should display products:', cartItems && Array.isArray(cartItems) && cartItems.length > 0);
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCartCheckoutFlow();