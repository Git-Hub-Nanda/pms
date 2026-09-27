import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/login-form';
export const metadata: Metadata = { title: 'Sign in' };
export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-semibold text-brand-700">PMS</p>
        <h1 className="mt-2 text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-slate-600">Sign in to your secure workspace.</p>
        <Suspense fallback={<p className="mt-8">Loading form…</p>}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
