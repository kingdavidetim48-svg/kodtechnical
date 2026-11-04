import React from "react";
import { COMPANY_INFO, ENGINEERING_SERVICES } from "@/lib/constants";

const SITE_URL = process.env.SITE_URL || (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost") ? process.env.NEXT_PUBLIC_SITE_URL : "https://kodtechnical.vercel.app");

/**
 * Organization & ProfessionalService JSON-LD Schema
 * Represents KOD Technical Services as an authentic indigenous engineering firm in Nigeria.
 */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY_INFO.name,
        legalName: COMPANY_INFO.name,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/images/brand/kod-logo.png`,
          contentUrl: `${SITE_URL}/images/brand/kod-logo.png`,
          caption: `${COMPANY_INFO.name} Official Logo`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#primaryimage`,
          url: `${SITE_URL}/images/brand/og-image.jpg`,
          width: 1200,
          height: 630,
        },
        description:
          "Indigenous engineering and oilfield servicing firm in Port Harcourt, Nigeria. Specializing in rotating equipment maintenance, precision laser alignment, dynamic balancing, machine shop services, and technical procurement.",
        email: COMPANY_INFO.primaryEmail,
        telephone: COMPANY_INFO.primaryPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "#41 Stellian Road, Off Elelenwo",
          addressLocality: "Port Harcourt",
          addressRegion: "Rivers State",
          addressCountry: "NG",
        },
        priceRange: "$$$",
        areaServed: [
          {
            "@type": "Country",
            name: "Nigeria",
          },
          {
            "@type": "AdministrativeArea",
            name: "Rivers State",
          },
          {
            "@type": "AdministrativeArea",
            name: "Niger Delta",
          },
        ],
        knowsAbout: [
          "Rotating Equipment Overhaul",
          "Laser Shaft Alignment",
          "Dynamic Balancing",
          "Condition Monitoring",
          "Industrial Machine Shop Services",
          "API 610 Centrifugal Pumps",
          "Industrial Gas Compressors",
          "Machinery Retrofitting",
          "Oil and Gas Engineering Services",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "KOD Technical Services Engineering Capabilities",
          itemListElement: ENGINEERING_SERVICES.map((service, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${SITE_URL}/services/${service.slug}`,
              name: service.title,
              description: service.summary,
              url: `${SITE_URL}/services/${service.slug}`,
            },
            position: index + 1,
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY_INFO.name,
        description:
          "Rotating Equipment & Oilfield Engineering in Port Harcourt, Nigeria",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-NG",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * BreadcrumbList JSON-LD Schema
 * Injects hierarchical navigation data for rich snippets in Google SERPs.
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Detail JSON-LD Schema
 * Structured schema for individual service detail pages.
 */
export function ServiceJsonLd({
  title,
  description,
  slug,
  category,
}: {
  title: string;
  description: string;
  slug: string;
  category: string;
}) {
  const serviceUrl = `${SITE_URL}/services/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceUrl,
    name: title,
    description: description,
    serviceType: category,
    url: serviceUrl,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    category: category,
    termsOfService: `${SITE_URL}/terms`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
