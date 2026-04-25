# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage (`/`) to match the agreed design — premium photo-driven hero, restyled trust bar, photo-top remodel cards, repair chips, About John section, Instagram CTA banner, dark final CTA — and add a site-wide sticky WhatsApp float that ties into the existing click-tracking pipeline.

**Architecture:** Decompose the homepage into seven server-component sections under `src/components/home/`, each driven by `@/site.config`. Add one client island (`StickyWhatsApp`) mounted in `src/app/layout.tsx`. `src/app/page.tsx` becomes a thin compositor.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 (with `@theme` CSS-var tokens in `globals.css`), lucide-react icons, `next/image`. No new dependencies. No test framework in the project — verification is `pnpm build` + manual browser smoke test.

**Important constraint:** `public/john.png` is **416 × 1002** (tall portrait). The hero design uses a split layout — text on the left over a brand-navy background with a blueprint pattern, john.png positioned on the right with a left-edge gradient fade into the navy. Full-bleed cropping would cut his head off.

**Reference:** Design spec at `docs/superpowers/specs/2026-04-24-homepage-redesign-design.md`.

---

## File structure

| Path | Status | Responsibility |
|---|---|---|
| `src/app/globals.css` | modify | Add 2 surface-cool tokens |
| `src/app/layout.tsx` | modify | Mount `<StickyWhatsApp />` once, after `<Footer />` |
| `src/app/page.tsx` | rewrite | Compose homepage sections in order; ~30 lines |
| `src/components/StickyWhatsApp.tsx` | create | Client component: site-wide floating WhatsApp button with click tracking |
| `src/components/home/Hero.tsx` | create | Dark navy hero with john.png on right + headline/CTAs on left |
| `src/components/home/TrustBar.tsx` | create | 4-icon trust bar on cool surface |
| `src/components/home/RemodelsGrid.tsx` | create | 3 photo-top cards (gradient + icon placeholder) |
| `src/components/home/RepairsStrip.tsx` | create | 5 chip-cards for repair services |
| `src/components/home/AboutJohn.tsx` | create | Two-column: john.png with quote callout + copy |
| `src/components/home/RecentWorkBanner.tsx` | create | Single banner pointing to Instagram |
| `src/components/home/FinalCta.tsx` | create | Dark CTA section with WhatsApp + estimate buttons |

All `home/*` components are server components (no `"use client"`). `StickyWhatsApp` is a client component (it has `onClick`). Section components read directly from `@/site.config` and take no props.

---

## Task 1: Foundation — CSS tokens, sticky float, layout mount

**Goal:** Establish the shared visual tokens and add a sticky WhatsApp float that's visible on every page (including current `/services`, `/about`, `/contact`). Verifies in isolation before any homepage change.

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/StickyWhatsApp.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1.1: Add cool-surface tokens to globals.css**

Edit `src/app/globals.css` and add two new tokens inside the existing `@theme { ... }` block, after `--color-surface`:

```css
@theme {
  --color-brand: #0b1f3a;
  --color-brand-soft: #1e3a5f;
  --color-accent: #ea580c;
  --color-whatsapp: #25d366;
  --color-whatsapp-hover: #1ebe5a;
  --color-ink: #0a0a0a;
  --color-muted: #57534e;
  --color-border: #e7e5e4;
  --color-surface: #fafaf9;
  --color-surface-cool: #eff4ff;
  --color-surface-cool-hi: #dce9ff;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

- [ ] **Step 1.2: Create StickyWhatsApp component**

Create `src/components/StickyWhatsApp.tsx` with the following exact content:

```tsx
"use client";

import { whatsappLink, site } from "@/site.config";

