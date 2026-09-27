'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-red-900">We could not load the products.</h2>
      <button className="mt-3 underline" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
