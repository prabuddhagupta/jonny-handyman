import Link from "next/link";
import { site, services } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GoogleRating } from "@/components/GoogleRating";
import { TruckLogo } from "@/components/icons";
import {
  CheckCircle2,
  Shield,
  MessageSquareText,
  MapPin,
  ArrowRight,
  Wrench,
  DoorOpen,
  Droplets,
  Tv,
  LayoutGrid,
  Hammer,
} from "lucide-react";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "bathroom-remodels": Droplets,
  "kitchen-remodels": Hammer,
  "decks": LayoutGrid,
  "drywall-painting": Wrench,
  "faucets-fixtures": Droplets,
  "doors-locks": DoorOpen,
  "mounting-assembly": Tv,
  "flooring-tile": LayoutGrid,
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[var(--color-surface)]"
        style={{
          backgroundImage: "url('/pattern-blueprint.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90 pointer-events-none"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
                {site.primaryCity} · Est. {site.establishedYear}
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-brand)] leading-[1.05]">
                Bathroom, kitchen, and deck remodels across {site.primaryCity}.
              </h1>
              <p className="mt-5 text-xl text-[var(--color-muted)] leading-relaxed max-w-xl">
                Licensed and insured. Run by {site.ownerName}. One person you
                can actually trust to do the work right — from a full bathroom
                remodel to a tricky drywall patch.
              </p>
              <GoogleRating className="mt-6" />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <WhatsAppButton size="lg" label="Chat on WhatsApp" />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3.5 text-base font-semibold text-[var(--color-brand)] hover:bg-[var(--color-surface)] transition"
                >
                  Request a free estimate
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Licensed & insured · Free estimates · Call or text {site.smsNumber}
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="aspect-[4/5] rounded-2xl bg-white relative overflow-hidden shadow-xl ring-1 ring-[var(--color-border)] flex flex-col items-center justify-center p-8">
                <TruckLogo className="w-full max-w-[260px] h-auto" />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
                  Est. {site.establishedYear} · {site.primaryCity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-4 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Trust icon={Shield} title="Licensed & insured" body="Your home is protected." />
          <Trust icon={MessageSquareText} title="Fast WhatsApp reply" body="Usually within a few hours." />
          <Trust icon={MapPin} title="Local" body={`${site.primaryCity} & surrounding areas only.`} />
          <Trust icon={CheckCircle2} title="No surprise fees" body="Always a quote before we start." />
        </div>
      </section>

      {/* Services — two tiers */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Remodels
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-brand)]">
            The big jobs
          </h2>
          <p className="mt-3 text-lg text-[var(--color-muted)]">
            Bathrooms, kitchens, and decks. Licensed, insured, done right.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {services
            .filter((s) => s.tier === "remodel")
            .map((s) => {
              const Icon = serviceIcons[s.slug] ?? Wrench;
              return (
                <Link
                  key={s.slug}
                  href="/services"
                  className="group p-7 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:shadow-lg transition bg-white"
                >
                  <div className="size-12 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="mt-5 font-semibold text-xl text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                    {s.description}
                  </p>
                </Link>
              );
            })}
        </div>

        <div className="mt-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Everyday repairs
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-brand)]">
            Plus all the small stuff
          </h2>
          <p className="mt-3 text-lg text-[var(--color-muted)]">
            If it&apos;s broken, loose, leaky, or needs to go up on the wall —
            {` ${site.ownerName}`} handles it.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services
            .filter((s) => s.tier === "repair")
            .map((s) => {
              const Icon = serviceIcons[s.slug] ?? Wrench;
              return (
                <Link
                  key={s.slug}
                  href="/services"
                  className="group p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:shadow-md transition bg-white"
                >
                  <Icon className="size-6 text-[var(--color-accent)]" />
                  <h3 className="mt-3 font-semibold text-base text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                    {s.title}
                  </h3>
                </Link>
              );
            })}
        </div>

        <div className="mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            See full service list <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-2xl bg-[var(--color-brand)] text-white p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to get it fixed?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
            Tell {site.ownerName} what you need. You&apos;ll hear back within
            a few hours. Or call {site.smsNumber}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton size="lg" label="Chat on WhatsApp" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition"
            >
              Request a free estimate
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Trust({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-6 text-[var(--color-brand)] shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm text-[var(--color-ink)]">{title}</p>
        <p className="text-sm text-[var(--color-muted)]">{body}</p>
      </div>
    </div>
  );
}
