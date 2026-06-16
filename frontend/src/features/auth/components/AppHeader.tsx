'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';

import { useLogoutMutation } from '../hooks/useLogoutMutation';
import { useMeQuery } from '../hooks/useMeQuery';

export const AppHeader = () => {
  const router = useRouter();
  const { data: me } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => router.replace('/login'),
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/projects" className="text-lg font-semibold text-brand-700">
          TestSite Todo
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {me ? <span className="text-slate-600">{me.name}</span> : null}
          <Button intent="ghost" size="sm" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
};
