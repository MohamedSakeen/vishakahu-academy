/**
 * In-memory sliding window rate limiter for Next.js API routes.
 * Automatically cleans up expired timestamps to prevent memory leaks.
 */

interface RateLimitRecord {
  timestamps: number[];
}

class RateLimiter {
  private cache: Map<string, RateLimitRecord> = new Map();
  private lastCleanup: number = Date.now();
  private readonly cleanupIntervalMs: number = 60 * 1000; // Run garbage collection every 60s

  /**
   * Check if a key (e.g. IP address) exceeds the rate limit.
   * @param key Unique identifier (IP, user identifier)
   * @param limit Maximum allowed requests within windowMs
   * @param windowMs Time window in milliseconds (e.g., 15 * 60 * 1000 for 15 mins)
   */
  public check(key: string, limit: number, windowMs: number): {
    success: boolean;
    limit: number;
    remaining: number;
    retryAfterSeconds: number;
  } {
    const now = Date.now();
    this.cleanup(windowMs);

    const record = this.cache.get(key) || { timestamps: [] };

    // Filter out timestamps outside the active window
    const validTimestamps = record.timestamps.filter(ts => now - ts < windowMs);

    if (validTimestamps.length >= limit) {
      const oldestValid = validTimestamps[0];
      const retryAfterMs = oldestValid + windowMs - now;
      const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));

      return {
        success: false,
        limit,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    // Add current timestamp
    validTimestamps.push(now);
    this.cache.set(key, { timestamps: validTimestamps });

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - validTimestamps.length),
      retryAfterSeconds: 0,
    };
  }

  /**
   * Periodically remove keys that have no timestamps in the active window.
   */
  private cleanup(windowMs: number) {
    const now = Date.now();
    if (now - this.lastCleanup < this.cleanupIntervalMs) {
      return;
    }
    this.lastCleanup = now;

    for (const [key, record] of this.cache.entries()) {
      const valid = record.timestamps.filter(ts => now - ts < windowMs);
      if (valid.length === 0) {
        this.cache.delete(key);
      } else {
        this.cache.set(key, { timestamps: valid });
      }
    }
  }
}

// Global singleton instance across route executions in the same server process
const globalRateLimiter = new RateLimiter();

export function rateLimit(key: string, limit: number = 5, windowMs: number = 15 * 60 * 1000) {
  return globalRateLimiter.check(key, limit, windowMs);
}

/**
 * Extracts the real client IP address from various standard HTTP proxy headers.
 */
export function getClientIp(req: Request): string {
  // Standard reverse proxy headers
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // x-forwarded-for can be a comma-separated list of IPs; first one is the client
    const ips = xForwardedFor.split(',');
    return ips[0].trim();
  }

  // Fallback
  return '127.0.0.1';
}
