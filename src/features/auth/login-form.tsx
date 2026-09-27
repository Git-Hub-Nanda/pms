'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { loginSchema, type LoginInput } from '@/lib/validation/auth';

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const submit = async (values: LoginInput) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      toast.error(data.message ?? 'Unable to sign in');
      return;
    }
    toast.success('Welcome back');
    const destination = params.get('next');
    router.replace(destination?.startsWith('/') ? destination : '/products');
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Email</span>
        <input
          autoComplete="email"
          type="email"
          {...register('email')}
          className="min-h-11 w-full rounded-md border px-3"
          aria-invalid={!!errors.email}
        />
        <span className="mt-1 block text-sm text-red-600">{errors.email?.message}</span>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Password</span>
        <input
          autoComplete="current-password"
          type="password"
          {...register('password')}
          className="min-h-11 w-full rounded-md border px-3"
          aria-invalid={!!errors.password}
        />
        <span className="mt-1 block text-sm text-red-600">{errors.password?.message}</span>
      </label>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
