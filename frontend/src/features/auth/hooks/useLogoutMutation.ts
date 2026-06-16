import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/useAuthStore';

export const useLogoutMutation = () => {
  const qc = useQueryClient();
  const clear = useAuthStore((s) => s.clear);
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clear();
      qc.clear();
    },
  });
};
