'use client';
import Link from 'next/link';
import { LogOut, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppSelector } from '@/hooks/redux';
export function Header() {
  const router = useRouter();
  const count = useAppSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Signed out');
    router.push('/login');
    router.refresh();
  };
  return (
    <header className="border-b bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-lg font-bold text-brand-700">
          PMS
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/products" className="text-sm font-medium hover:text-brand-700">
            Products
          </Link>
          <Link href="/cart" className="relative rounded p-2 hover:bg-slate-100" aria-label={`Cart, ${count} items`}>
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute right-0 top-0 rounded-full bg-brand-600 px-1.5 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
          <button onClick={logout} className="rounded p-2 hover:bg-slate-100" aria-label="Sign out">
            <LogOut size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
