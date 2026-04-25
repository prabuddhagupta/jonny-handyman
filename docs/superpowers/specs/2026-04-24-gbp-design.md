# Google Business Profile + review pipeline — design

Set up John's Google Business Profile (GBP) from scratch, align the site's
brand with the new profile name, and stub the review-request pipeline so
asks activate the moment GBP verifies.

**Status on 2026-04-24:** no existing GBP. A Yelp listing exists at
`yelp.com/biz/johny-handyman-philadelphia` under the pre-pivot name
"Johny Handyman" — out of scope for this spec, flagged as a manual
follow-up.

## Why

Per the project README, "~80% of leads will actually come from" Google
Business Profile. The site supports GBP, not the other way around.
Today there is no GBP, no reviews, and three different business names
across channels (Yelp "Johny Handyman" / truck + site "Handyman House
Repair" / owner "John"). Local SEO rewards NAP (Name-Address-Phone)
consistency; we need one name on every channel.

## Decisions locked in brainstorming

- **GBP business name:** `John's Handyman House Repair`. Chosen over
  bare "Handyman House Repair" (too generic — risks keyword-stuff
  rejection) and "Johny Handyman" (rolls the brand back to the
  pre-pivot name).
- **Primary category:** `Handyman`. Single most important ranking
  signal — Google weights primary >> secondary.
- **Verification path:** video (service-area businesses almost always
  get routed to video verification now; postcard is rare for this
  profile type).
- **`/review` redirect route:** deferred. Not shipping this session.

## Deliverables — three pieces, one PR

### 1. `docs/gbp-setup.md` — operational playbook

A standalone markdown doc John (or someone acting for him) executes on
business.google.com. Every field pre-filled from `site.config.ts`.

**Contents:**

- **Business name:** `John's Handyman House Repair`
- **Primary category:** `Handyman`
- **Secondary categories (up to 9):** `Bathroom remodeler`,
  `Kitchen remodeler`, `Deck builder`, `Drywall contractor`, `Painter`,
  `Flooring contractor`, `Tile contractor`, `Carpenter`,
  `General contractor`. (Originally drafted as `Door supplier` —
  corrected during Task 5 review since "Door supplier" is for retail,
  not installers; `Carpenter` covers John's actual door-and-mounting
  work.)
- **Service area:** the 12 entries from `site.config.ts` → `serviceArea`
  (Philadelphia, Bala Cynwyd, Ardmore, Bryn Mawr, Narberth, Wynnewood,
  Havertown, Upper Darby, Conshohocken, Gladwyne, Cheltenham, King of
  Prussia). Well under GBP's cap of 20.
- **Storefront:** none — service-area business.
- **Phone / email / website:** `(267) 301-0825` ·
  `Sdzhangar1@gmail.com` · `https://handymanhouserepair.com` (match
  `site.config.ts` exactly).
- **Hours:** M–F 8a–6p · Sat 9a–3p · Sun closed (from
  `site.config.ts` → `hours`).
- **Opening year:** 1992 (from `site.config.ts` → `establishedYear`).
  Google surfaces this as an "In business since 1992" badge — trust
  signal.
- **Description (~650 chars, drafted):**

  > John's Handyman House Repair serves Philadelphia and the Main Line
  > — Bala Cynwyd, Ardmore, Bryn Mawr, Havertown, Conshohocken, King
  > of Prussia and beyond. Founded in 1992 by John, a PA-licensed Home
  > Improvement Contractor, we handle bathroom and kitchen remodels,
  > deck builds, drywall, painting, tile, flooring, doors, and the
  > full range of everyday home repair. Free estimates, no surprise
  > fees, and the fastest way to reach John is WhatsApp at (267)
  > 301-0825 — text a photo of what needs fixing and you'll hear back
  > within a few hours.

- **Services (from `site.config.ts` → `services`):** Bathroom remodels
  · Kitchen remodels · Decks · Drywall & painting · Faucets & fixtures
  · Doors & locks · Mounting & assembly · Flooring & tile.
- **Photo checklist:** logo export (from `public/`), cover photo (the
  truck, landscape), ~8 work samples (pulled from
  `@handy_soluti0ns` Instagram — playbook lists exact post URLs to
  download).
- **Video verification shot list:** single continuous, unedited,
  30–120s clip showing (a) truck exterior with "HANDYMAN HOUSE REPAIR"
  lettering, (b) truck interior with tools, (c) in-progress job site,
  (d) PA Home Improvement Contractor license / insurance paperwork.
- **WhatsApp follow-up template** (John sends post-job, primary review
  channel):

  > Thanks for the work — hope it all looks great. If you've got a
  > minute, a Google review would mean a lot:
  > [paste Google review link] (takes 30 seconds)

- **Manual follow-ups, not code, not this session:**
  - Claim Yelp and rename "Johny Handyman" → "John's Handyman House
    Repair"
  - Buy `handymanhouserepair.com` (still in README to-dos)
  - After GBP verifies: grab Place ID, paste into
    `site.config.ts`, redeploy.

### 2. Site rename — brand alignment

**Files changed:**

- `src/site.config.ts:8` — `brandName: "Handyman House Repair"` →
  `"John's Handyman House Repair"`.
- `src/site.config.ts:9` — delete `brandShort: "HHR"`. Defined but
  referenced nowhere (verified via grep).
- `src/components/icons.tsx:4,11` — the only two hardcoded brand
  strings in the codebase: a doc comment and the logo `alt` attribute.
  Update both to the new name.
- `README.md` — first line still reads "Jonny Handyman — VSA Infinity
  LLC" (pre-pivot). Update to match.

**Inherits the rename for free** (all interpolate `site.brandName`):
Navbar, Footer, About page, `<LocalBusinessSchema>` JSON-LD, layout
metadata (title template, OpenGraph, Twitter), Resend `from:`
addresses on both the estimate form (`src/app/actions.ts`) and the
WhatsApp-click digest cron (`src/app/api/cron/whatsapp-digest/route.ts`).

**Side effect to know about:** Resend `from:` display name flips to
"John's Handyman House Repair Site". Desired, but user-visible.

### 3. Review-pipeline stub — dormant until Place ID lands

All behavior gated on `site.googlePlaceId` being non-empty. Pre-
verification: zero visual change. Post-verification: paste Place ID,
commit, redeploy → every piece below activates at once.

**3a. `src/site.config.ts`** — add field:

```ts
/** Google Business Profile Place ID. Empty until GBP verifies. Get it
 *  from https://developers.google.com/maps/documentation/places/web-service/place-id */
googlePlaceId: "",
```

And a helper sibling to `whatsappLink()`:

```ts
export function reviewLink(): string | null {
  return site.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${site.googlePlaceId}`
    : null;
}
```

**3b. Form success nudge** — in
`src/components/EstimateForm.tsx` lines 13–25 (the `state?.ok` success
block). Append a conditional paragraph: when `reviewLink()` is
non-null, render "Already had John out for a job? Leave a Google
review →" with the link. Conditional copy is intentional — the form's
primary audience is new leads, but returning customers sometimes
re-submit the form; the phrasing lets it apply to them without
awkwardness for first-timers.

**3c. Footer link** — in `src/components/Footer.tsx`, a small "Leave
a review on Google" link near the Instagram link. Only renders when
`reviewLink()` returns non-null. Site-wide passive catch for returning
customers.

## Out of scope

- `/review` short-URL redirect route (deferred)
- Yelp rename (manual follow-up)
- Domain purchase (`handymanhouserepair.com` — still in README
  to-dos)
- Embedding GBP reviews on the site (Phase 3, post-verification and
  post-first-reviews)
- `AggregateRating` on `LocalBusiness` JSON-LD (Phase 3 — needs
  reviews to exist)
- QR-code asset generation (manual, outside code)
- GBP Posts / offers / CTAs (dashboard feature, post-verification)

## Activation path post-verification

1. GBP setup submitted (via playbook) — 10–15 min of form filling.
2. Google routes to video verification — upload the shot-listed clip.
3. Google reviews — typically 5 business days, can be up to 3 weeks.
4. Once approved, look up the Place ID via
   `developers.google.com/maps/documentation/places/web-service/place-id`.
5. Paste into `site.googlePlaceId`, commit, push. Vercel auto-deploys.
6. Footer link and form success nudge appear site-wide. WhatsApp
   follow-up template in the playbook now has a working review URL to
   paste.
