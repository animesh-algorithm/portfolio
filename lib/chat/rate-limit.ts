import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

const windows = [
  { name: "10m", seconds: 10 * 60, limit: 10 },
  { name: "day", seconds: 24 * 60 * 60, limit: 30 },
] as const;

export function hashRateLimitIdentity(value: string, salt: string) {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export class RateLimiter {
  constructor(private readonly redis: Redis) {}

  async check(identityHash: string, now = Date.now()): Promise<RateLimitResult> {
    let retryAfterSeconds = 0;
    for (const window of windows) {
      const bucket = Math.floor(now / (window.seconds * 1000));
      const key = `ask:rate:${window.name}:${bucket}:${identityHash}`;
      const count = await this.redis.incr(key);
      if (count === 1) await this.redis.expire(key, window.seconds + 2);
      if (count > window.limit) {
        const elapsed = Math.floor(now / 1000) % window.seconds;
        retryAfterSeconds = Math.max(retryAfterSeconds, window.seconds - elapsed);
      }
    }
    return { allowed: retryAfterSeconds === 0, retryAfterSeconds };
  }
}

export function getRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new RateLimiter(new Redis({ url, token }));
}
