export type UserRole = 'ADMIN' | 'AGENT' | 'VIEWER';

export interface AuthUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}
