"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/site.config";

const EstimateSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  contact: z.string().min(5, "Phone, email, or WhatsApp so Jonny can reply"),
  address: z.string().optional(),
  description: z.string().min(10, "A few details, please"),
});

export type EstimateInput = z.infer<typeof EstimateSchema>;

export type EstimateResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitEstimate(
  _prevState: EstimateResult | null,
  formData: FormData
): Promise<EstimateResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    contact: String(formData.get("contact") ?? ""),
    address: String(formData.get("address") ?? ""),
    description: String(formData.get("description") ?? ""),
  };

  const parsed = EstimateSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { ok: false, error: "Please fix the fields below.", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[estimate] RESEND_API_KEY not set — form not wired up yet.");
    return {
      ok: false,
      error:
        "Sorry, our form isn't connected yet. Please WhatsApp Jonny directly.",
    };
  }

  const resend = new Resend(apiKey);
  const { name, contact, address, description } = parsed.data;

  try {
    await resend.emails.send({
      from: `${site.brandName} Site <noreply@${site.domain}>`,
      to: [site.contactEmail],
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `New estimate request — ${name}`,
      text: [
        `Name: ${name}`,
        `Contact: ${contact}`,
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
      error: "Couldn't send the request. Please WhatsApp Jonny directly.",
    };
  }
}