export function StickyWhatsApp() {
  const handleClick = () => {
    try {
      fetch("/api/track/whatsapp", {
        method: "POST",
        keepalive: true,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`Chat with ${site.ownerName} on WhatsApp`}
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-hover)] text-white shadow-2xl px-4 py-4 sm:py-3 transition-colors"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-[max-width,margin] duration-300 group-hover:max-w-[160px] group-hover:ml-1">
        Chat with {site.ownerName}
      </span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.861 9.861 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
```

- [ ] **Step 1.3: Mount StickyWhatsApp in layout.tsx**

Edit `src/app/layout.tsx`. Add this import after the existing `Footer` import:

```tsx
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
```

Then inside `<body>`, add `<StickyWhatsApp />` immediately after `<Footer />`:

```tsx
<LocalBusinessSchema />
<Navbar />
<main className="flex-1">{children}</main>
<Footer />
<StickyWhatsApp />
```

- [ ] **Step 1.4: Run build to verify**

Run: `pnpm build`
Expected: build succeeds, no TypeScript errors. Output should still show 9 routes (no new ones).

- [ ] **Step 1.5: Visual smoke test**

Run `pnpm dev` (or use already-running dev server). Open `http://localhost:3000` and visit each route: `/`, `/services`, `/about`, `/contact`. The green WhatsApp pill should be visible bottom-right on every route. Hover should expand "Chat with John" label on desktop. Click should open WhatsApp in a new tab. In DevTools Network tab, click should fire `POST /api/track/whatsapp` returning 204.

- [ ] **Step 1.6: Commit**

```bash
git add src/app/globals.css src/components/StickyWhatsApp.tsx src/app/layout.tsx
git commit -m "$(cat <<'EOF'
feat: add site-wide sticky WhatsApp float and cool-surface tokens

- StickyWhatsApp: fixed bottom-right pill, expands on hover, fires
  the same /api/track/whatsapp tracking endpoint as WhatsAppButton so
  clicks land in the daily digest.
- Two new CSS tokens (--color-surface-cool, --color-surface-cool-hi)
  borrowed from the redesign mockup, used by upcoming homepage sections.
EOF
)"
```

---

## Task 2: Hero section

**Goal:** Replace the current truck-logo hero with a dramatic split layout — text on the left over a brand-navy background with blueprint pattern, john.png anchored to the right with a left-edge fade.

**Files:**
- Create: `src/components/home/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 2.1: Create Hero.tsx**

Create `src/components/home/Hero.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-brand)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url('/pattern-blueprint.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
        }}
      />
      <div className="absolute inset-y-0 right-0 hidden md:block w-[42%] lg:w-[36%]">
        <Image
          src="/john.png"
          alt={`${site.ownerName}, founder of ${site.brandName}`}
          fill
          priority
          sizes="(min-width: 768px) 42vw, 0px"
          className="object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-brand)]/40 to-transparent"
        />
      </div>

      <div
        className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 lg:py-32 flex flex-col justify-center"
        style={{ minHeight: "clamp(560px, 70vh, 760px)" }}
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 py-1 text-sm font-semibold text-white shadow">
            Est. {site.establishedYear} · {site.primaryCity}
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
            Bathroom, kitchen, and deck remodels across {site.primaryCity}.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
            Licensed and insured. Run by {site.ownerName}. One person you can
            actually trust to do the work right — from a full bathroom remodel
            to a tricky drywall patch.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[var(--color-brand)] hover:bg-white/90 transition shadow-lg"
            >
              Request free estimate
              <ArrowRight className="size-4" />
            </Link>
            <WhatsAppButton size="lg" label="Chat on WhatsApp" />
          </div>
          <p className="mt-5 text-sm text-white/70">
            Licensed & insured · Free estimates · Call or text {site.smsNumber}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2.2: Replace hero in page.tsx**

Edit `src/app/page.tsx`. Add import at top of imports block:

```tsx
import { Hero } from "@/components/home/Hero";
```

Then replace the entire `{/* Hero */}` section (lines 33–85 in the current file — the whole `<section ...>` block ending at the matching `</section>` plus its closing comment) with:

```tsx
<Hero />
```

Do not remove other sections yet. The intermediate state of `page.tsx` will have an unused import (`TruckLogo`) — that's expected and will be cleaned in Task 9.

- [ ] **Step 2.3: Build to verify**

Run: `pnpm build`
Expected: build succeeds. Lint may emit an "unused import" warning for `TruckLogo` — acceptable; cleaned later.

- [ ] **Step 2.4: Visual smoke test**

Open `http://localhost:3000`. The hero should now be navy with john's photo on the right (desktop), green eyebrow chip, white headline, white "Request free estimate" button, green WhatsApp button. On mobile (< 768px), photo is hidden — content sits over the navy + pattern.

- [ ] **Step 2.5: Commit**

```bash
git add src/components/home/Hero.tsx src/app/page.tsx
git commit -m "$(cat <<'EOF'
feat(home): replace hero with split navy layout + john portrait

Brand-navy bg with subtle blueprint pattern and john.png anchored
right (desktop only) with a left-edge gradient fade. Green eyebrow
chip, white H1, white primary CTA + green WhatsApp secondary.
john.png is 416x1002 portrait — full-bleed cropping isn't viable,
so the hero uses a side-frame composition instead.
EOF
)"
```

