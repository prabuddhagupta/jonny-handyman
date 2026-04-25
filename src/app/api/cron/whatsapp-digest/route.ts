import { Resend } from "resend";
import { site } from "@/site.config";
import { getRedis, WHATSAPP_CLICKS_KEY } from "@/lib/redis";

export const runtime = "nodejs";

type ClickEntry = { t: number; page: string; ua: string };

const ET_TIME = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const ET_DATE = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${expected}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const redis = getRedis();
  if (!redis) {
    return Response.json({ ok: false, reason: "redis not configured" }, { status: 200 });
  }

  const raw = await redis.lrange(WHATSAPP_CLICKS_KEY, 0, -1);
  if (raw.length === 0) {
    return Response.json({ ok: true, sent: 0 });
  }
  await redis.del(WHATSAPP_CLICKS_KEY);

  const clicks: ClickEntry[] = raw
    .map((item) => {
      if (typeof item === "object" && item !== null) return item as ClickEntry;
      try {
        return JSON.parse(item as string) as ClickEntry;
      } catch {
        return null;
      }
    })
    .filter((c): c is ClickEntry => c !== null)
    .sort((a, b) => a.t - b.t);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[whatsapp-digest] RESEND_API_KEY not set");
    return Response.json({ ok: false, reason: "resend not configured" }, { status: 200 });
  }

  const count = clicks.length;
  const dateStr = ET_DATE.format(new Date());
  const lines = clicks
    .map((c) => `  ${ET_TIME.format(new Date(c.t))}  —  ${c.page || "/"}`)
    .join("\n");

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: `${site.brandName} Site <noreply@${site.domain}>`,
    to: [site.notificationEmail],
    subject: `WhatsApp clicks — ${count} in last 24h`,
    text: [
      `${count} WhatsApp button click${count === 1 ? "" : "s"} as of ${dateStr} (ET).`,
      "",
      lines,
    ].join("\n"),
  });

  return Response.json({ ok: true, sent: count });
}
