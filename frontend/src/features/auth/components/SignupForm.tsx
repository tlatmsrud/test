'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { FieldError } from '@/components/ui/FieldError';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ApiError } from '@/lib/api/client';

import { useSignupMutation } from '../hooks/useSignupMutation';
import { signupSchema, type SignupFormInput } from './signupForm.schema';

export const SignupForm = () => {
  const router = useRouter();
  const signupMutation = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', name: '' },
  });

  const onSubmit = handleSubmit((data) => {
    signupMutation.mutate(data, {
      onSuccess: () => router.push('/login?signup=ok'),
    });
  });

  const serverError = signupMutation.error instanceof ApiError ? signupMutation.error.message : null;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="name">이름</Label>
        <Input id="name" type="text" autoComplete="name" {...register('name')} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
        />
        <FieldError message={errors.password?.message} />
      </div>
      {serverError ? <p className="text-sm text-danger-500">{serverError}</p> : null}
      <Button type="submit" disabled={isSubmitting || signupMutation.isPending} size="lg">
        {signupMutation.isPending ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  );
};
