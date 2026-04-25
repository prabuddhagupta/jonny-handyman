"use client";

import { useActionState } from "react";
import { submitEstimate, type EstimateResult } from "@/app/actions";
import { site, reviewLink } from "@/site.config";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const initial: EstimateResult | null = null;

export function EstimateForm() {
  const [state, formAction, pending] = useActionState(submitEstimate, initial);

  if (state?.ok) {
    const review = reviewLink();
    return (
      <div className="p-8 rounded-xl border border-[var(--color-whatsapp)] bg-green-50">
        <CheckCircle2 className="size-8 text-[var(--color-whatsapp)]" />
        <h3 className="mt-3 text-xl font-semibold text-[var(--color-brand)]">
          Thanks — {site.ownerName} will be in touch.
        </h3>
        <p className="mt-2 text-[var(--color-muted)]">
          You&apos;ll usually hear back within a few hours. In a rush? Send a
          WhatsApp and skip the queue.
        </p>
        {review && (
          <p className="mt-4 pt-4 border-t border-[var(--color-whatsapp)]/30 text-sm text-[var(--color-muted)]">
            Already had {site.ownerName} out for a job?{" "}
            <a
              href={review}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-brand)] hover:underline"
            >
              Leave a review on Google →
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Field
        label="Your name"
        name="name"
        required
        defaultValue={state && !state.ok ? state.values?.name : undefined}
        error={state && !state.ok ? state.fieldErrors?.name : undefined}
      />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state && !state.ok ? state.values?.email : undefined}
          error={state && !state.ok ? state.fieldErrors?.email : undefined}
        />
        <Field
          label="Phone or WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(267) 301-0825"
          defaultValue={state && !state.ok ? state.values?.phone : undefined}
          error={state && !state.ok ? state.fieldErrors?.phone : undefined}
        />
      </div>
      <p className="-mt-3 text-xs text-[var(--color-muted)]">
        At least one so {site.ownerName} can reply.
      </p>
      <Field
        label="Address or neighborhood"
        name="address"
        hint={`Optional — helps ${site.ownerName} estimate travel`}
        defaultValue={state && !state.ok ? state.values?.address : undefined}
      />
      <Textarea
        label="What needs fixing?"
        name="description"
        required
        hint="A few details go a long way. Photos help even more — send them by WhatsApp after."
        defaultValue={state && !state.ok ? state.values?.description : undefined}
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
          `Send to ${site.ownerName}`
        )}
      </button>
      <p className="text-xs text-[var(--color-muted)]">
        No spam, no lists. This goes straight to {site.ownerName}&apos;s email.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  required,
  hint,
  error,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  defaultValue?: string;
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
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        className="mt-2 w-full rounded-md border border-[var(--color-border)] px-3 py-2.5 text-base focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 transition aria-[invalid=true]:border-red-500"
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
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  defaultValue?: string;
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
        minLength={10}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        className="mt-2 w-full rounded-md border border-[var(--color-border)] px-3 py-2.5 text-base focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 transition aria-[invalid=true]:border-red-500"
      />
      {error && (
        <span className="block text-xs text-red-700 mt-1">{error}</span>
      )}
    </label>
  );
}
