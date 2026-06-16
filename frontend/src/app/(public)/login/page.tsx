import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoginForm } from '@/features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>이메일과 비밀번호로 로그인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          아직 계정이 없나요?{' '}
          <Link href="/signup" className="font-medium text-brand-700 hover:underline">
            회원가입
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
