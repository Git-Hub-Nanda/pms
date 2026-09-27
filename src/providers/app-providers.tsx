'use client';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { StoreProvider } from './store-provider';
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </StoreProvider>
  );
}
