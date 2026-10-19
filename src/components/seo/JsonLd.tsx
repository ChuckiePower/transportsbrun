import logo from "@brand/logo-transports-brun.png";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/** Injecte un bloc JSON-LD (échappement de « < » pour éviter toute fermeture de balise) */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const businessId = `${site.url}/#entreprise`;

/** LocalBusiness : uniquement des propriétés issues du site actuel */
export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: absoluteUrl(logo.src),
    image: absoluteUrl("/opengraph-image"),
    telephone: site.phones[0]!.e164,
    email: site.emails[0]!.address,
    foundingDate: site.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.googleMapsUrl,
    openingHoursSpecification: site.hours.spec.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: slot.opens,
      closes: slot.closes,
    })),
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      contactType: p.label,
      telephone: p.e164,
      areaServed: "FR",
      availableLanguage: "French",
    })),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Haut-Rhin" },
      { "@type": "AdministrativeArea", name: "Alsace" },
      { "@type": "Country", name: "France" },
    ],
    sameAs: [site.social.facebook],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: { "@id": businessId },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Haut-Rhin" },
      { "@type": "Country", name: "France" },
    ],
  };
}
