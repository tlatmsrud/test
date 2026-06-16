import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoApi } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';
import type { TodoStatus } from '../types/Todo';

export const useTodoStatusMutation = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (status: TodoStatus) => todoApi.changeStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoKeys.detail(id) });
      qc.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};
