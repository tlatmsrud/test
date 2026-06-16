import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { SignupForm } from '@/features/auth/components/SignupForm';

const SignupPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>이메일과 비밀번호로 계정을 만드세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          이미 계정이 있나요?{' '}
          <Link href="/login" className="font-medium text-brand-700 hover:underline">
            로그인
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
