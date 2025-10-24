import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';

// GET - Lấy danh sách sản phẩm
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const pool = await getConnection();
    const conn = await pool.getConnection();
    
    try {
      let whereClause = '';
      let params: any[] = [];

      if (category) {
        whereClause = 'WHERE category = ?';
        params.push(category);
      }

      if (search) {
        whereClause += whereClause ? ' AND ' : 'WHERE ';
        whereClause += '(name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      // Lấy tổng số sản phẩm
    const [countResult] = await conn.execute(
      `SELECT COUNT(*) as total FROM products ${whereClause}`,
      params
    );
    const total = (countResult as any)[0].total;

    // Lấy sản phẩm với phân trang
    const [products] = await conn.execute(
      `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    } finally {
      conn.release();
    }
  } catch (error: any) {
    console.error('Get products error:', error);
    
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
