import Link from 'next/link';
import { ArrowRight, PackageCheck, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6">
      <header className="flex items-center justify-between py-6">
        <span className="text-xl font-bold text-brand-700">PMS</span>
        <Link href="/login">
          <Button variant="secondary">Sign in</Button>
        </Link>
      </header>
      <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-700">
            Product operations, simplified
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            A dependable home for your product catalogue.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Search, review, and manage products through a fast, accessible workspace built for your team.
          </p>
          <Link href="/login" className="mt-8 inline-block">
            <Button>
              Open workspace <ArrowRight className="ml-2" size={17} />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            [PackageCheck, 'Catalogue control', 'Find and manage products quickly.'],
            [ShieldCheck, 'Secure sessions', 'HTTP-only cookie authentication.'],
            [Zap, 'Fast by default', 'Cached requests and optimized images.'],
          ].map(([Icon, title, description]) => {
            const FeatureIcon = Icon as typeof PackageCheck;
            return (
              <article key={title as string} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <FeatureIcon className="text-brand-600" />
                <h2 className="mt-3 font-semibold">{title as string}</h2>
                <p className="mt-1 text-sm text-slate-600">{description as string}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
