import { site, services } from "@/site.config";

export function LocalBusinessSchema() {
  const baseUrl = `https://${site.domain}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${baseUrl}#business`,
    name: `${site.brandName} — ${site.tagline}`,
    alternateName: site.legalName,
    slogan: site.tagline,
    description: `Honest home repairs and small remodels in ${site.primaryCity} and the surrounding areas. ${site.license}, insured, and serving the area since ${site.establishedYear}.`,
    url: baseUrl,
    image: `${baseUrl}/logo.png`,
    logo: `${baseUrl}/logo.png`,
    telephone: `+${site.whatsappNumber}`,
    email: site.contactEmail,
    foundingDate: String(site.establishedYear),
    founder: {
      "@type": "Person",
      name: site.ownerName,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.primaryCity,
      addressRegion: site.state,
      addressCountry: "US",
    },
    // Coordinates correspond to the GBP listing — pulled from the Maps
    // share URL once, kept here for schema and not used at runtime.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.002498,
      longitude: -75.3414545,
    },
    areaServed: site.serviceArea.map((city) => ({
      "@type": "City",
      name: `${city}, ${site.state}`,
    })),
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Handyman & remodel services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${baseUrl}/services/${s.slug}`,
          areaServed: site.primaryCity,
        },
      })),
    },
    sameAs: [site.instagramUrl],
    openingHoursSpecification: site.hours
      .filter((h) => h.open !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
