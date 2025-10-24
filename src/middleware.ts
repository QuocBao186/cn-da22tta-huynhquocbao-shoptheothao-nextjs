import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { config } from './lib/config';

export function middleware(request: NextRequest) {
  // Bỏ bảo mật middleware cho admin routes
  // Chỉ để AdminGuard xử lý bảo mật
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
