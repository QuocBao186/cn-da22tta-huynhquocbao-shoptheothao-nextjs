const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

async function testCartAPIDirect() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sports_store'
    });

    console.log('=== TESTING CART API DIRECT ===');
    
    // 1. Get user 4 data
    const [users] = await connection.execute('SELECT * FROM users WHERE id = 4');
    console.log('1. User 4 data:');
    console.log(JSON.stringify(users, null, 2));
    
    if (users.length === 0) {
      console.log('User 4 not found!');
      await connection.end();
      return;
    }
    
    // 2. Create a test token
    const JWT_SECRET = 'your-secret-key';
    const token = jwt.sign(
      { userId: 4, email: users[0].email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('\n2. Generated token:');
    console.log(token.substring(0, 50) + '...');
    
    // 3. Test cart API logic (simulate what the API does)
    const [cartItems] = await connection.execute(`
      SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.image, p.description
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `, [4]);

    console.log('\n3. Cart API result:');
    console.log(JSON.stringify(cartItems, null, 2));
    
    // 4. Test response format
    const response = { cartItems };
    console.log('\n4. Full API response:');
    console.log(JSON.stringify(response, null, 2));
    
    // 5. Test display logic
    const shouldDisplay = cartItems && Array.isArray(cartItems) && cartItems.length > 0;
    console.log('\n5. Should display products:', shouldDisplay);
    
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

testCartAPIDirect();