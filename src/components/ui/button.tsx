import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' };
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-brand-600 text-white hover:bg-brand-700',
        variant === 'secondary' && 'bg-white text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
        className,
      )}
      {...props}
    />
  );
});
