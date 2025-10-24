import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';

export async function POST() {
  try {
    await initializeDatabase();
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error: any) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: 'Make sure XAMPP MySQL is running on port 3306'
      },
      { status: 500 }
    );
  }
}
