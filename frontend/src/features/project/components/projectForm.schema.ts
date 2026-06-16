import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, '프로젝트 이름을 입력하세요.').max(100, '100자 이내여야 합니다.'),
  description: z.string().max(500, '500자 이내여야 합니다.').optional(),
  color: z.string().max(20).optional(),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;
