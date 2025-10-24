const jwt = require('jsonwebtoken');

async function testCartAPI() {
  try {
    console.log('🧪 Testing cart API...');
    
    // Tạo JWT token
    const token = jwt.sign(
      { userId: 1, email: 'q.bao2k4@gmail.com', role: 'user' },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );
    
    console.log('🎫 JWT Token:', token);
    
    // Test cart API
    const response = await fetch('http://localhost:3000/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Cart data:', data);
    } else {
      const errorData = await response.json();
      console.log('❌ Error response:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCartAPI();
