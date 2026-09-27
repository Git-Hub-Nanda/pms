import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-7xl font-bold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <Link href="/" className="mt-4 inline-block text-brand-700 underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
