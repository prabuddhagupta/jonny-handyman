/**
 * All editable content lives here. Edit this file, redeploy, done.
 * Values marked TODO must be filled in before going live.
 */

export const site = {
  /** Display brand — what customers see */
  brandName: "Jonny",
  tagline: "Your King of Prussia Handyman",

  /** Legal entity — footer only */
  legalName: "VSA Infinity LLC",

  /** Primary city and service radius */
  primaryCity: "King of Prussia",
  state: "PA",
  stateFull: "Pennsylvania",
  serviceArea: [
    "King of Prussia",
    "Wayne",
    "Bryn Mawr",
    "Ardmore",
    "Radnor",
    "Conshohocken",
    "Norristown",
    "Paoli",
    "Valley Forge",
    "Phoenixville",
    "Plymouth Meeting",
    "Villanova",
  ],

  /** Contact — all three channels. Leave placeholder until real values. */
  // TODO: Put Jonny's WhatsApp Business number here, digits only, with country code. e.g. "16105551234"
  whatsappNumber: "16105551234",
  // TODO: Email that receives estimate form submissions.
  contactEmail: "jonny@example.com",
  // TODO: Optional Google Voice/SMS number shown on the site as a backup.
  smsNumber: "(610) 555-1234",

  /** Instagram — existing brand */
  instagramHandle: "handy_soluti0ns",
  instagramUrl: "https://www.instagram.com/handy_soluti0ns/",

  /** Domain — update when purchased */
  domain: "jonnyhandyman.com",

  /** Hours shown on contact page + LocalBusiness schema */
  hours: [
    { day: "Monday – Friday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "3:00 PM" },
    { day: "Sunday", open: "Closed", close: "" },
  ],

  /** WhatsApp pre-filled message for click-to-chat link */
  whatsappOpener:
    "Hi Jonny, I'd like an estimate. Here's what I need:\n\n- Address:\n- What needs fixing:\n- Photo (attach if possible):",
} as const;

/** Services — edit once license type confirmed */
export type Service = {
  slug: string;
  title: string;
  description: string;
  licensed: boolean;
  note?: string;
};

export const services: ReadonlyArray<Service> = [
  {
    slug: "drywall-painting",
    title: "Drywall & painting",
    description:
      "Patching, skim coats, full-room paint, ceiling repair, trim touch-ups.",
    licensed: true,
  },
  {
    slug: "faucets-fixtures",
    title: "Faucets & fixtures",
    description:
      "Faucet swaps, toilet installs, shower heads, garbage disposals.",
    licensed: true,
    note: "Simple replacements only unless licensed for pipe work.",
  },
  {
    slug: "doors-locks",
    title: "Doors & locks",
    description:
      "Door rehang, sticking doors, deadbolt installs, weatherstripping, screens.",
    licensed: true,
  },
  {
    slug: "mounting-assembly",
    title: "Mounting & assembly",
    description:
      "TV mounts, shelves, curtain rods, mirrors, IKEA assembly, playsets.",
    licensed: true,
  },
  {
    slug: "flooring-tile",
    title: "Flooring & tile",
    description:
      "Tile repair, grout replacement, laminate install, squeaky floors.",
    licensed: true,
  },
  {
    slug: "small-remodels",
    title: "Small remodels",
    description:
      "Bathroom refreshes, kitchen updates, basement finishing touches.",
    licensed: true,
    note: "Scope depends on license type — confirm with Jonny.",
  },
];

/** Gallery — replace with real Instagram post URLs + thumbnails.
 *  Each item links out to Instagram, which drives follows as a side effect.
 *  TODO: Replace all 12 entries with real @handy_soluti0ns posts. */
export const galleryPosts = [
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Bathroom tile repair" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Kitchen faucet install" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Drywall patch & paint" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Door rehang" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "TV wall mount" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Deck repair" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Trim installation" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Basement shelving" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Ceiling fan install" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Grout refresh" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Closet system" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Window repair" },
] as const;

/** Helper — WhatsApp deep link with pre-filled message */
export function whatsappLink(): string {
  const encoded = encodeURIComponent(site.whatsappOpener);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}
