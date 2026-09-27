import { randomUUID, timingSafeEqual } from 'crypto';
import { SignJWT } from 'jose';
import type { AuthTokens, AuthUser } from '@/types/auth';

type SeedUser = AuthUser & { password: string };
type RefreshRecord = { user: AuthUser; expiresAt: number };

/** Development-only identities. Never enable this module in production. */
const users: SeedUser[] = [
  {
    id: 'dev-admin-1',
    name: 'Dev Administrator',
    email: 'admin@pms.local',
    password: 'Admin#12345!',
    roles: ['admin'],
  },
  {
    id: 'dev-manager-1',
    name: 'Dev Manager',
    email: 'manager@pms.local',
    password: 'Manager#123!',
    roles: ['manager'],
  },
  { id: 'dev-viewer-1', name: 'Dev Viewer', email: 'viewer@pms.local', password: 'Viewer#12345!', roles: ['viewer'] },
];
const refreshTokens = new Map<string, RefreshRecord>();
const ACCESS_TTL_SECONDS = 15 * 60;
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1_000;

function secret() {
  return new TextEncoder().encode(process.env.AUTH_JWT_SECRET ?? 'development-only-local-auth-secret-change-me');
}
function safeEquals(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}
async function issue(user: AuthUser): Promise<AuthTokens> {
  const accessToken = await new SignJWT({ email: user.email, name: user.name, roles: user.roles })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuer('pms-local-dev')
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TTL_SECONDS}s`)
    .sign(secret());
  const refreshToken = randomUUID();
  refreshTokens.set(refreshToken, { user, expiresAt: Date.now() + REFRESH_TTL_MS });
  return { accessToken, refreshToken, expiresIn: ACCESS_TTL_SECONDS, user };
}

export async function localLogin(email: string, password: string) {
  const user = users.find((candidate) => candidate.email === email.toLowerCase());
  if (!user || !safeEquals(user.password, password)) return null;
  const { password: _password, ...safeUser } = user;
  return issue(safeUser);
}

export async function localRefresh(refreshToken: string) {
  const record = refreshTokens.get(refreshToken);
  refreshTokens.delete(refreshToken); // Rotate refresh tokens on every use.
  if (!record || record.expiresAt < Date.now()) return null;
  return issue(record.user);
}
