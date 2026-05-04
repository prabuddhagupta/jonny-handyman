/**
 * All editable content lives here. Edit this file, redeploy, done.
 * Values marked TODO must be filled in before going live.
 */

export const site = {
  /** Public brand — owner's name + truck lettering. Google Business Profile
   *  business name is exactly this. Changing this cascades via site.brandName
   *  into nav, footer, metadata, JSON-LD, and Resend email from-addresses. */
  brandName: "John's Handyman House Repair",
  /** Person behind the business — surfaced on About + opener */
  ownerName: "John",
  tagline: "Bathroom, kitchen, and deck remodels across Philadelphia",

  /** Legal entity — footer only */
  legalName: "VSA Infinity LLC",

  /** Year established — shown on the logo (EST. 1992) */
  establishedYear: 1992,

  /** Licensing — PA Home Improvement Contractor */
  license: "PA Home Improvement Contractor",

  /** Primary city and service radius */
  primaryCity: "Philadelphia",
  state: "PA",
  stateFull: "Pennsylvania",
  serviceArea: [
    "Philadelphia",
    "Bala Cynwyd",
    "Ardmore",
    "Bryn Mawr",
    "Narberth",
    "Wynnewood",
    "Havertown",
    "Upper Darby",
    "Conshohocken",
    "Gladwyne",
    "Cheltenham",
    "King of Prussia",
  ],

  /** Contact — from the truck. Same number for voice, WhatsApp, and SMS. */
  whatsappNumber: "12673010825",
  smsNumber: "(267) 301-0825",
  /** Email that receives estimate form submissions. */
  contactEmail: "Sdzhangar1@gmail.com",
  /** Owner/dev notification inbox — BCC'd on form submissions, receives WhatsApp-click daily digest. */
  notificationEmail: "prabuddha@gmail.com",

  /** Instagram — existing brand */
  instagramHandle: "handy_soluti0ns",
  instagramUrl: "https://www.instagram.com/handy_soluti0ns/",

  /** Domain — update when purchased */
  domain: "handymanhouserepair.com",

  /** Hours shown on contact page + LocalBusiness schema */
  hours: [
    { day: "Monday – Friday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "3:00 PM" },
    { day: "Sunday", open: "Closed", close: "" },
  ],

  /** WhatsApp pre-filled message for click-to-chat link */
  whatsappOpener:
    "Hi John, I'd like a free estimate. Here's what I need:\n\n- Address:\n- What the job is (remodel? repair?):\n- Photo (attach if possible):",

  /** Google Maps Feature ID for the GBP listing — the two-hex string
   *  after `!1s` in any Maps share URL. Drives the "Leave a review on
   *  Google" CTAs site-wide via `reviewLink()`. Swap to a different
   *  listing's FID by copying it from that listing's Maps URL.
   *  See `docs/gbp-setup.md`. */
  googleReviewFid: "0x6a95c04f46ae0b71:0xdf19ece4cb08a82a",

  /** Hand-edited rating + count shown on the homepage hero and above
   *  the estimate form. Set `googleReviewCount` to 0 to hide the
   *  block; bump these whenever a new review lands. No API. */
  googleRating: 5.0 as number,
  googleReviewCount: 1 as number,
} as const;

/** Services — truck-aligned. Two tiers:
 *  Tier 1 = remodels (the truck's biggest words)
 *  Tier 2 = everyday repairs (the "HANDYMAN / HOUSE REPAIR" logo)
 */
export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  description: string;
  tier: "remodel" | "repair";
  note?: string;
  faqs?: ReadonlyArray<FAQ>;
};

