import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoApi } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoDeleteMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: todoApi.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.all }),
  });
};
