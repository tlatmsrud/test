import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'TestSite Todo',
  description: '프로젝트별 Todo 관리',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
