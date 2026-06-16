import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../api/authApi';
import { authKeys } from '../api/authKeys';
import { useAuthStore } from '../store/useAuthStore';

export const useLoginMutation = () => {
  const qc = useQueryClient();
  const setTokens = useAuthStore((s) => s.setTokens);
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      qc.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};
