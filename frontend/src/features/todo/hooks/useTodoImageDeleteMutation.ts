import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoApi } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoImageDeleteMutation = (todoId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (imageId: number) => todoApi.deleteImage(todoId, imageId),
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.detail(todoId) }),
  });
};
