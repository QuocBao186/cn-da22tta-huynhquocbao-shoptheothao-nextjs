import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';
import jwt from 'jsonwebtoken';
import { config } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    // Đọc token từ cookie hoặc header
    let token = request.cookies.get('token')?.value;
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    const userId = decoded.userId;

    const pool = await getConnection();
    const conn = await pool.getConnection();
    
    try {
      // Lấy danh sách đơn hàng của user hiện tại
      const [orders] = await conn.execute(`
        SELECT 
          o.id,
          o.user_id,
          o.total_amount,
          o.status,
          o.created_at,
          o.updated_at
        FROM orders o
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
      `, [userId]);

      return NextResponse.json({ orders });
    } finally {
      conn.release();
    }
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Không thể kết nối đến database. Vui lòng kiểm tra XAMPP MySQL.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: `Lỗi server: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Đọc token từ cookie hoặc header
    let token = request.cookies.get('token')?.value;
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    const userId = decoded.userId;

    const { items, shippingAddress, paymentMethod, notes } = await request.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Không có sản phẩm nào trong giỏ hàng' }, { status: 400 });
    }

    const pool = await getConnection();
    
    // Sử dụng pool.query thay vì transaction cho đơn giản
    try {
      // Tính tổng tiền
      let totalAmount = 0;
      for (const item of items) {
        totalAmount += item.price * item.quantity;
      }

      // Tạo đơn hàng
      const [result] = await pool.execute(`
        INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, notes)
        VALUES (?, ?, 'pending', ?, ?, ?)
      `, [userId, totalAmount, JSON.stringify(shippingAddress), paymentMethod, notes || '']);

      const orderId = (result as any).insertId;

      // Tạo order items
      for (const item of items) {
        await pool.execute(`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `, [orderId, item.product_id, item.quantity, item.price]);
      }

      return NextResponse.json({ 
        message: 'Đặt hàng thành công', 
        orderId: orderId 
      });

    } catch (error) {
      throw error;
    }

  } catch (error: any) {
    console.error('Error creating order:', error);
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Không thể kết nối đến database. Vui lòng kiểm tra XAMPP MySQL.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: `Lỗi server: ${error.message}` },
      { status: 500 }
    );
  }
}
