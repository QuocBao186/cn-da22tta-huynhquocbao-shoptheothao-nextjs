import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';

export async function GET() {
  try {
    const conn = await getConnection();
    await conn.execute('SELECT 1');
    return NextResponse.json({ status: 'ok', message: 'Database connected' });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 500 }
    );
  }
}
