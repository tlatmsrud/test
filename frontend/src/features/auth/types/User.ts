export type UserRole = 'USER' | 'ADMIN';

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
}
