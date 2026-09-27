import type { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
}
