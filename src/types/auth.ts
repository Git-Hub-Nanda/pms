export type UserRole = 'admin' | 'manager' | 'viewer';
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}
export interface AuthSession {
  user: AuthUser;
  expiresAt: string;
}
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}
