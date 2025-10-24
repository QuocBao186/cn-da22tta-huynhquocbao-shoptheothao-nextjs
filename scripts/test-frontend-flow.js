const jwt = require('jsonwebtoken');

async function testFrontendFlow() {
  try {
    console.log('🌐 Testing frontend flow...');
    
    // Tạo JWT token
    const token = jwt.sign(
      { userId: 1, email: 'q.bao2k4@gmail.com', role: 'user' },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );
    
    console.log('🎫 JWT Token:', token);
    
    // Test cart API
    console.log('\n🛒 Testing cart API...');
    const cartResponse = await fetch('http://localhost:3000/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('📡 Cart response status:', cartResponse.status);
    
    if (cartResponse.ok) {
      const cartData = await cartResponse.json();
      console.log('✅ Cart data:', cartData);
    } else {
      const errorData = await cartResponse.json();
      console.log('❌ Cart error:', errorData);
    }
    
    // Test orders API
    console.log('\n📦 Testing orders API...');
    const ordersResponse = await fetch('http://localhost:3000/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('📡 Orders response status:', ordersResponse.status);
    
    if (ordersResponse.ok) {
      const ordersData = await ordersResponse.json();
      console.log('✅ Orders data:', ordersData);
    } else {
      const errorData = await ordersResponse.json();
      console.log('❌ Orders error:', errorData);
    }
    
    console.log('\n🎉 Frontend flow test completed!');
    console.log('\n📝 Instructions:');
    console.log('1. Truy cập: http://localhost:3000');
    console.log('2. Đăng nhập với email: q.bao2k4@gmail.com, password: admin123');
    console.log('3. Thêm sản phẩm vào giỏ hàng');
    console.log('4. Vào trang giỏ hàng và kiểm tra');
    console.log('5. Bấm thanh toán để test checkout');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testFrontendFlow();
