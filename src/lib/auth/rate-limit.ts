type Record = { count: number; resetsAt: number };
const buckets = new Map<string, Record>();
export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const record = buckets.get(key);
  if (!record || record.resetsAt < now) {
    buckets.set(key, { count: 1, resetsAt: now + windowMs });
    return false;
  }
  record.count += 1;
  return record.count > limit;
}
