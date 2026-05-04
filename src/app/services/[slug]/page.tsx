import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowRight, MessageSquareText, Shield, MapPin } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const title = `${service.title} in ${site.primaryCity}`;
  const description = `${service.description} Run by ${site.ownerName}, serving ${site.primaryCity} and the Main Line. ${site.license}, insured.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description: service.description,
      url: `https://${site.domain}/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 6);
  const baseUrl = `https://${site.domain}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in ${site.primaryCity}`,
    description: service.description,
    serviceType: service.title,
    url: `${baseUrl}/services/${service.slug}`,
    provider: { "@id": `${baseUrl}#business` },
    areaServed: site.serviceArea.map((c) => ({
      "@type": "City",
      name: `${c}, ${site.state}`,
    })),
  };

  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
          {service.tier === "remodel" ? "Remodel" : "Repair"} ·{" "}
          {site.primaryCity}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand)] leading-tight">
          {service.title} in {site.primaryCity}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          {service.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <WhatsAppButton size="lg" label="Free estimate on WhatsApp" />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3.5 text-base font-semibold text-[var(--color-brand)] hover:bg-[var(--color-surface)] transition"
          >
            Use the form instead
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <p className="mt-5 text-sm text-[var(--color-muted)]">
          Licensed & insured · Free estimates · Call or text {site.smsNumber}
        </p>
      </section>

      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-4 py-8 grid sm:grid-cols-3 gap-6">
          <Trust
            icon={Shield}
            title="Licensed & insured"
            body={site.license}
          />
          <Trust
            icon={MessageSquareText}
            title="Fast WhatsApp reply"
            body="Usually within a few hours."
          />
          <Trust
            icon={MapPin}
            title="Local"
            body={`${site.primaryCity} and surrounding areas.`}
          />
        </div>
      </section>

      {service.faqs && service.faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-brand)]">
            {service.title} — common questions
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Quick answers from {site.ownerName}.
          </p>
          <div className="mt-8 space-y-7">
            {service.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-[var(--color-ink)]">
                  {f.q}
                </h3>
                <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-[var(--color-brand)]">
          Where {site.ownerName} works
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          {site.serviceArea.join(" · ")}.
        </p>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Outside this radius? Ask anyway — we&apos;ll let you know if it&apos;s
          doable.
        </p>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            Other things {site.ownerName} handles
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-5 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-brand)] hover:shadow-md transition"
              >
                <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-[var(--color-brand)] text-white p-10 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Ready to get your {service.title.toLowerCase()} done?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
            Send {site.ownerName} a photo on WhatsApp. You&apos;ll get a free
            estimate, usually within a few hours.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton size="lg" label="Chat on WhatsApp" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Or use the form
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
