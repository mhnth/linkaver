import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/hooks/provider';

export const metadata: Metadata = {
  title: 'linkaver - save links for u',
  description: 'save links and never loss it',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
