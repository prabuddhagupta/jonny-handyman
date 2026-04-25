import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, MapPin, Clock } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";

export const metadata: Metadata = {
  title: `About ${site.ownerName}`,
  description: `Meet ${site.ownerName} — your licensed and insured handyman in ${site.primaryCity} and the surrounding areas.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-12 md:pt-24">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
          About
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand)] leading-tight">
          Meet {site.ownerName}.
        </h1>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <div className="relative aspect-[5/12] rounded-2xl overflow-hidden bg-[var(--color-surface)] shadow-md ring-1 ring-[var(--color-border)]">
              <Image
                src="/john.png"
                alt={`${site.ownerName}, owner of ${site.brandName}`}
                fill
                sizes="(min-width: 768px) 300px, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] hover:underline"
            >
              <Instagram className="size-4" />
              Follow on Instagram — @{site.instagramHandle}
            </a>
          </div>

          <div className="md:col-span-2 space-y-5 text-lg text-[var(--color-ink)] leading-relaxed">
            <p>
              {site.ownerName} runs {site.brandName} — a licensed and insured,
              one-person operation serving {site.primaryCity} and the
              surrounding areas. Bathrooms, kitchens, decks, drywall, tile,
              doors, and just about every kind of house repair in between.
            </p>
            <p>
              The truck you&apos;ve seen around the neighborhood (white Ford
              Transit, &quot;REMODELING - BATHROOMS · KITCHENS - DECKS&quot;
              on the side) is his. One person shows up — no rotating crew, no
              subs — so the quality you see on day one is what you get on day
              five.
            </p>
            <p>
              He covers {site.primaryCity} and surrounding neighborhoods —
              Bala Cynwyd, Ardmore, Bryn Mawr, Havertown, Conshohocken, King
              of Prussia, and everywhere in between. Local work only. He&apos;s
              not the guy who drives an hour to a job and charges you for the
              truck.
            </p>
            <p>
              <strong>A note on communication:</strong> {site.ownerName} is
              fastest over WhatsApp and text ({site.smsNumber}). If you call,
              leave a voicemail and he&apos;ll get back to you. For estimates,
              a short description and a photo go a long way.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="grid sm:grid-cols-3 gap-6">
            <Stat
              icon={Shield}
              title={site.license}
              body={`Serving the city since ${site.establishedYear}.`}
            />
            <Stat
              icon={MapPin}
              title={`Local to ${site.primaryCity}`}
              body={`${site.primaryCity}, ${site.state} & surrounding areas`}
            />
            <Stat
              icon={Clock}
              title="Fast replies"
              body="Usually within a few hours."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-brand)]">
          Got a repair in mind?
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">
          Send a photo on WhatsApp. Free estimate, no pressure.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton size="lg" />
        </div>
      </section>
    </>
  );
}

function Stat({
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
        <p className="font-semibold text-[var(--color-ink)]">{title}</p>
        <p className="text-sm text-[var(--color-muted)]">{body}</p>
      </div>
    </div>
  );
}
