import { useQuery } from '@tanstack/react-query';

import { todoApi, type TodoSearchFilter } from '../api/todoApi';
import { todoKeys } from '../api/todoKeys';

export const useTodoListQuery = (filter: TodoSearchFilter) =>
  useQuery({
    queryKey: todoKeys.list(filter),
    queryFn: () => todoApi.list(filter),
  });
