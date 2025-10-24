import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';

// GET - Lấy tất cả sản phẩm cho admin
export async function GET(request: NextRequest) {
  try {
    const pool = await getConnection();
    const conn = await pool.getConnection();
    
    try {
      const [products] = await conn.execute(`
        SELECT * FROM products 
        ORDER BY created_at DESC
      `);

      return NextResponse.json({ products });
    } finally {
      conn.release();
    }
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: `Lỗi server: ${error.message}` },
      { status: 500 }
    );
  }
}

// POST - Thêm sản phẩm mới
export async function POST(request: NextRequest) {
  try {
    const { name, description, price, image, category, stock } = await request.json();

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Tên, giá và danh mục là bắt buộc' },
        { status: 400 }
      );
    }

    // Tạo slug từ tên sản phẩm
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const pool = await getConnection();
    const conn = await pool.getConnection();
    
    try {
      // Kiểm tra xem slug đã tồn tại chưa
      const [existingProducts] = await conn.execute(
        'SELECT id FROM products WHERE slug = ?',
        [slug]
      );

    let finalSlug = slug;
    if ((existingProducts as any).length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    // Thêm sản phẩm mới
    const [result] = await conn.execute(
      'INSERT INTO products (name, description, price, image, category, stock, slug) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description || '', price, image || '', category, stock || 0, finalSlug]
    );

    return NextResponse.json(
      { 
        message: 'Thêm sản phẩm thành công', 
        productId: (result as any).insertId 
      },
      { status: 201 }
    );
    } finally {
      conn.release();
    }
  } catch (error: any) {
    console.error('Add product error:', error);
    return NextResponse.json(
      { error: `Lỗi server: ${error.message}` },
      { status: 500 }
    );
  }
}
