"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/site.config";

const phoneRegex = /^[+]?[0-9 ()\-.]{10,}$/;

const EstimateSchema = z
  .object({
    name: z.string().min(2, "Please share your name"),
    email: z.union([z.literal(""), z.email("Please enter a valid email")]),
    phone: z.union([
      z.literal(""),
      z
        .string()
        .regex(phoneRegex, "Please enter a valid phone or WhatsApp number"),
    ]),
    address: z.string().optional(),
    description: z.string().min(10, "A few details, please"),
  })
  .refine((d) => d.email.length > 0 || d.phone.length > 0, {
    message: `Please provide an email or phone so ${site.ownerName} can reply`,
    path: ["phone"],
  });

export type EstimateInput = z.infer<typeof EstimateSchema>;

export type EstimateValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
};

export type EstimateResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string>;
      values?: EstimateValues;
    };

const URL_PATTERN = /https?:\/\/|www\./gi;

// Outreach-pitch vocabulary. Real customers describing a remodel never
// use this language; SEO/marketing spammers can't help themselves. 2+
// hits in the description → silent drop.
const PITCH_PATTERNS: RegExp[] = [
  /\bSEO\b/i,
  /\bAEO\b/i,
  /\bSERP\b/i,
  /\bbacklinks?\b/i,
  /voice search/i,
  /AI (platform|search|visibility|tools?)/i,
  /\b(ChatGPT|Gemini|Perplexity)\b/i,
  /digital marketing/i,
  /price list/i,
  /(grow|boost|increase) (your )?(business|traffic|visibility|reach|leads|sales|revenue|ranking)/i,
  /lead generation/i,
  /quote (and|&) price/i,
];

function pitchScore(text: string): number {
  return PITCH_PATTERNS.reduce(
    (acc, re) => acc + (re.test(text) ? 1 : 0),
    0
  );
}

function looksLikeSpam(raw: {
  name: string;
  address: string;
  description: string;
}): boolean {
  if (URL_PATTERN.test(raw.name)) return true;
  URL_PATTERN.lastIndex = 0;
  if (URL_PATTERN.test(raw.address)) return true;
  URL_PATTERN.lastIndex = 0;
  const descUrls = raw.description.match(URL_PATTERN)?.length ?? 0;
  if (descUrls >= 2) return true;
  return pitchScore(raw.description) >= 2;
}

export async function submitEstimate(
  _prevState: EstimateResult | null,
  formData: FormData
): Promise<EstimateResult> {
  // Honeypot — real users skip the hidden "website" field; bots fill it.
  // Silent success so the bot doesn't retry with a different shape.
  if (String(formData.get("website") ?? "").trim()) {
    return { ok: true };
  }

  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  };

  if (looksLikeSpam(raw)) {
    return { ok: true };
  }

  const parsed = EstimateSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Please fix the fields below.",
      fieldErrors,
      values: raw,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[estimate] RESEND_API_KEY not set — form not wired up yet.");
    return {
      ok: false,
      error: `Sorry, our form isn't connected yet. Please WhatsApp ${site.ownerName} directly.`,
      values: raw,
    };
  }

  const resend = new Resend(apiKey);
  const { name, email, phone, address, description } = parsed.data;

  try {
    // SANDBOX: until handymanhouserepair.com is verified in Resend, free-tier
    // sends must come from onboarding@resend.dev and may only land in the
    // Resend account's signup email. Flipping these two lines back when the
    // domain is verified restores the real recipient + BCC owner setup.
    await resend.emails.send({
      from: `${site.brandName} Site <onboarding@resend.dev>`,
      to: [site.notificationEmail],
      replyTo: email || undefined,
      subject: `New estimate request — ${name}`,
      text: [
        `Name: ${name}`,
        email ? `Email: ${email}` : "",
        phone ? `Phone: ${phone}` : "",
        address ? `Address: ${address}` : "",
        "",
        "Description:",
        description,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return { ok: true };
  } catch (err) {
    console.error("[estimate] Resend failed:", err);
    return {
      ok: false,
      error: `Couldn't send the request. Please WhatsApp ${site.ownerName} directly.`,
      values: raw,
    };
  }
}
