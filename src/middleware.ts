import { NextResponse, type NextRequest } from 'next/server';
const protectedPrefixes = ['/products', '/cart'];
const ACCESS_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-pms-access' : 'pms-access';
export function middleware(request: NextRequest) {
  if (protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix)) && !request.cookies.has(ACCESS_COOKIE)) {
    const login = new URL('/login', request.url); login.searchParams.set('next', request.nextUrl.pathname); return NextResponse.redirect(login);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/products/:path*', '/cart/:path*'] };
