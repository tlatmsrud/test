import { apiClient } from '@/lib/api/client';

import type {
  TodoImageResponse,
  TodoResponse,
  TodoStatus,
  TodoSummaryResponse,
} from '../types/Todo';

export interface TodoCreateInput {
  projectId: number;
  title: string;
  content?: string;
  startDate?: string;
  dueDate?: string;
  status?: TodoStatus;
}

export interface TodoUpdateInput {
  title?: string;
  content?: string;
  startDate?: string | null;
  dueDate?: string | null;
  status?: TodoStatus;
}

export interface TodoSearchFilter {
  projectId?: number;
  status?: TodoStatus;
  from?: string;
  to?: string;
}

const buildSearchParams = (filter: TodoSearchFilter): string => {
  const params = new URLSearchParams();
  if (filter.projectId !== undefined) params.set('projectId', String(filter.projectId));
  if (filter.status) params.set('status', filter.status);
  if (filter.from) params.set('from', filter.from);
  if (filter.to) params.set('to', filter.to);
  const q = params.toString();
  return q ? `?${q}` : '';
};

export const todoApi = {
  list: (filter: TodoSearchFilter = {}) =>
    apiClient.get<TodoSummaryResponse[]>(`/api/todos${buildSearchParams(filter)}`),

  getById: (id: number) => apiClient.get<TodoResponse>(`/api/todos/${id}`),

  create: (input: TodoCreateInput) => apiClient.post<TodoResponse>('/api/todos', { body: input }),

  update: (id: number, input: TodoUpdateInput) =>
    apiClient.patch<TodoResponse>(`/api/todos/${id}`, { body: input }),

  changeStatus: (id: number, status: TodoStatus) =>
    apiClient.patch<TodoResponse>(`/api/todos/${id}/status`, { body: { status } }),

  delete: (id: number) => apiClient.delete<void>(`/api/todos/${id}`),

  uploadImages: (id: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    return apiClient.postForm<TodoImageResponse[]>(`/api/todos/${id}/images`, formData);
  },

  deleteImage: (todoId: number, imageId: number) =>
    apiClient.delete<void>(`/api/todos/${todoId}/images/${imageId}`),
};
