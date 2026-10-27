// Sliding-window limiter in-memory (cukup untuk 1 instance / PM2 fork mode).
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    const retryAfter = Math.ceil((windowMs - (now - (arr[0] ?? now))) / 1000);
    hits.set(key, arr);
    return { ok: false as const, retryAfter };
  }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return { ok: true as const, retryAfter: 0 };
}
