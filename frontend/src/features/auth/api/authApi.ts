import { apiClient } from '@/lib/api/client';

import type { TokenResponse, UserResponse } from '../types/User';

export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const authApi = {
  signup: (input: SignupInput) => apiClient.post<UserResponse>('/api/auth/signup', { body: input }),
  login: (input: LoginInput) => apiClient.post<TokenResponse>('/api/auth/login', { body: input }),
  refresh: (refreshToken: string) =>
    apiClient.post<TokenResponse>('/api/auth/refresh', { body: { refreshToken } }),
  logout: () => apiClient.post<void>('/api/auth/logout'),
  me: () => apiClient.get<UserResponse>('/api/users/me'),
};
