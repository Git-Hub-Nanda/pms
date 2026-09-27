import { redirect } from 'next/navigation';
import { getSession } from './session';
import type { UserRole } from '@/types/auth';

/** Server-side guard for mutations and privileged routes. */
export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getSession();
  if (!session) redirect('/login');
  if (!session.user.roles.some((role) => allowedRoles.includes(role))) redirect('/products?error=forbidden');
  return session;
}
