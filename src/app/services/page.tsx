import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowRight, Check, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: `Bathroom, kitchen, and deck remodels plus handyman repairs in ${site.primaryCity} and the surrounding areas. Licensed and insured.`,
};

export default function ServicesPage() {
  const remodels = services.filter((s) => s.tier === "remodel");
  const repairs = services.filter((s) => s.tier === "repair");

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
          Services
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand)] leading-tight">
          What {site.ownerName} handles
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Two tiers of work: bigger remodels (bathrooms, kitchens, decks) and
          the everyday repairs that make a house feel finished. Licensed,
          insured, and done right the first time.
        </p>
      </section>

      {/* Remodels */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-brand)]">
            Remodels
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            The big projects on the truck.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {remodels.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group p-7 rounded-xl border-2 border-[var(--color-brand)]/20 bg-white hover:border-[var(--color-brand)] hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-[var(--color-brand)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
                {s.description}
              </p>
              {s.note && (
                <p className="mt-3 flex items-start gap-2 text-sm text-[var(--color-muted)] bg-[var(--color-surface)] p-3 rounded-md border border-[var(--color-border)]">
                  <Info className="size-4 shrink-0 mt-0.5 text-[var(--color-accent)]" />
                  <span>{s.note}</span>
                </p>
              )}
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand)] group-hover:underline">
                Learn more <ArrowRight className="size-4" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Repairs */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-brand)]">
            Everyday repairs
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            One call to {site.ownerName}. No middlemen, no runaround.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {repairs.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group p-6 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-brand)] hover:shadow-md transition"
            >
              <h3 className="font-semibold text-[var(--color-brand)] group-hover:underline">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                {s.description}
              </p>
              {s.note && (
                <p className="mt-3 flex items-start gap-2 text-xs text-[var(--color-muted)]">
                  <Info className="size-3.5 shrink-0 mt-0.5 text-[var(--color-accent)]" />
                  <span>{s.note}</span>
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-10 p-6 md:p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-brand)]">
            Not sure if {site.ownerName} handles it?
          </h3>
          <p className="mt-2 text-[var(--color-muted)]">
            Send a photo on WhatsApp. If it&apos;s not the right fit,{" "}
            {site.ownerName} will tell you and point you to someone who does.
            No wasted estimates.
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
            How {site.ownerName} works
          </h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4 text-white/90">
            {[
              `Text a photo of what needs doing. ${site.ownerName} replies with a free estimate — usually same day.`,
              "Agree on the quote before any work starts. No surprise fees, no hourly creep.",
              `${site.ownerName} shows up on time, works clean, and respects your home.`,
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
