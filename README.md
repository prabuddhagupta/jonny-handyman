# Jonny Handyman — VSA Infinity LLC

Marketing site for Jonny's handyman business. Serves King of Prussia and the
Main Line (PA).

- **Stack:** Next.js 16 App Router · Tailwind v4 · Resend (email) · Vercel hosting
- **Public brand:** Jonny
- **Instagram:** [@handy_soluti0ns](https://www.instagram.com/handy_soluti0ns/)
- **Legal:** VSA Infinity LLC

---

## All editable content lives in ONE file

Open `src/site.config.ts`. Every phone number, email, service, gallery
post, hour, and tagline is there. Change, commit, deploy.

**Before going live, replace these TODOs:**

1. `whatsappNumber` — Jonny's WhatsApp Business number, digits only with
   country code. E.g. `16105551234` for a US `(610) 555-1234`.
2. `contactEmail` — where estimate form submissions should land.
3. `smsNumber` — optional Google Voice / backup SMS number shown on Contact.
4. `galleryPosts` — 12 entries, each pointing to a real `@handy_soluti0ns`
   post (grab the URL from Instagram; caption is free-text).
5. `services` — once Jonny confirms his license type, prune anything he
   can't legally do. Services with a `note` field need review.

---

## Run locally

```bash
pnpm install        # one-time
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm start          # serve the production build
pnpm lint
```

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Var | What it's for | How to get one |
|---|---|---|
| `RESEND_API_KEY` | Sends estimate form submissions to `contactEmail` | Sign up at https://resend.com (3k sends/month free). Verify the sending domain so emails don't hit spam. |

The site renders fine without `RESEND_API_KEY` — the form just shows a
"please WhatsApp Jonny directly" error. Good for local preview.

---

## Deploying to Vercel

Simplest path (no local CLI):

1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Add `RESEND_API_KEY` under Settings → Environment Variables.
4. Deploy. Vercel gives you a free `*.vercel.app` URL immediately — share
   that URL with Jonny for feedback before pointing a real domain at it.
5. Once the real domain is registered, add it under Settings → Domains.
   SSL is automatic.

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel              # preview deploy
vercel --prod       # production deploy
```

---

## This week's to-do list (outside the code)

1. **Google Business Profile** — https://business.google.com, takes 10 min.
   Category "Handyman." Service area = KoP + Main Line suburbs. Add 3 photos
   from Instagram. This is where ~80% of leads will actually come from — the
   website supports it, not the other way around.
2. **Google Voice number** — https://voice.google.com. Free. Gives Jonny a
   business number with voicemail-to-text (the real fix for the language
   barrier on voice). Put it in `site.config.ts` as `smsNumber`.
3. **WhatsApp Business auto-greeting** — WhatsApp Business → Settings →
   Business tools → Away message. Example:
   > Thanks for reaching out! I'll get back to you within a few hours.
   > Please share: 1) your address, 2) what needs fixing, 3) a photo.
4. **Confirm license type** — decides which services stay on `/services`.
   Electrical and plumbing without licenses = legal liability; cut if
   needed.
5. **Buy a domain** — `jonnyhandyman.com`, `kophandyman.com`, and
   `handymankop.com` were all available at last whois check. Namecheap or
   Porkbun, ~$12/year.

---

## Structure

```
src/
  site.config.ts        ← ALL editable content
  app/
    layout.tsx          ← root layout, metadata, Navbar + Footer
    page.tsx            ← home
    services/page.tsx
    about/page.tsx
    gallery/page.tsx
    contact/page.tsx
    actions.ts          ← server action: form → Resend
    sitemap.ts
    robots.ts
    globals.css
  components/
    Navbar.tsx
    Footer.tsx
    WhatsAppButton.tsx
    EstimateForm.tsx    ← client component
    LocalBusinessSchema.tsx  ← JSON-LD for SEO
  lib/
    utils.ts            ← cn() helper
```

---

## Design choices (short rationale)

- **Brand name = "Jonny"** — personal names outperform company names for
  handymen. "VSA Infinity LLC" is in the footer for legal only.
- **WhatsApp-first CTA** — he's fast on WhatsApp; language barrier is
  mitigated by async text + phone-native translation.
- **No prices on site** — per the ask. "No surprise fees" replaces "one
  price" as the trust hook.
- **Empty-state gallery** — rather than stock imagery, shows placeholder
  tiles that prompt you to drop real IG links. Swap in after Jonny's
  next 6 jobs are photographed.
- **LocalBusiness JSON-LD** — feeds Google's knowledge panel. Paired with
  a Google Business Profile, that's ~90% of local SEO handled.
