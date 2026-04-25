# Homepage Redesign — Design Spec

**Date:** 2026-04-24
**Branch:** main
**Scope:** Visual redesign of homepage (`/`) inspired by user-supplied mockup, plus a site-wide sticky WhatsApp float.

## Goal

Bring the homepage closer to the visual feel of the supplied mockup — premium, photo-driven, WhatsApp-first — while keeping the existing brand identity, content advantages, and infrastructure intact.

## Decisions (recorded)

| # | Question | Choice |
|---|---|---|
| 1 | Scope | Homepage only (`/`) |
| 2 | Color | **Hybrid** — primary CTAs stay in current brand navy (`--color-brand: #0b1f3a`); borrow mockup's lighter cool surface tones; reserve WhatsApp green (`#25d366`) for WhatsApp-adjacent actions |
| 3 | Portfolio | Single Instagram CTA banner (no fake photos) |
| 4 | Hero image | `/john.png` as full-bleed hero with dark gradient overlay |
| 5 | Approach | C — best-of-both: mockup's hero / About John / IG strip / sticky float / dark CTA, but keep two-tier services (remodels + repairs) |
| 6 | Sticky WhatsApp float | Site-wide, mounted in `layout.tsx` |
| 7 | Service card imagery | Icon-on-gradient placeholders (no stock photos pretending to be John's work) |

## Non-goals

- No changes to `/services`, `/about`, `/contact` pages.
- No changes to `Navbar`, `Footer`, server actions, contact form, BCC, WhatsApp click tracking, cron digest.
- No changes to `site.config.ts` content. New CSS tokens only.
- No new external dependencies.
- No real project photos sourced or added.

## Page architecture

Homepage sections, top to bottom:

1. **Hero** — full-bleed `john.png` + dark overlay
2. **Trust bar** — keep current 4 items, restyle on cool surface
3. **Remodels (Big jobs)** — 3 photo-top cards
4. **Repairs (Small stuff)** — 5-chip strip
5. **About John** — two-column with photo + quote
6. **Recent work** — single Instagram CTA banner
7. **Final dark CTA**

Layout changes (site-wide):

- **Sticky WhatsApp float** mounted in `layout.tsx`

## Section spec

### 1. Hero

- Background: `/john.png` covering full section, `object-fit: cover`, `object-position: center top`.
- Overlay: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.40))`.
- Min-height: `70vh` desktop, `60vh` mobile. Max-height clamp to prevent absurd heights on tall windows: `clamp(560px, 70vh, 760px)`.
- Content container: `max-w-6xl`, left-aligned, vertically centered, ~48px top/bottom padding inside.
- Eyebrow chip: green pill `bg-[var(--color-whatsapp)]/90` with white text, "Est. 1992 · Philadelphia".
- H1 (white): existing copy, "Bathroom, kitchen, and deck remodels across Philadelphia." — `text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]`.
- Body (white/85): existing copy, "Licensed and insured. Run by John. One person you can actually trust to do the work right — from a full bathroom remodel to a tricky drywall patch."
- CTAs (flex-wrap, gap-3):
  - Primary: brand-navy filled pill "Request free estimate" → `/contact`
  - Secondary: green-filled pill "Chat on WhatsApp" — uses existing `WhatsAppButton`
- Sub-line below CTAs (white/70, small): "Licensed & insured · Free estimates · Call or text (267) 301-0825"

### 2. Trust bar

- Same 4 items as today: Licensed & insured / Fast WhatsApp reply / Local / No surprise fees.
- Background: new cool-surface token `--color-surface-cool` (#eff4ff).
- Layout: `grid sm:grid-cols-2 md:grid-cols-4 gap-6`, padded `py-10`.
- Each item: lucide icon (size 28, `text-[var(--color-brand)]`), uppercase tracking-wide label, muted-color body line.
- Bordered top + bottom in `--color-border`.

### 3. Remodels — Big jobs

- Eyebrow "Remodels" (accent color), H2 "The big jobs" (brand color), short body line.
- 3 cards in `md:grid-cols-3 gap-6`. Cards filter from `services.filter(s => s.tier === "remodel")`.
- Card structure:
  - Top: 192px-tall image area = solid background `bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-soft)]` with the corresponding lucide service icon centered (size 48, white/90).
  - Body padding: `p-6`, white background, border `--color-border`.
  - Title `text-xl font-semibold text-[var(--color-ink)]`.
  - Description (existing `service.description`).
  - "Learn more →" in brand color, links to `/services`.
- Hover: border transitions to `--color-brand`, slight `shadow-lg`, image area scales 105%.

### 4. Repairs — Small stuff

- Eyebrow "Everyday repairs", H2 "Plus all the small stuff", short body line.
- 5 chip-cards in `sm:grid-cols-2 lg:grid-cols-5 gap-4`. Filter from `services.filter(s => s.tier === "repair")`.
- Each chip: `p-5 rounded-xl border bg-white`, lucide icon (size 24, `text-[var(--color-accent)]`), title only (no description).
- Below: "See full service list →" link to `/services`.

### 5. About John

- `md:grid-cols-2 gap-12 items-center`.
- Left column:
  - `john.png` in rounded square card, `aspect-square`, `rounded-2xl`, `shadow-xl`, ring `ring-[var(--color-border)]`.
  - Floating quote callout pinned `-bottom-6 -right-6`: white card, `p-6 rounded-xl shadow-lg max-w-xs`, brand-navy quote "Quality you can trust, from a neighbor who cares." with attribution "— John, founder".
- Right column:
  - Eyebrow `text-[var(--color-accent)]` uppercase tracking "MEET YOUR BUILDER".
  - H2 "One person you can trust with your home".
  - Two paragraphs sourced from existing `/about` page (condensed for fit).
  - Single CTA: brand-navy pill "Schedule a consultation" → `/contact`.

### 6. Recent work

- Single horizontal full-width banner card.
- Background: subtle gradient `from-[var(--color-surface)] to-[var(--color-surface-cool)]`.
- Padding: `p-8 md:p-12`, `rounded-2xl`, border `--color-border`.
- Layout: flex row (stack on mobile), Instagram lucide icon on left (size 48, accent color), text block in middle, CTA button on right.
- Headline: "See recent work on Instagram".
- Subtitle: "John posts photos after every job — kitchens, baths, decks, the small stuff."
- CTA: outline pill "@handy_soluti0ns" → `site.instagramUrl`, opens in new tab.
- **Important: no fake project photos.** This section delegates to a place where real photos already live.

### 7. Final dark CTA

- Existing structure. Slight tweaks:
  - Background: brand-navy with subtle pattern overlay using existing `pattern-blueprint.svg` at low opacity (`opacity-10`).
  - Padding bumped to `py-20 md:py-28`.
  - H2 "Ready to get it fixed?" (existing copy retained).
  - Two CTAs: WhatsApp button (green) + outlined-white "Request free estimate" → `/contact`.

### Sticky WhatsApp float

- New component: `src/components/StickyWhatsApp.tsx`. Client component.
- Position: `fixed bottom-6 right-6 z-50`.
- Pill: `bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-hover)]`, white WhatsApp icon (24px), `shadow-2xl`, `rounded-full`.
- Mobile: icon-only, `p-4`.
- Desktop (`sm:` breakpoint): icon + label "Chat with John" using `group-hover` width transition (collapsed → expanded). Use the same animation pattern shown in the user's mockup.
- Click handler: same `fetch('/api/track/whatsapp', ...)` as `WhatsAppButton`. Opens `whatsappLink()` in new tab. Tracking still flows to the daily digest.
- Mounted in `src/app/layout.tsx` so it renders on every page.
- Accessibility: `aria-label="Chat with John on WhatsApp"`, focus ring matches site standard.

## Token additions (`globals.css`)

```css
@theme {
  /* ...existing tokens... */
  --color-surface-cool: #eff4ff;        /* mockup's cool surface */
  --color-surface-cool-hi: #dce9ff;     /* slightly deeper variant for hovers/cards */
}
```

No other tokens introduced. No font changes — keep system Geist sans.

## File-level changes

| File | Change |
|---|---|
| `src/app/page.tsx` | Full rewrite per spec |
| `src/app/layout.tsx` | Mount `<StickyWhatsApp />` after `{children}` |
| `src/app/globals.css` | Add 2 surface-cool tokens |
| `src/components/StickyWhatsApp.tsx` | New |
| `src/components/home/Hero.tsx` | New (extracted to keep page.tsx readable) |
| `src/components/home/TrustBar.tsx` | New |
| `src/components/home/RemodelsGrid.tsx` | New |
| `src/components/home/RepairsStrip.tsx` | New |
| `src/components/home/AboutJohn.tsx` | New |
| `src/components/home/RecentWorkBanner.tsx` | New |
| `src/components/home/FinalCta.tsx` | New |

Section components live under `src/components/home/`. They're page-specific; co-located here rather than in `src/components/` to keep the shared component folder for cross-page primitives.

`src/app/page.tsx` becomes a thin compositor that imports each section in order. Target ≤80 lines.

## Component contracts

All section components are pure presentational server components (no client behavior) and read directly from `@/site.config`. No props at the page level — homepage is a fixed composition.

Exception: `StickyWhatsApp` is a client component (needs `onClick` for tracking). Mirrors the existing `WhatsAppButton` tracking pattern.

## Behavior preserved

- All existing `WhatsAppButton` instances continue to work; this redesign reuses the component for hero + final CTA.
- Click tracking endpoint and daily digest cron continue to function. Sticky float fires the same `/api/track/whatsapp` POST so digest counts increase.
- Contact form server action and BCC unchanged.
- All other routes unchanged.

## Out of scope (explicit)

- New project photos, logos, or hero artwork beyond `john.png`.
- Navbar restyling.
- `/about`, `/services`, `/contact` page redesigns. (User may request later.)
- Dark mode (mockup hints at it via `dark:` classes; current site has no dark mode and we won't add it now).
- Animation library or motion-design beyond simple `transition-*` and `group-hover` width transitions.

## Risks / mitigations

- **`john.png` quality unknown.** If aspect or composition is wrong for a hero, the visual will suffer. Mitigation: during implementation, eyeball it; if it's a head-and-shoulders portrait that doesn't crop well full-bleed, fall back to a brand-navy gradient hero with `john.png` in a smaller framed treatment on the right (similar to current truck-logo placement, just photo instead of logo).
- **Mockup's vibe relies on photos** in service cards and portfolio. We're using icon-on-gradient placeholders and an IG banner instead. Visitor might land expecting more imagery. Mitigation: copy and trust signals do the work; cleaner than fake stock photos.
- **Sticky float can hide content** at the bottom of long pages on mobile. Mitigation: small enough button + tested padding-bottom on the body.

## Acceptance criteria

- [ ] Homepage hero is full-bleed with `john.png` + dark overlay; H1 and CTAs render legibly on top.
- [ ] Trust bar uses `--color-surface-cool` background.
- [ ] Remodel cards visually distinct (photo-top placeholders) from repair chips (icon + title only).
- [ ] About John section renders `john.png` with floating quote callout.
- [ ] Recent work section is a single banner pointing to Instagram (no fake project photos).
- [ ] Sticky WhatsApp float visible on every route (homepage, services, about, contact).
- [ ] Sticky float click triggers `POST /api/track/whatsapp` (verifiable in DevTools Network tab).
- [ ] Build passes (`pnpm build`); no new TypeScript errors.
- [ ] All non-homepage pages visually unchanged.
- [ ] Contact form BCC + cron digest behavior unchanged from prior session.