---

## Task 3: Trust bar

**Goal:** Restyle the existing 4-item trust bar to sit on the new cool-surface background, mockup-style uppercase labels.

**Files:**
- Create: `src/components/home/TrustBar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 3.1: Create TrustBar.tsx**

Create `src/components/home/TrustBar.tsx`:

```tsx
import { CheckCircle2, MapPin, MessageSquareText, Shield } from "lucide-react";
import { site } from "@/site.config";

type Item = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const items: ReadonlyArray<Item> = [
  { icon: Shield, title: "Licensed & insured", body: "Your home is protected." },
  { icon: MessageSquareText, title: "Fast WhatsApp reply", body: "Usually within a few hours." },
  { icon: MapPin, title: "Local", body: `${site.primaryCity} & surrounding areas only.` },
  { icon: CheckCircle2, title: "No surprise fees", body: "Always a quote before we start." },
];

export function TrustBar() {
  return (
    <section className="bg-[var(--color-surface-cool)] border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="size-7 text-[var(--color-brand)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm uppercase tracking-wider text-[var(--color-ink)]">
                {title}
              </p>
              <p className="text-sm text-[var(--color-muted)] mt-1 normal-case">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3.2: Replace trust bar in page.tsx**

Edit `src/app/page.tsx`. Add to imports:

```tsx
import { TrustBar } from "@/components/home/TrustBar";
```

Replace the entire `{/* Trust bar */}` section (the `<section>` block containing the four `<Trust ... />` calls) with:

```tsx
<TrustBar />
```

- [ ] **Step 3.3: Build to verify**

Run: `pnpm build`
Expected: build succeeds. The local `Trust` helper function in `page.tsx` becomes orphaned — leave for now, cleaned in Task 9.

- [ ] **Step 3.4: Visual smoke test**

`http://localhost:3000` — trust bar should now sit on the lighter cool-blue surface with uppercase labels.

- [ ] **Step 3.5: Commit**

```bash
git add src/components/home/TrustBar.tsx src/app/page.tsx
git commit -m "feat(home): extract trust bar to component on cool surface"
```

---

## Task 4: Remodels grid

**Goal:** Replace the inline remodel cards with photo-top cards (gradient + service icon as placeholder image, no fake stock photos).

**Files:**
- Create: `src/components/home/RemodelsGrid.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 4.1: Create RemodelsGrid.tsx**

Create `src/components/home/RemodelsGrid.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight, Droplets, Hammer, LayoutGrid, Wrench } from "lucide-react";
import { services } from "@/site.config";

const remodelIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "bathroom-remodels": Droplets,
  "kitchen-remodels": Hammer,
  decks: LayoutGrid,
};

export function RemodelsGrid() {
  const remodels = services.filter((s) => s.tier === "remodel");

  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
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

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {remodels.map((s) => {
          const Icon = remodelIcons[s.slug] ?? Wrench;
          return (
            <Link
              key={s.slug}
              href="/services"
              className="group rounded-2xl overflow-hidden border border-[var(--color-border)] bg-white hover:border-[var(--color-brand)] hover:shadow-xl transition"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-soft)] flex items-center justify-center">
                <Icon className="size-14 text-white/90 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {s.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)]">
                  Learn more
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4.2: Replace remodels block in page.tsx**

Edit `src/app/page.tsx`. Add import:

```tsx
import { RemodelsGrid } from "@/components/home/RemodelsGrid";
```

Background: the current page.tsx has a single outer `<section className="mx-auto max-w-6xl px-4 py-20">` wrapping both the remodels subsection and the repairs subsection. After this task, the new `<RemodelsGrid />` component owns its own outer `<section>` and the repairs JSX still needs spacing.

Make these specific edits:

1. Replace the outer `<section className="mx-auto max-w-6xl px-4 py-20">` opening tag with the bare component call:
   ```tsx
   <RemodelsGrid />
   <section className="mx-auto max-w-6xl px-4 pb-20">
   ```
2. Delete the *inner* remodels content (the `<div className="max-w-2xl">` containing the "Remodels" eyebrow, the H2, and the body line — and the following remodels grid). Stop deleting at the line *before* the "Everyday repairs" eyebrow.
3. Leave the repairs subsection (eyebrow → chip grid → "See full service list" link) inline. It is now wrapped by the new repairs-only `<section className="mx-auto max-w-6xl px-4 pb-20">` introduced in step 1. We replace it with `<RepairsStrip />` in Task 5.

After this step, the file should have `<RemodelsGrid />` immediately followed by a `<section>` containing only the repairs JSX. Confirm this by reading page.tsx before continuing.

- [ ] **Step 4.3: Build to verify**

Run: `pnpm build`
Expected: success.

- [ ] **Step 4.4: Visual smoke test**

`http://localhost:3000` — remodel cards now have a tall navy gradient header with a centered service icon, hover lifts the border to brand-navy and shadow, "Learn more →" CTA at bottom.

- [ ] **Step 4.5: Commit**

```bash
git add src/components/home/RemodelsGrid.tsx src/app/page.tsx
git commit -m "feat(home): photo-top remodel cards with icon-on-gradient placeholders"
```

---

## Task 5: Repairs strip

**Goal:** Replace inline repair cards with a chip-strip component.

**Files:**
- Create: `src/components/home/RepairsStrip.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 5.1: Create RepairsStrip.tsx**

Create `src/components/home/RepairsStrip.tsx`:

```tsx
import Link from "next/link";
import {
  ArrowRight,
  DoorOpen,
  Droplets,
  LayoutGrid,
  Tv,
  Wrench,
} from "lucide-react";
import { services, site } from "@/site.config";

const repairIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "drywall-painting": Wrench,
  "faucets-fixtures": Droplets,
  "doors-locks": DoorOpen,
  "mounting-assembly": Tv,
  "flooring-tile": LayoutGrid,
};

export function RepairsStrip() {
  const repairs = services.filter((s) => s.tier === "repair");

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-20">
      <div className="max-w-2xl">
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
        {repairs.map((s) => {
          const Icon = repairIcons[s.slug] ?? Wrench;
          return (
            <Link
              key={s.slug}
              href="/services"
              className="group p-5 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-brand)] hover:shadow-md transition"
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
        >
          See full service list
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 5.2: Replace repairs block in page.tsx**

Edit `src/app/page.tsx`. Add import:

```tsx
import { RepairsStrip } from "@/components/home/RepairsStrip";
```

Replace the entire repairs subsection (eyebrow "Everyday repairs" + chip grid + "See full service list" link, including the wrapping `<section>`) with:

```tsx
<RepairsStrip />
```

- [ ] **Step 5.3: Build to verify**

Run: `pnpm build`
Expected: success.

- [ ] **Step 5.4: Visual smoke test**

`http://localhost:3000` — repairs section unchanged in content, just now sourced from the new component.

- [ ] **Step 5.5: Commit**

```bash
git add src/components/home/RepairsStrip.tsx src/app/page.tsx
git commit -m "feat(home): extract repairs chip strip to component"
```

---

## Task 6: About John section (new)

**Goal:** Add a new About John section between the repairs strip and the (existing) final CTA. Two-column on desktop: john.png in a tall card on the left with a floating quote callout, copy + CTA on the right.

**Files:**
- Create: `src/components/home/AboutJohn.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 6.1: Create AboutJohn.tsx**

Create `src/components/home/AboutJohn.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";

export function AboutJohn() {
  return (
    <section className="bg-[var(--color-surface-cool)] border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative max-w-md mx-auto md:mx-0 w-full">
          <div className="relative aspect-[5/12] rounded-2xl overflow-hidden bg-white shadow-xl ring-1 ring-[var(--color-border)]">
            <Image
              src="/john.png"
              alt={`${site.ownerName}, founder of ${site.brandName}`}
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 sm:-right-6 max-w-[260px] bg-white p-5 rounded-xl shadow-lg border border-[var(--color-border)]">
            <p className="text-base font-semibold text-[var(--color-brand)] leading-snug">
              &ldquo;Quality you can trust, from a neighbor who cares.&rdquo;
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              — {site.ownerName}, founder
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Meet your builder
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-brand)]">
            One person you can trust with your home.
          </h2>
          <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed">
            Hi, I&apos;m {site.ownerName}. I run {site.brandName} — a licensed
            and insured, one-person operation serving {site.primaryCity} and
            the surrounding areas. Bathrooms, kitchens, decks, and just about
            every kind of house repair in between.
          </p>
          <p className="mt-4 text-lg text-[var(--color-muted)] leading-relaxed">
            One person shows up — no rotating crew, no subs — so the quality
            you see on day one is what you get on day five.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] px-6 py-3.5 text-base font-semibold text-white transition shadow"
            >
              Schedule a consultation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.2: Insert AboutJohn into page.tsx**

Edit `src/app/page.tsx`. Add import:

```tsx
import { AboutJohn } from "@/components/home/AboutJohn";
```

Add `<AboutJohn />` between `<RepairsStrip />` and the existing `{/* Final CTA */}` section.

- [ ] **Step 6.3: Build to verify**

Run: `pnpm build`
Expected: success.

- [ ] **Step 6.4: Visual smoke test**

`http://localhost:3000` — new About John section between repairs and final CTA. Photo on left, floating quote card slightly overlapping bottom-right of the photo, copy + "Schedule a consultation" CTA on right.

- [ ] **Step 6.5: Commit**

```bash
git add src/components/home/AboutJohn.tsx src/app/page.tsx
git commit -m "feat(home): add About John section with portrait + quote callout"
```

---

## Task 7: Recent work banner (new)

**Goal:** Add a single horizontal banner pointing to Instagram in place of fake portfolio photos.

**Files:**
- Create: `src/components/home/RecentWorkBanner.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 7.1: Create RecentWorkBanner.tsx**

Create `src/components/home/RecentWorkBanner.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { InstagramIcon } from "@/components/icons";

export function RecentWorkBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-cool)] p-8 md:p-12 hover:border-[var(--color-brand)] hover:shadow-lg transition"
      >
        <div className="flex items-center justify-center size-16 rounded-2xl bg-white border border-[var(--color-border)] shrink-0">
          <InstagramIcon className="size-8 text-[var(--color-accent)]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Recent work
          </p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-brand)]">
            See real projects on Instagram
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            {site.ownerName} posts photos after every job — kitchens, baths,
            decks, and the small stuff.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-brand)] group-hover:bg-[var(--color-brand)] group-hover:text-white transition shrink-0">
          @{site.instagramHandle}
          <ArrowRight className="size-4" />
        </span>
      </a>
    </section>
  );
}
```

- [ ] **Step 7.2: Insert RecentWorkBanner into page.tsx**

Edit `src/app/page.tsx`. Add import:

```tsx
import { RecentWorkBanner } from "@/components/home/RecentWorkBanner";
```

Add `<RecentWorkBanner />` between `<AboutJohn />` and the existing `{/* Final CTA */}` section.

- [ ] **Step 7.3: Build to verify**

Run: `pnpm build`
Expected: success.

- [ ] **Step 7.4: Visual smoke test**

`http://localhost:3000` — new full-width Instagram banner card after About John. Hover should turn the @-handle pill from outlined to filled brand-navy. Click opens Instagram in a new tab.

