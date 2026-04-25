import { getRedis, WHATSAPP_CLICKS_KEY } from "@/lib/redis";

export const runtime = "nodejs";

type ClickPayload = { page?: unknown };

export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) {
    return new Response(null, { status: 204 });
  }

  let body: ClickPayload = {};
  try {
    body = (await request.json()) as ClickPayload;
  } catch {}

  const page =
    typeof body.page === "string"
      ? body.page.slice(0, 200)
      : request.headers.get("referer")?.slice(0, 200) ?? "";
  const ua = request.headers.get("user-agent")?.slice(0, 200) ?? "";

  try {
    await redis.rpush(
      WHATSAPP_CLICKS_KEY,
      JSON.stringify({ t: Date.now(), page, ua })
    );
  } catch (err) {
    console.error("[track/whatsapp] redis rpush failed:", err);
  }

  return new Response(null, { status: 204 });
}
