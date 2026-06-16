import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoApi, type TodoUpdateInput } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoUpdateMutation = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: TodoUpdateInput) => todoApi.update(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoKeys.detail(id) });
      qc.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};
