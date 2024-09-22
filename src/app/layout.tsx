import type { Metadata } from 'next';
import { Toaster } from 'sonner'
import './globals.css';
import Navbar from '@/components/Navbar';

import SessionGuard from '@/components/SessionGuard';
import { Providers } from '@/app/Providers';

export const metadata: Metadata = {
  title: 'Keycloak app | test',
  description: ' Keycloak test is a test app for evaluating candidates'
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
        <Toaster />
      </body>
    </html>
  );
}
