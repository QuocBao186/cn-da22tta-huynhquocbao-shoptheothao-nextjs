import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';

// PUT - Cập nhật sản phẩm
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const { name, description, price, image, category, stock } = await request.json();

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Tên, giá và danh mục là bắt buộc' },
        { status: 400 }
      );
    }

    const conn = await getConnection();
    
    // Cập nhật sản phẩm
    await conn.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ? WHERE id = ?',
      [name, description || '', price, image || '', category, stock || 0, productId]
    );

    return NextResponse.json({ message: 'Cập nhật sản phẩm thành công' });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: `Lỗi server: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE - Xóa sản phẩm
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const conn = await getConnection();
    
    // Xóa sản phẩm
    await conn.execute('DELETE FROM products WHERE id = ?', [productId]);

    return NextResponse.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: `Lỗi server: ${error.message}` },
      { status: 500 }
    );
  }
}
