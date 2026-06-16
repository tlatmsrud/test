import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoApi } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoImageUploadMutation = (todoId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (files: File[]) => todoApi.uploadImages(todoId, files),
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.detail(todoId) }),
  });
};
