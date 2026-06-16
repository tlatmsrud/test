import { useMutation } from '@tanstack/react-query';

import { authApi } from '../api/authApi';

export const useSignupMutation = () =>
  useMutation({
    mutationFn: authApi.signup,
  });
