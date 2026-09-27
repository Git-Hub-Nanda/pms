export default function Loading() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div className="shimmer h-80" key={i} />
      ))}
    </div>
  );
}
