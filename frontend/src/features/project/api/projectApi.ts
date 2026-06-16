import { apiClient } from '@/lib/api/client';

import type { ProjectResponse } from '../types/Project';

export interface ProjectCreateInput {
  name: string;
  description?: string;
  color?: string;
}

export interface ProjectUpdateInput {
  name?: string;
  description?: string;
  color?: string;
}

export const projectApi = {
  list: () => apiClient.get<ProjectResponse[]>('/api/projects'),
  getById: (id: number) => apiClient.get<ProjectResponse>(`/api/projects/${id}`),
  create: (input: ProjectCreateInput) =>
    apiClient.post<ProjectResponse>('/api/projects', { body: input }),
  update: (id: number, input: ProjectUpdateInput) =>
    apiClient.patch<ProjectResponse>(`/api/projects/${id}`, { body: input }),
  delete: (id: number) => apiClient.delete<void>(`/api/projects/${id}`),
};
