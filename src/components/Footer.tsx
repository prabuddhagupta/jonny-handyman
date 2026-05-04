import Link from "next/link";
import { site, reviewLink } from "@/site.config";
import { InstagramIcon as Instagram, TruckLogo } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 text-[var(--color-brand)]">
            <TruckLogo className="h-9 w-auto" />
            <p className="font-semibold text-lg">{site.brandName}</p>
          </div>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Run by {site.ownerName}. Licensed & insured.
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Call or text {site.smsNumber} — or WhatsApp for a free estimate.
          </p>
        </div>

        <div>
          <p className="font-medium text-sm text-[var(--color-ink)]">
            Serving
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
            {site.serviceArea.join(" · ")}
          </p>
        </div>

        <div>
          <p className="font-medium text-sm text-[var(--color-ink)]">
            Follow {site.ownerName}&apos;s work
          </p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--color-brand)] hover:underline"
          >
            <Instagram className="size-4" />
            @{site.instagramHandle}
          </a>
          <p className="mt-4 text-xs text-[var(--color-muted)]">
            Yes, with a zero — real account.
          </p>
          <a
            href={reviewLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-[var(--color-brand)] hover:underline"
          >
            Leave a review on Google →
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-muted)]">
          <p>
            {site.legalName} · {site.license} · © {year}
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
