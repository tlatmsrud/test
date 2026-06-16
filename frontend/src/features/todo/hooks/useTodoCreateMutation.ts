import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoApi } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoCreateMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: todoApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.lists() }),
  });
};