export const services: ReadonlyArray<Service> = [
  {
    slug: "bathroom-remodels",
    title: "Bathroom remodels",
    description:
      "Full renovations, tub-to-shower conversions, vanity swaps, tile work, and everything in between. Bathrooms are John's specialty.",
    tier: "remodel",
    faqs: [
      {
        q: "How much does a bathroom remodel cost in Philadelphia?",
        a: "It depends on the size of the bathroom, the finish level, and whether plumbing or layout changes are needed. A vanity-and-tile refresh is very different from a full gut. Send John a few photos on WhatsApp and he'll send a free, specific estimate — usually within a few hours.",
      },
      {
        q: "How long does a bathroom remodel take?",
        a: "Most full bathroom remodels run two to three weeks once materials are on-site. Tub-to-shower conversions and vanity swaps are typically a few days. We'll give you a real timeline with the estimate.",
      },
      {
        q: "Do you handle the whole job — tile, plumbing, and fixtures?",
        a: "Yes. John runs the whole bathroom remodel: demo, plumbing rough-in, tile, fixture install, and finish. One person you talk to from start to finish.",
      },
      {
        q: "Are permits needed for a bathroom remodel?",
        a: "Cosmetic refreshes (paint, fixtures, vanity swap) generally don't need permits. Anything moving plumbing or electrical does. We'll tell you upfront if a permit is needed and handle the filing.",
      },
    ],
  },
  {
    slug: "kitchen-remodels",
    title: "Kitchen remodels",
    description:
      "Cabinet install, countertops, backsplash, lighting, flooring. Refreshes to full tear-outs.",
    tier: "remodel",
    faqs: [
      {
        q: "How much does a kitchen remodel cost in Philadelphia?",
        a: "Kitchens vary more than any other room — cabinet quality, counter material, and whether the layout changes drive most of the price. Send John photos and a rough wishlist on WhatsApp; he'll give you a free estimate that breaks out the line items.",
      },
      {
        q: "Do you do full kitchens or just refreshes?",
        a: "Both. Cabinet refacing, counter swaps, backsplash, and lighting are common refresh jobs. Full tear-outs and cabinet rebuilds are also part of the work.",
      },
      {
        q: "How long does a kitchen remodel take?",
        a: "Full kitchens typically run three to five weeks. Cabinet-and-counter refreshes are one to two weeks. We sequence the work so the kitchen is usable as much as possible.",
      },
      {
        q: "Will my kitchen be unusable during the work?",
        a: "There's usually a stretch of three to five days during cabinet and counter install where the sink and range are offline. We plan that window with you so you can prep ahead.",
      },
    ],
  },
  {
    slug: "decks",
    title: "Decks",
    description:
      "New deck builds, deck repair, board replacement, staining, railing upgrades.",
    tier: "remodel",
    faqs: [
      {
        q: "Do you build new decks or just repair?",
        a: "Both. New deck builds, full deck rebuilds, board replacement, railing upgrades, and staining. If you're not sure whether yours can be repaired or needs a rebuild, send a few photos.",
      },
      {
        q: "What deck materials do you work with?",
        a: "Pressure-treated lumber, cedar, and composite (Trex and similar). We'll talk through trade-offs — cost, lifespan, maintenance — and recommend what fits your budget.",
      },
      {
        q: "How long does a deck build take?",
        a: "A typical residential deck is one to two weeks, weather permitting. Repairs and refinishing are often a few days.",
      },
      {
        q: "Are permits needed for a deck in Philadelphia?",
        a: "New decks and structural rebuilds need permits in Philadelphia and the surrounding municipalities. Refinishing and board replacement usually don't. We'll tell you upfront and handle the permit filing.",
      },
    ],
  },
  {
    slug: "drywall-painting",
    title: "Drywall & painting",
    description:
      "Patching, skim coats, full-room paint, ceiling repair, trim touch-ups.",
    tier: "repair",
    faqs: [
      {
        q: "Can you patch a small hole the same day?",
        a: "Often yes — door-knob holes and small patches are quick. Larger drywall repair needs a day for the patch to dry between coats. WhatsApp a photo and we'll tell you which one yours is.",
      },
      {
        q: "Do you do full-room paint jobs?",
        a: "Yes. Walls, ceilings, trim, and prep work — including patching, sanding, and priming. Most rooms are a one-day job.",
      },
      {
        q: "Can you match existing paint or texture?",
        a: "Yes. Bring the paint can label or send a photo and we'll match the color. Knockdown and orange-peel ceiling textures are part of the work too.",
      },
      {
        q: "Do you fix water-damaged ceilings?",
        a: "Yes — but only after the leak is fixed. We'll cut out the damaged section, replace the drywall, and match the texture and paint so it disappears.",
      },
    ],
  },
  {
    slug: "faucets-fixtures",
    title: "Faucets & fixtures",
    description:
      "Faucet swaps, toilet installs, shower heads, garbage disposals.",
    tier: "repair",
    faqs: [
      {
        q: "Can you install a faucet I already bought?",
        a: "Yes. Most kitchen and bathroom faucet swaps are a same-visit job. Send a photo of the existing setup and the new faucet box and John will confirm.",
      },
      {
        q: "Do you handle toilet replacements?",
        a: "Yes. Removal, wax-ring replacement, new toilet install, and haul-away of the old one. Usually under two hours per toilet.",
      },
      {
        q: "What about garbage disposals?",
        a: "Replacement and new install both. We can also fix jammed or leaking units — sometimes those just need a reset, not a replacement. Worth checking before buying a new one.",
      },
      {
        q: "How long does a faucet swap take?",
        a: "Typically 45 minutes to an hour for a standard kitchen or bathroom faucet, longer if the shutoff valves are old and need replacing.",
      },
    ],
  },
  {
    slug: "doors-locks",
    title: "Doors & locks",
    description:
      "Door rehang, sticking doors, deadbolt installs, weatherstripping, screens.",
    tier: "repair",
    faqs: [
      {
        q: "Can you fix a sticking door?",
        a: "Yes. Sticking is usually hinge sag, swelling, or a worn frame. We plane, shim, or rehang as needed — typically a one-visit fix.",
      },
      {
        q: "Do you install new deadbolts?",
        a: "Yes. Standard deadbolts, smart locks (August, Schlage Encode, Yale, etc.), and re-key work are all part of the job.",
      },
      {
        q: "Can you rehang an interior door?",
        a: "Yes. Replacing hinges, swapping the door, or rehanging on a new frame are all common. Bring the new door — we'll handle the rest.",
      },
      {
        q: "Do you do screen door and weatherstripping work?",
        a: "Yes. Screen mesh replacement, screen door realignment, and weatherstripping around exterior doors are routine.",
      },
    ],
  },
  {
    slug: "mounting-assembly",
    title: "Mounting & assembly",
    description:
      "TV mounts, shelves, curtain rods, mirrors, IKEA assembly, playsets.",
    tier: "repair",
    faqs: [
      {
        q: "Do you mount TVs?",
        a: "Yes — fixed, tilting, or full-motion mounts. We find studs, level the bracket, and route cables behind the wall when you want a clean look. Typically one to two hours.",
      },
      {
        q: "Can you assemble IKEA furniture?",
        a: "Yes. PAX wardrobes, BESTÅ units, KALLAX, beds, desks — all of it. We can also wall-anchor anything tall so it's safe.",
      },
      {
        q: "Will the mount hold a heavy TV?",
        a: "Yes — every mount we install is anchored into studs (or, for masonry walls, with proper sleeves). We size the bracket to the TV's weight rating with margin.",
      },
      {
        q: "Can you mount shelves and curtain rods on plaster walls?",
        a: "Yes. Older Philadelphia homes often have plaster — we use the right anchors so things actually hold. Plaster needs a different approach than drywall.",
      },
    ],
  },
  {
    slug: "flooring-tile",
    title: "Flooring & tile",
    description:
      "Tile repair, grout replacement, laminate install, squeaky floors.",
    tier: "repair",
    faqs: [
      {
        q: "Do you replace damaged tiles?",
        a: "Yes. We can pop a cracked tile and replace it cleanly if you have a spare from the original install. If not, we'll do our best to color-match.",
      },
      {
        q: "Can you fix or replace grout?",
        a: "Yes. Regrouting is part of the job — it's the cheapest way to make a tired bathroom look new. We can also seal grout to keep it that way.",
      },
      {
        q: "Do you install laminate or vinyl plank flooring?",
        a: "Yes. Laminate, LVP, and engineered hardwood floating floors. Subfloor prep, underlayment, and trim are part of the install.",
      },
      {
        q: "Can you fix squeaky floors?",
        a: "Often yes — squeaks are usually loose subfloor or worn nails. We can re-secure from below (basement) when accessible, or top-down with the right kit when not.",
      },
    ],
  },
];

/** Helper — WhatsApp deep link with pre-filled message */
export function whatsappLink(): string {
  const encoded = encodeURIComponent(site.whatsappOpener);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}

/** Helper — Google review write deep link. Uses the Maps `12e1`
 *  (write-a-review) URL keyed by Feature ID, which works without a
 *  Places API Place ID lookup. */
export function reviewLink(): string {
  return `https://www.google.com/maps/place//data=!4m3!3m2!1s${site.googleReviewFid}!12e1`;
}

/** Helper — Google Maps listing URL pinned to the reviews tab. Uses
 *  the same FID as `reviewLink()`; the `!9m1!1b1` suffix is what
 *  surfaces the reviews list on the listing page. */
export function listingLink(): string {
  return `https://www.google.com/maps/place//data=!4m4!3m3!1s${site.googleReviewFid}!9m1!1b1`;
}
