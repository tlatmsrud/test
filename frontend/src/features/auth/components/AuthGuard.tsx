'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import { useAuthStore } from '../store/useAuthStore';

interface Props {
  children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
      return;
    }
    setChecked(true);
  }, [accessToken, router]);

  if (!checked) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-400">로딩 중...</div>
    );
  }

  return <>{children}</>;
};
