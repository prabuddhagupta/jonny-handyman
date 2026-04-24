"use client";

import { useActionState } from "react";
import { submitEstimate, type EstimateResult } from "@/app/actions";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const initial: EstimateResult | null = null;

export function EstimateForm() {
  const [state, formAction, pending] = useActionState(submitEstimate, initial);

  if (state?.ok) {
    return (
      <div className="p-8 rounded-xl border border-[var(--color-whatsapp)] bg-green-50">
        <CheckCircle2 className="size-8 text-[var(--color-whatsapp)]" />
        <h3 className="mt-3 text-xl font-semibold text-[var(--color-brand)]">
          Thanks — Jonny will be in touch.
        </h3>
        <p className="mt-2 text-[var(--color-muted)]">
          You&apos;ll usually hear back within a few hours. In a rush? Send a
          WhatsApp and skip the queue.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Field
        label="Your name"
        name="name"
        required
        error={state && !state.ok ? state.fieldErrors?.name : undefined}
      />
      <Field
        label="Best way to reach you (phone, WhatsApp, or email)"
        name="contact"
        required
        error={state && !state.ok ? state.fieldErrors?.contact : undefined}
      />
      <Field
        label="Address or neighborhood"
        name="address"
        hint="Optional — helps Jonny estimate travel"
      />
      <Textarea
        label="What needs fixing?"
        name="description"
        required
        hint="A few details go a long way. Photos help even more — send them by WhatsApp after."
        error={state && !state.ok ? state.fieldErrors?.description : undefined}
      />

      {state && !state.ok && !state.fieldErrors && (
        <div className="flex items-start gap-2 p-3 rounded-md bg-red-50 text-red-800 text-sm">
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] text-white px-6 py-3.5 font-semibold hover:bg-[var(--color-brand-soft)] disabled:opacity-50 transition"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send to Jonny"
        )}
      </button>
      <p className="text-xs text-[var(--color-muted)]">
        No spam, no lists. This goes straight to Jonny&apos;s email.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  hint,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[var(--color-ink)]">
        {label} {required && <span className="text-[var(--color-accent)]">*</span>}
      </span>
      {hint && (
        <span className="block text-xs text-[var(--color-muted)] mt-0.5">
          {hint}
        </span>
      )}
      <input
        name={name}
        type="text"
        required={required}
        className="mt-2 w-full rounded-md border border-[var(--color-border)] px-3 py-2.5 text-base focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 transition"
      />
      {error && (
        <span className="block text-xs text-red-700 mt-1">{error}</span>
      )}
    </label>
  );
}

function Textarea({
  label,
  name,
  required,
  hint,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[var(--color-ink)]">
        {label} {required && <span className="text-[var(--color-accent)]">*</span>}
      </span>
      {hint && (
        <span className="block text-xs text-[var(--color-muted)] mt-0.5">
          {hint}
        </span>
      )}
      <textarea
        name={name}
        required={required}
        rows={5}
        className="mt-2 w-full rounded-md border border-[var(--color-border)] px-3 py-2.5 text-base focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 transition"
      />
      {error && (
        <span className="block text-xs text-red-700 mt-1">{error}</span>
      )}
    </label>
  );
}
