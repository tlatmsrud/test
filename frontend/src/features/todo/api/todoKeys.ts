import type { TodoSearchFilter } from './todoApi';

export const todoKeys = {
  all: ['todo'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filter: TodoSearchFilter) => [...todoKeys.lists(), filter] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};
