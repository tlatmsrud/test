import { useQuery } from '@tanstack/react-query';

import { todoApi } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoDetailQuery = (id: number) =>
  useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoApi.getById(id),
    enabled: Number.isFinite(id),
  });
