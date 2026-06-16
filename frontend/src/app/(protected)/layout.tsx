import type { ReactNode } from 'react';

import { AppHeader } from '@/features/auth/components/AppHeader';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <AppHeader />
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
};

export default ProtectedLayout;
