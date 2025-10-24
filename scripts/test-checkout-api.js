const jwt = require('jsonwebtoken');

async function testCheckoutAPI() {
  try {
    console.log('🧪 Testing checkout API...');
    
    // Tạo JWT token
    const token = jwt.sign(
      { userId: 1, email: 'q.bao2k4@gmail.com', role: 'user' },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );
    
    console.log('🎫 JWT Token:', token);
    
    // Test checkout API
    const orderData = {
      items: [
        {
          product_id: 16,
          quantity: 2,
          price: 5000000
        }
      ],
      shippingAddress: {
        firstName: 'Quốc Bảo',
        lastName: 'Nguyễn',
        email: 'q.bao2k4@gmail.com',
        phone: '0123456789',
        address: '123 Đường ABC',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng'
      },
      paymentMethod: 'cod',
      notes: 'Test order'
    };
    
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Order created:', data);
    } else {
      const errorData = await response.json();
      console.log('❌ Error response:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCheckoutAPI();
