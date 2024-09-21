import type { Metadata } from 'next';

import './globals.css';
import Navbar from '@/components/Navbar';

import SessionGuard from '@/components/SessionGuard';
import { Providers } from '@/app/Providers';

export const metadata: Metadata = {
  title: 'Keyklopapp test',
  description: ' Keyklopapp test is a test app for evulating candidates'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionGuard>
            <Navbar>{children}</Navbar>
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
