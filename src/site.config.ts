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

  /** Google Business Profile Place ID. Empty until GBP verifies. Once
   *  verified, look it up at
   *  https://developers.google.com/maps/documentation/places/web-service/place-id
   *  and paste here — no other code changes needed to activate review
   *  CTAs site-wide. */
  googlePlaceId: "" as string,
} as const;

/** Services — truck-aligned. Two tiers:
 *  Tier 1 = remodels (the truck's biggest words)
 *  Tier 2 = everyday repairs (the "HANDYMAN / HOUSE REPAIR" logo)
 */
export type Service = {
  slug: string;
  title: string;
  description: string;
  tier: "remodel" | "repair";
  note?: string;
};

export const services: ReadonlyArray<Service> = [
  {
    slug: "bathroom-remodels",
    title: "Bathroom remodels",
    description:
      "Full renovations, tub-to-shower conversions, vanity swaps, tile work, and everything in between. Bathrooms are John's specialty.",
    tier: "remodel",
  },
  {
    slug: "kitchen-remodels",
    title: "Kitchen remodels",
    description:
      "Cabinet install, countertops, backsplash, lighting, flooring. Refreshes to full tear-outs.",
    tier: "remodel",
  },
  {
    slug: "decks",
    title: "Decks",
    description:
      "New deck builds, deck repair, board replacement, staining, railing upgrades.",
    tier: "remodel",
  },
  {
    slug: "drywall-painting",
    title: "Drywall & painting",
    description:
      "Patching, skim coats, full-room paint, ceiling repair, trim touch-ups.",
    tier: "repair",
  },
  {
    slug: "faucets-fixtures",
    title: "Faucets & fixtures",
    description:
      "Faucet swaps, toilet installs, shower heads, garbage disposals.",
    tier: "repair",
  },
  {
    slug: "doors-locks",
    title: "Doors & locks",
    description:
      "Door rehang, sticking doors, deadbolt installs, weatherstripping, screens.",
    tier: "repair",
  },
  {
    slug: "mounting-assembly",
    title: "Mounting & assembly",
    description:
      "TV mounts, shelves, curtain rods, mirrors, IKEA assembly, playsets.",
    tier: "repair",
  },
  {
    slug: "flooring-tile",
    title: "Flooring & tile",
    description:
      "Tile repair, grout replacement, laminate install, squeaky floors.",
    tier: "repair",
  },
];

/** Helper — WhatsApp deep link with pre-filled message */
export function whatsappLink(): string {
  const encoded = encodeURIComponent(site.whatsappOpener);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}

/** Helper — Google Business Profile review form link.
 *  Returns null until googlePlaceId is set (post-GBP-verification).
 *  Consumers should null-check and not render the CTA when null. */
export function reviewLink(): string | null {
  return site.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${site.googlePlaceId}`
    : null;
}
