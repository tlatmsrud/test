import { z } from 'zod';

import { TODO_STATUSES } from '../types/Todo';

export const todoCreateSchema = z
  .object({
    title: z.string().min(1, '제목을 입력하세요.').max(200, '200자 이내여야 합니다.'),
    content: z.string().optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(TODO_STATUSES),
  })
  .refine(
    (v) => !v.startDate || !v.dueDate || v.dueDate >= v.startDate,
    { message: '마감일은 시작일 이후여야 합니다.', path: ['dueDate'] },
  );

export type TodoCreateFormInput = z.infer<typeof todoCreateSchema>;
