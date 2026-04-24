import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowRight, Check, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: `Handyman services in ${site.primaryCity} and the Main Line — drywall, faucets, doors, mounting, tile, and small remodels.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
          Services
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand)] leading-tight">
          What Jonny fixes
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          If it&apos;s in a home and it&apos;s broken, chipped, loose, leaky, or
          just not installed yet — ask. If it&apos;s not on this list, Jonny
          will tell you straight.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s) => (
            <article
              key={s.slug}
              className="p-7 rounded-xl border border-[var(--color-border)] bg-white"
            >
              <h2 className="text-xl font-semibold text-[var(--color-brand)]">
                {s.title}
              </h2>
              <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
                {s.description}
              </p>
              {s.note && (
                <p className="mt-3 flex items-start gap-2 text-sm text-[var(--color-muted)] bg-[var(--color-surface)] p-3 rounded-md border border-[var(--color-border)]">
                  <Info className="size-4 shrink-0 mt-0.5 text-[var(--color-accent)]" />
                  <span>{s.note}</span>
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 p-6 md:p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-brand)]">
            Not sure if Jonny handles it?
          </h3>
          <p className="mt-2 text-[var(--color-muted)]">
            Send a photo on WhatsApp. If it&apos;s something Jonny doesn&apos;t
            do, he&apos;ll tell you and point you to someone who does. No
            wasted estimates.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <WhatsAppButton label="Send a photo on WhatsApp" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)] hover:bg-white transition"
            >
              Request a full estimate
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brand)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">
            The way Jonny works
          </h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4 text-white/90">
            {[
              "Text a photo of what needs fixing. Jonny replies with a free estimate — usually same day.",
              "Agree on the quote before any work starts. No surprise fees, no hourly creep.",
              "Jonny shows up on time, works clean, and respects your home.",
              "If something isn't right after the job, he comes back and fixes it.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="size-5 shrink-0 mt-0.5 text-[var(--color-whatsapp)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
