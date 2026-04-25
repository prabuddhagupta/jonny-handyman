import { Redis } from "@upstash/redis";

export const WHATSAPP_CLICKS_KEY = "whatsapp:clicks";

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}
