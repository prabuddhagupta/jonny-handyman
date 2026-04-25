import type { Metadata } from "next";
import { site } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EstimateForm } from "@/components/EstimateForm";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Text, WhatsApp, or email ${site.ownerName} for a free handyman estimate in ${site.primaryCity} and the surrounding areas.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
          Contact
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand)] leading-tight">
          Tell {site.ownerName} what needs fixing.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          WhatsApp is the fastest way. Or fill out the form below —{" "}
          {site.ownerName} will text or email you back within a few hours.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3">
            <div className="p-6 md:p-8 rounded-xl border border-[var(--color-border)] bg-white">
              <h2 className="text-xl font-semibold text-[var(--color-brand)]">
                Request a free estimate
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Short is fine. Photos help a lot — send those on WhatsApp.
              </p>
              <div className="mt-6">
                <EstimateForm />
              </div>
            </div>
          </div>

          <aside className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-[var(--color-brand)] text-white">
              <h3 className="font-semibold text-lg">Fastest: WhatsApp</h3>
              <p className="mt-1 text-sm text-white/80">
                Pre-filled opener so you don&apos;t have to think about what to
                type. Just tap, fill in the blanks, send.
              </p>
              <div className="mt-4">
                <WhatsAppButton size="md" />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-white space-y-4">
              <ContactRow
                icon={Phone}
                label="Text or voicemail"
                value={site.smsNumber}
                href={`tel:${site.smsNumber.replace(/[^\d+]/g, "")}`}
              />
              <ContactRow
                icon={Mail}
                label="Email"
                value={site.contactEmail}
                href={`mailto:${site.contactEmail}`}
              />
              <ContactRow
                icon={Instagram}
                label="Instagram"
                value={`@${site.instagramHandle}`}
                href={site.instagramUrl}
                external
              />
            </div>

            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex items-center gap-2 text-[var(--color-brand)] font-semibold">
                <Clock className="size-5" />
                Hours
              </div>
              <ul className="mt-3 space-y-1 text-sm text-[var(--color-muted)]">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span>{h.day}</span>
                    <span>
                      {h.close ? `${h.open} – ${h.close}` : h.open}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                Texts and WhatsApp messages outside hours still get answered —
                usually next morning.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--color-border)] bg-white">
              <div className="flex items-center gap-2 text-[var(--color-brand)] font-semibold">
                <MapPin className="size-5" />
                Service area
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
                {site.serviceArea.join(" · ")}
              </p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">
                Outside this radius? Ask anyway — we&apos;ll let you know if
                it&apos;s doable.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 group"
    >
      <div className="size-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center shrink-0">
        <Icon className="size-5 text-[var(--color-brand)]" />
      </div>
      <div>
        <p className="text-xs text-[var(--color-muted)]">{label}</p>
        <p className="font-medium text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition">
          {value}
        </p>
      </div>
    </a>
  );
}
