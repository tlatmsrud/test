export const TODO_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVED'] as const;
export type TodoStatus = (typeof TODO_STATUSES)[number];

export interface TodoImageResponse {
  id: number;
  originalName: string;
  url: string;
  contentType: string | null;
  sizeBytes: number;
}

export interface TodoResponse {
  id: number;
  projectId: number;
  title: string;
  content: string | null;
  startDate: string | null;
  dueDate: string | null;
  status: TodoStatus;
  images: TodoImageResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoSummaryResponse {
  id: number;
  projectId: number;
  title: string;
  startDate: string | null;
  dueDate: string | null;
  status: TodoStatus;
  updatedAt: string;
}

export const TODO_STATUS_LABEL: Record<TodoStatus, string> = {
  TODO: '할 일',
  IN_PROGRESS: '진행 중',
  DONE: '완료',
  ARCHIVED: '보관',
};
