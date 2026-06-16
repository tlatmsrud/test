'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { FieldError } from '@/components/ui/FieldError';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ApiError } from '@/lib/api/client';

import { useLoginMutation } from '../hooks/useLoginMutation';
import { loginSchema, type LoginFormInput } from './loginForm.schema';

export const LoginForm = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => router.push('/projects'),
    });
  });

  const serverError = loginMutation.error instanceof ApiError ? loginMutation.error.message : null;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
        />
        <FieldError message={errors.password?.message} />
      </div>
      {serverError ? <p className="text-sm text-danger-500">{serverError}</p> : null}
      <Button type="submit" disabled={isSubmitting || loginMutation.isPending} size="lg">
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
};
