'use client';

import { UIProvider, useUI } from '@/components/useUI';
import { ModalUI } from '@/components/modal/modal';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
      <ModalUI />
      {children}
    </UIProvider>
  );
}
