import type { PropsWithChildren } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { SessionWatcher } from '@/features/auth/session-watcher';
export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AppShell>
      <SessionWatcher />
      {children}
    </AppShell>
  );
}
