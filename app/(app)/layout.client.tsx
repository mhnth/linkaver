'use client';

import { UIProvider } from '@/components/useUI';
import { ModalUI } from '@/components/modal/modal';
import { NavBar } from '@/components/nav-bar';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
      <ModalUI />
      {children}
      <NavBar />
    </UIProvider>
  );
}
