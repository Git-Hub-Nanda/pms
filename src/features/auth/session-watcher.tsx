'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/** Keeps the browser session alive while active and signs out expired sessions. */
export function SessionWatcher() {
  const router = useRouter();
  useEffect(() => {
    let stopped = false;
    const verifySession = async () => {
      const session = await fetch('/api/auth/session', { cache: 'no-store' });
      if (session.ok || stopped) return;
      const refreshed = await fetch('/api/auth/refresh', { method: 'POST' });
      if (refreshed.ok || stopped) return;
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.error('Your session has expired. Please sign in again.');
      router.replace('/login');
      router.refresh();
    };
    void verifySession();
    const interval = window.setInterval(() => void verifySession(), 60_000);
    return () => { stopped = true; window.clearInterval(interval); };
  }, [router]);
  return null;
}
