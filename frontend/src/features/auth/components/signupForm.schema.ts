import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(64, '비밀번호는 64자 이내여야 합니다.'),
  name: z.string().min(1, '이름을 입력하세요.').max(50, '이름은 50자 이내여야 합니다.'),
});

export type SignupFormInput = z.infer<typeof signupSchema>;
