import { site } from "@/site.config";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `${site.brandName} — ${site.tagline}`,
    alternateName: site.legalName,
    description: `Honest home repairs and small remodels in ${site.primaryCity} and the surrounding areas. ${site.license}, insured, and serving the area since ${site.establishedYear}.`,
    url: `https://${site.domain}`,
    telephone: `+${site.whatsappNumber}`,
    email: site.contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.primaryCity,
      addressRegion: site.state,
      addressCountry: "US",
    },
    areaServed: site.serviceArea.map((city) => ({
      "@type": "City",
      name: `${city}, ${site.state}`,
    })),
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
