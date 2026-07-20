// Minimal in-memory fixed-window rate limiter for form API routes.
// Suitable for a single-instance deployment; swap for a durable store
// (Upstash Redis, etc.) behind this same function signature if the app
// scales to multiple server instances.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}
