/**
 * All editable content lives here. Edit this file, redeploy, done.
 * Values marked TODO must be filled in before going live.
 */

export const site = {
  /** Public brand — matches what customers see on the truck */
  brandName: "Handyman House Repair",
  brandShort: "HHR",
  /** Person behind the business — surfaced on About + opener */
  ownerName: "Jonny",
  tagline: "Bathroom, kitchen, and deck remodels in King of Prussia",

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

  /** Contact — from the truck. Same number for voice, WhatsApp, and SMS. */
  whatsappNumber: "12673010825",
  smsNumber: "(267) 301-0825",
  // TODO: Email that receives estimate form submissions.
  contactEmail: "jonny@example.com",

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
    "Hi Jonny, I'd like a free estimate. Here's what I need:\n\n- Address:\n- What the job is (remodel? repair?):\n- Photo (attach if possible):",
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
      "Full renovations, tub-to-shower conversions, vanity swaps, tile work, and everything in between. Bathrooms are Jonny's specialty.",
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

/** Gallery — replace with real Instagram post URLs + thumbnails.
 *  Each item links out to Instagram, which drives follows as a side effect.
 *  TODO: Replace all 12 entries with real @handy_soluti0ns posts. */
export const galleryPosts = [
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Bathroom remodel — tile + vanity" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Kitchen refresh" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "New deck build" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Tub-to-shower conversion" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Backsplash install" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Deck stain & railing" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Drywall patch & paint" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Vanity swap" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Countertop install" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Grout refresh" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Deck board replacement" },
  { url: "https://www.instagram.com/handy_soluti0ns/", caption: "Bathroom floor tile" },
] as const;

/** Helper — WhatsApp deep link with pre-filled message */
export function whatsappLink(): string {
  const encoded = encodeURIComponent(site.whatsappOpener);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}
