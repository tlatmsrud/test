import { useQuery } from '@tanstack/react-query';

import { authApi } from '../api/authApi';
import { authKeys } from '../api/authKeys';
import { useAuthStore } from '../store/useAuthStore';

export const useMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.me,
    enabled: !!accessToken,
  });
};
