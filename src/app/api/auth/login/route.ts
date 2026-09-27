import { NextResponse, type NextRequest } from 'next/server';
import { isRateLimited } from '@/lib/auth/rate-limit';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth/session';
import { loginSchema } from '@/lib/validation/auth';
import type { AuthTokens } from '@/types/auth';
import { localLogin } from '@/lib/auth/local-auth';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous';
  if (isRateLimited(`login:${ip}`, 5, 60_000))
    return NextResponse.json({ message: 'Too many login attempts. Try again in a minute.' }, { status: 429 });
  const parsed = loginSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: 'Invalid login request.' }, { status: 400 });
  let tokens: AuthTokens | null;
  if (!process.env.AUTH_API_URL && process.env.NODE_ENV !== 'production')
    tokens = await localLogin(parsed.data.email, parsed.data.password);
  else {
    if (!process.env.AUTH_API_URL)
      return NextResponse.json({ message: 'Authentication service is not configured.' }, { status: 503 });
    const upstream = await fetch(`${process.env.AUTH_API_URL}/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed.data),
      cache: 'no-store',
    });
    if (!upstream.ok)
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: upstream.status === 401 ? 401 : 502 },
      );
    tokens = (await upstream.json()) as AuthTokens;
  }
  if (!tokens) return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
  const response = NextResponse.json({ user: tokens.user, expiresIn: tokens.expiresIn });
  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, { ...cookieOptions, maxAge: tokens.expiresIn });
  response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 30 });
  return response;
}
