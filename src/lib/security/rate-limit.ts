/**
 * Pluggable Rate Limiting Engine
 *
 * Supports distributed edge/serverless rate limiting via Upstash Redis REST API.
 * Falls back to an in-process sliding window counter for local development and CI.
 *
 * IMPORTANT: The in-process fallback is NOT suitable for multi-instance production
 * deployments (e.g. Vercel serverless, AWS Lambda). Each cold start creates an
 * independent counter store. For production, configure UPSTASH_REDIS_REST_URL
 * and UPSTASH_REDIS_REST_TOKEN.
 */

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds when the window resets
  retryAfter: number; // Seconds until the client may retry
  isDistributed: boolean;
}

interface InProcessEntry {
  count: number;
  resetAtMs: number;
}

// In-process store — volatile, not shared across instances or cold starts.
const inProcessStore = new Map<string, InProcessEntry>();

/**
 * Periodically cleans up expired in-process entries to bound memory usage.
 */
function cleanupExpiredEntries(nowMs: number) {
  if (inProcessStore.size > 500) {
    for (const [key, entry] of inProcessStore.entries()) {
      if (entry.resetAtMs <= nowMs) {
        inProcessStore.delete(key);
      }
    }
  }
}

/**
 * Rate limit check function.
 * @param identifier Client IP or composite fingerprint
 * @param limit Maximum allowed requests within window (default: 5)
 * @param windowSeconds Window length in seconds (default: 600 = 10 minutes)
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowSeconds: number = 600
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Production Distributed Mode (Upstash Redis REST)
  if (upstashUrl && upstashToken) {
    try {
      const key = `rfq_ratelimit:${identifier}`;
      // Execute atomic INCR and TTL pipeline via REST API
      const response = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["TTL", key],
        ]),
        // Short timeout so we don't stall user requests if Redis is unreachable
        signal: AbortSignal.timeout(2500),
      });

      if (response.ok) {
        const results = (await response.json()) as Array<{ result: number }>;
        const count = results[0]?.result ?? 1;
        let ttl = results[1]?.result ?? -1;

        // If newly created without TTL, set expiration
        if (ttl === -1 || ttl === -2) {
          await fetch(`${upstashUrl}/expire/${encodeURIComponent(key)}/${windowSeconds}`, {
            headers: { Authorization: `Bearer ${upstashToken}` },
          });
          ttl = windowSeconds;
        }

        const nowSec = Math.floor(Date.now() / 1000);
        const reset = nowSec + (ttl > 0 ? ttl : windowSeconds);
        const remaining = Math.max(0, limit - count);
        const success = count <= limit;
        const retryAfter = success ? 0 : Math.max(1, ttl);

        return {
          success,
          limit,
          remaining,
          reset,
          retryAfter,
          isDistributed: true,
        };
      }
      // Non-OK response: fall through to fallback
    } catch {
      // Redis unreachable: fall through to in-process fallback rather than
      // completely blocking legitimate users.
    }
  }

  // 2. In-Process Fallback Mode (Local Dev / CI / Single-instance only)
  //    WARNING: Not effective in multi-instance serverless environments.
  const nowMs = Date.now();
  cleanupExpiredEntries(nowMs);

  const key = identifier;
  const entry = inProcessStore.get(key);

  if (!entry || entry.resetAtMs <= nowMs) {
    // New window
    const resetAtMs = nowMs + windowSeconds * 1000;
    inProcessStore.set(key, { count: 1, resetAtMs });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.floor(resetAtMs / 1000),
      retryAfter: 0,
      isDistributed: false,
    };
  }

  // Existing window
  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  const success = entry.count <= limit;
  const retryAfter = success ? 0 : Math.max(1, Math.ceil((entry.resetAtMs - nowMs) / 1000));

  return {
    success,
    limit,
    remaining,
    reset: Math.floor(entry.resetAtMs / 1000),
    retryAfter,
    isDistributed: false,
  };
}

/**
 * Extracts a client identifier from incoming request headers.
 *
 * SECURITY NOTE: X-Forwarded-For and X-Real-Ip are only trustworthy when set
 * by a trusted reverse proxy (e.g. Vercel, Cloudflare, Nginx). A direct client
 * can spoof these headers to bypass per-IP rate limiting. In deployment
 * environments without a trusted proxy layer, this identifier is best-effort.
 *
 * For Vercel deployments: Vercel overwrites X-Forwarded-For with the true
 * client IP, making this safe. For other environments, ensure the reverse proxy
 * strips/overwrites X-Forwarded-For before forwarding to the app.
 */
export function getClientIdentifier(request: Request): string {
  // Prefer Cloudflare's immutable header (set by CF edge, not spoofable by client)
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  // Vercel's X-Real-Ip is set by the platform and is trustworthy
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // X-Forwarded-For: trustworthy only behind a reverse proxy that overwrites it
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}
