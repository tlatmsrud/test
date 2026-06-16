import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      clear: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: 'testsite-auth' },
  ),
);

export const getAccessToken = (): string | null => useAuthStore.getState().accessToken;
export const getRefreshToken = (): string | null => useAuthStore.getState().refreshToken;
