import Link from "next/link";
import { site } from "@/site.config";
import { InstagramIcon as Instagram } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-semibold text-[var(--color-brand)] text-lg">
            {site.brandName}
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {site.tagline}
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Text or WhatsApp for a free estimate. We reply within a few hours.
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
            Follow Jonny&apos;s work
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
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-muted)]">
          <p>
            {site.legalName} · © {year}
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