- [ ] **Step 7.5: Commit**

```bash
git add src/components/home/RecentWorkBanner.tsx src/app/page.tsx
git commit -m "feat(home): add Instagram banner instead of fake portfolio photos"
```

---

## Task 8: Final CTA section

**Goal:** Extract the existing dark CTA into a component and add a subtle blueprint-pattern overlay to match the mockup vibe.

**Files:**
- Create: `src/components/home/FinalCta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 8.1: Create FinalCta.tsx**

Create `src/components/home/FinalCta.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-brand)] text-white p-10 md:p-16 text-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('/pattern-blueprint.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "240px 240px",
          }}
        />
        <div className="relative">
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
      </div>
    </section>
  );
}
```

- [ ] **Step 8.2: Replace final CTA in page.tsx**

Edit `src/app/page.tsx`. Add import:

```tsx
import { FinalCta } from "@/components/home/FinalCta";
```

Replace the entire `{/* Final CTA */}` section (the whole `<section>` block at the bottom) with:

```tsx
<FinalCta />
```

- [ ] **Step 8.3: Build to verify**

Run: `pnpm build`
Expected: success.

- [ ] **Step 8.4: Visual smoke test**

`http://localhost:3000` — final CTA looks essentially the same, with a subtle blueprint pattern overlay for texture.

