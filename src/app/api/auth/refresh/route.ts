import { NextResponse, type NextRequest } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth/session';
import type { AuthTokens } from '@/types/auth';
import { localRefresh } from '@/lib/auth/local-auth';
export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return NextResponse.json({ message: 'Session expired.' }, { status: 401 });
  let tokens: AuthTokens | null;
  if (!process.env.AUTH_API_URL && process.env.NODE_ENV !== 'production') tokens = await localRefresh(refreshToken);
  else {
    if (!process.env.AUTH_API_URL) return NextResponse.json({ message: 'Session expired.' }, { status: 401 });
    const upstream = await fetch(`${process.env.AUTH_API_URL}/refresh`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });
    tokens = upstream.ok ? ((await upstream.json()) as AuthTokens) : null;
  }
  if (!tokens) {
    const response = NextResponse.json({ message: 'Session expired.' }, { status: 401 });
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }
  const response = NextResponse.json({ user: tokens.user, expiresIn: tokens.expiresIn });
  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.expiresIn,
  });
  if (tokens.refreshToken)
    response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  return response;
}
