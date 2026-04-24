import Link from "next/link";
import { site } from "@/site.config";
import { WhatsAppButton } from "./WhatsAppButton";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[var(--color-border)]">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2 font-semibold text-lg text-[var(--color-brand)]"
        >
          <span>{site.brandName}</span>
          <span className="hidden sm:inline text-xs font-normal text-[var(--color-muted)]">
            · {site.primaryCity} Handyman
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm text-[var(--color-ink)]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-brand)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsAppButton size="sm" label="WhatsApp" className="hidden sm:inline-flex" />
          <WhatsAppButton size="sm" label="Chat" className="sm:hidden" />
        </div>
      </nav>

      {/* Mobile nav row */}
      <ul className="md:hidden flex items-center justify-center gap-5 border-t border-[var(--color-border)] py-2 text-sm">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-brand)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
