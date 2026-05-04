# Google Business Profile setup — John's Handyman House Repair

A step-by-step to execute on **business.google.com**. Every field is
pre-filled from `src/site.config.ts`. Most likely time to verification
is 5 business days; worst case is ~3 weeks.

## Before you start

- **Search for an existing listing first.** Google "John's Handyman
  House Repair Philadelphia" and "Handyman House Repair Philadelphia"
  on Google Maps. The business has been operating since 1992, so an
  unclaimed listing may already exist. If one appears, click **Claim
  this business** instead of creating a new one — duplicate listings
  get flagged, merged, or suspended.
- You need a Google account. Use one you'll keep — this account owns the
  profile.
- Have the truck, tools, and any PA Home Improvement Contractor license
  / insurance paperwork accessible — video verification likely needs
  all of them in one clip.

## Fields to paste

| Field | Value |
|---|---|
| Business name | `John's Handyman House Repair` ⚠️ see warning below |
| Primary category | `Handyman` |
| Business type | **Service business** (no storefront) |
| Service area | Philadelphia, Bala Cynwyd, Ardmore, Bryn Mawr, Narberth, Wynnewood, Havertown, Upper Darby, Conshohocken, Gladwyne, Cheltenham, King of Prussia |
| Phone | `(267) 301-0825` |
| Website | `https://handymanhouserepair.com` |
| Email | `Sdzhangar1@gmail.com` |
| Opening date | January 1992 (approximate is fine — Google cares about the year) |

> **⚠️ Do not change the business name.** The "John's" prefix is
> deliberate. Google's naming guidelines reject names that look like
> keyword phrases — "Handyman House Repair" alone would qualify and
> get the listing suspended. Do not shorten, abbreviate, or add city
> names. The exact value above is what survives review.

### Secondary categories (pick up to 9)

Each secondary category expands which search queries match your
profile. Add all nine:

1. Bathroom remodeler
2. Kitchen remodeler
3. Deck builder
4. Drywall contractor
5. Painter
6. Flooring contractor
7. Tile contractor
8. Carpenter
9. General contractor — *add this one last; if Google questions the
   listing during review, remove it first to reduce friction.*

### Hours

- Monday – Friday: 8:00 AM – 6:00 PM
- Saturday: 9:00 AM – 3:00 PM
- Sunday: Closed

### Description (paste verbatim)

> John's Handyman House Repair serves Philadelphia and the Main Line
> — Bala Cynwyd, Ardmore, Bryn Mawr, Havertown, Conshohocken, King of
> Prussia and beyond. Founded in 1992 by John, a PA-licensed Home
> Improvement Contractor, we handle bathroom and kitchen remodels, deck
> builds, drywall, painting, tile, flooring, doors, and the full range
> of everyday home repair. Free estimates, no surprise fees, and the
> fastest way to reach John is WhatsApp at (267) 301-0825 — text a
> photo of what needs fixing and you'll hear back within a few hours.

### Services

In the "Services" section of GBP, add one entry per row:

- Bathroom remodels
- Kitchen remodels
- Decks
- Drywall & painting
- Faucets & fixtures
- Doors & locks
- Mounting & assembly
- Flooring & tile

## Photos

Google asks for a logo, a cover photo, and additional photos. Do this
minimum:

- **Logo:** export `public/logo.png` (or use directly). Crop to square
  if the GBP uploader requires it.
- **Cover photo:** one good landscape photo of the truck showing the
  "HANDYMAN HOUSE REPAIR" lettering.
