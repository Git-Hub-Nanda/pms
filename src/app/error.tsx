'use client';
import { useEffect } from 'react';
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body>
        <main className="grid min-h-screen place-items-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-slate-600">Our team has been notified. Please retry your request.</p>
            <button className="mt-5 rounded bg-blue-600 px-4 py-2 text-white" onClick={reset}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
