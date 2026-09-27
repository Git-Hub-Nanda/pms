import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { AuthSession, AuthUser } from '@/types/auth';

export const ACCESS_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-pms-access' : 'pms-access';
export const REFRESH_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-pms-refresh' : 'pms-refresh';
const secret = new TextEncoder().encode(
  process.env.AUTH_JWT_SECRET ??
    (process.env.NODE_ENV === 'production' ? '' : 'development-only-local-auth-secret-change-me'),
);

export async function getSession(): Promise<AuthSession | null> {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token || !secret.length) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      user: {
        id: String(payload.sub),
        email: String(payload.email),
        name: String(payload.name),
        roles: (payload.roles as AuthUser['roles']) ?? [],
      },
      expiresAt: new Date(Number(payload.exp) * 1000).toISOString(),
    };
  } catch {
    return null;
  }
}