- **Additional (target 8):** pick the strongest before/after work
  samples from the `@handy_soluti0ns` Instagram
  (https://www.instagram.com/handy_soluti0ns/). Prefer bathroom,
  kitchen, and deck shots — those are the money-making categories.

## Verification — video

Service-area businesses almost always get routed to video verification
now (postcard is rare). Google asks for a **single continuous,
unedited** clip, 30–120 seconds, showing:

1. **Truck exterior** — the "HANDYMAN HOUSE REPAIR" lettering clearly
   visible.
2. **Truck interior** — open the back / doors, show tools and supplies.
3. **An in-progress or recently-finished job site** — any real work.
4. **Business paperwork** — PA Home Improvement Contractor license
   and insurance certificate, held up to the camera, legible.

Tips:
- One continuous take. Don't cut. Don't add music. Don't zoom if you
  can walk.
- Phone in landscape.
- Good daylight.
- Narrate casually while walking — "this is the truck, this is John,
  here's the license, here's the bathroom we're finishing up." Sounds
  human, helps Google confirm you're real.

### If verification fails

Rejections are common and the rejection reason is usually vague
("could not verify your business"). Don't panic.

1. **Re-shoot.** Make sure all four required elements (truck exterior
   lettering, truck interior with tools, an actual job site, and the
   PA HIC license + insurance paperwork) are clearly visible **in the
   first 30 seconds** of the new clip — Google's reviewers often only
   watch the opening seconds.
2. **Submit again.** Same flow as the first attempt.
3. **Two rejections?** Go to https://support.google.com/business and
   use the **Contact us** flow to request human review. Provide the PA
   HIC license number and a photo of the truck's exterior lettering.
4. **Last resort.** Postcard verification still exists for some
   service-area regions. Ask in the support flow whether it's
   available for this listing.

## Once verified

The review CTAs are already wired and live. They're driven by the
Maps Feature ID stored in `src/site.config.ts` as `googleReviewFid`.
If you ever need to repoint them at a different listing, open that
listing on Google Maps, copy the two-hex string after `!1s` in the
URL (e.g. `0x6a95c04f46ae0b71:0xdf19ece4cb08a82a`), and paste it
into `googleReviewFid`. Commit and push — Vercel auto-deploys.

**What's active:** a "Leave a review on Google" link in the site
footer; a review nudge in the estimate-form success state; the
WhatsApp follow-up template below has a working URL to send.

## Distribution playbook

**The link clients should see is `handymanhouserepair.com/review`.**
It 307-redirects to the Google review composer for John's Handyman
House Repair. Short enough to dictate over the phone, fits on a
business card, encodes cleanly into a QR code, and gives us click
visibility through Vercel access logs.

A printable QR code lives at `handymanhouserepair.com/review/qr` —
right-click → "Save Image" to drop into a print job.

### Verbal ask (at job completion)

One sentence John can memorize and use every time:

> "If you're happy with how it turned out, a quick Google review
> means a lot. You can scan this card or go to handymanhouserepair
> dot com slash review."

### SMS quick-reply (save in Messages → Settings → Text Replacement)

```
Thanks for having me out today. If you've got 30 seconds,
a Google review means a lot to a small shop:
https://handymanhouserepair.com/review — John
```

### WhatsApp follow-up template

Paste after every finished job:

```
Thanks for having me out — hope it looks great. If you've got 30
seconds, a Google review means a lot to a small business:

https://handymanhouserepair.com/review

— John
```

### Email signature

Add to John's Gmail signature (Settings → General → Signature):

> John · John's Handyman House Repair · (267) 301-0825
> handymanhouserepair.com · Leave a review: handymanhouserepair.com/review

### Leave-behind card (print spec)

Standard 3.5″ × 2″ business card, both sides. Send to a printer (e.g.
Vistaprint, MOO, Got Print). Front/back layout:

```
─── FRONT ─────────────────────────────────
  [TruckLogo, brand color]

  John's Handyman House Repair
  Bathroom · Kitchen · Deck · Repair

  John — (267) 301-0825
  handymanhouserepair.com
───────────────────────────────────────────

─── BACK ──────────────────────────────────
  Happy with the work?
  Leave a quick Google review:

       [QR CODE — 1.25" square,
        encodes /review]

  handymanhouserepair.com/review
───────────────────────────────────────────
```

Print on uncoated stock so the QR scans reliably. Black on white for
the QR — colored or photo backgrounds tank scan rates on older phones.

### Where to put the QR

In rough order of conversion impact:

1. **Leave-behind sticker / placard** — placed on the new vanity,
   inside the kitchen cabinet, on the deck post. Customer sees it for
   weeks. Highest reach per unit cost.
2. **Business card back** — handed out at every estimate visit.
3. **Final invoice footer** — top-of-mind exactly when they're paying
   and the work is fresh.
4. **Truck door magnet** — passive, but every parked-truck minute is
   free advertising in the neighborhood.
5. **Yard sign while job is active** — "Currently being remodeled by
   John's Handyman House Repair · Leave a review when done · [QR]".

## Out-of-code follow-ups

These don't touch the code but matter for local SEO consistency:

- **Claim and rename the Yelp listing.**
  `yelp.com/biz/johny-handyman-philadelphia` is still under the
  pre-pivot name "Johny Handyman". Claim it (free) and rename to
  "John's Handyman House Repair".
- **Buy `handymanhouserepair.com`.** Still in the README to-dos.
  Namecheap or Porkbun, ~$12/year. The site already references this
  domain in metadata and JSON-LD.
- **Add 3 GBP Posts after verification.** The Posts feature on the
  dashboard is like social media for your profile — use it for
  seasonal reminders ("deck season is here") and recent work
  highlights.
