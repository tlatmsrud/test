import Link from 'next/link';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <header className="px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-brand-700">
          TestSite Todo
        </Link>
      </header>
      <main className="flex justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
};

export default PublicLayout;