- [ ] **Step 8.5: Commit**

```bash
git add src/components/home/FinalCta.tsx src/app/page.tsx
git commit -m "feat(home): extract final CTA to component with subtle pattern overlay"
```

---

## Task 9: page.tsx cleanup — thin compositor

**Goal:** Remove orphaned helpers, unused imports, and reduce `page.tsx` to a clean composition of section components.

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 9.1: Rewrite page.tsx**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { RemodelsGrid } from "@/components/home/RemodelsGrid";
import { RepairsStrip } from "@/components/home/RepairsStrip";
import { AboutJohn } from "@/components/home/AboutJohn";
import { RecentWorkBanner } from "@/components/home/RecentWorkBanner";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <RemodelsGrid />
      <RepairsStrip />
      <AboutJohn />
      <RecentWorkBanner />
      <FinalCta />
    </>
  );
}
```

This drops every unused import (lucide icons, `Link`, `Image`, `WhatsAppButton`, `TruckLogo`, `services`, `site`, `serviceIcons`, the `Trust` helper).

- [ ] **Step 9.2: Build to verify**

Run: `pnpm build`
Expected: success, no warnings.

- [ ] **Step 9.3: Lint**

Run: `pnpm lint`
Expected: no errors. Any warnings unrelated to homepage files are pre-existing.

- [ ] **Step 9.4: Commit**

```bash
git add src/app/page.tsx
git commit -m "refactor(home): page.tsx becomes a thin section compositor"
```

---

## Task 10: End-to-end verification

**Goal:** Confirm every acceptance criterion from the spec.

**Files:** None modified — verification only.

- [ ] **Step 10.1: Build**

Run: `pnpm build`
Expected: succeeds with the same 9 routes as before (5 static pages, sitemap, robots, plus the 2 API routes added in the prior session).

- [ ] **Step 10.2: Dev server smoke test**

Run `pnpm dev` (or use a running instance). Walk through each acceptance criterion:

- Open `/` — verify hero is navy with john on the right (desktop) and pattern bg + content on mobile.
- Verify trust bar is on cool-blue surface.
- Verify remodel cards have gradient image headers with icons.
- Verify repair chips below show 5 services.
- Verify About John section renders with floating quote.
- Verify Recent Work is a single Instagram banner — no fake project photos visible.
- Verify final CTA has both WhatsApp + estimate buttons.
- Verify sticky float visible at bottom-right.

Then visit `/services`, `/about`, `/contact`. Each route should be visually unchanged from before this branch's redesign work, with the exception that the sticky WhatsApp float now appears on every page.

- [ ] **Step 10.3: Click-tracking sanity**

In DevTools Network tab on `/`, click the sticky WhatsApp float. Confirm `POST /api/track/whatsapp` returns `204` (silent no-op locally without Upstash; that's expected). Repeat with the in-hero green WhatsApp button — same call should fire.

- [ ] **Step 10.4: Form sanity**

Visit `/contact`, submit the form with valid values. If `RESEND_API_KEY` is set in `.env.local`, confirm the success state renders. (No need to verify BCC delivery here — that's the prior session's work; just confirm we didn't break the form by accident.)

- [ ] **Step 10.5: Mobile viewport check**

In DevTools, switch to a 375px-wide viewport. Reload `/`. Verify:
- Hero: pattern bg with text/CTAs visible (no john photo on mobile, by design).
- Trust bar: 2 columns.
- Remodels: 1 column.
- Repairs: 2 columns.
- About John: stacked, photo above copy.
- Recent work banner: stacked.
- Final CTA: stacked buttons.
- Sticky float: icon-only (no expanding label) on tap.

- [ ] **Step 10.6: Final tag commit (optional)**

If everything passes, no further code commit. Update the design spec if anything changed during implementation.

---

## Self-review notes

**Spec coverage:**
- Hero (john.png + dark overlay): Task 2. *Spec adapted for portrait orientation — split layout instead of full-bleed; documented in plan front-matter.*
- Trust bar restyle on cool surface: Task 3.
- Remodels photo-top cards: Task 4 (icon-on-gradient, no fake photos — matches Q3 + spec acceptance criterion).
- Repairs chip strip: Task 5.
- About John with quote callout: Task 6.
- Recent work Instagram banner: Task 7.
- Final dark CTA: Task 8.
- Sticky WhatsApp site-wide: Task 1.
- Color tokens: Task 1.
- File layout under `src/components/home/`: every component task.
- Acceptance criteria: Task 10 walks each one.

**Type/name consistency:**
- `serviceIcons` map renamed to `remodelIcons` / `repairIcons` per file (each is local to one component, scope-limited).
- `whatsappLink()` and `site` imports stay identical to existing usage.
- `Image` props match existing `/about` page conventions (`fill` + `sizes` + `priority` on hero).

**No placeholders:** every code block is complete and runnable.

**Scope:** appropriate for a single plan — homepage + 1 layout addition. ~250 lines of net new code.
