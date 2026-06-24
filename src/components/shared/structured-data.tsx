import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/seo";

/**
 * JSON-LD structured data for the marketing site. Emits Organization,
 * WebSite, and SoftwareApplication (with the Pro subscription offer) graphs.
 * No FAQPage schema — Google retired FAQ rich results in May 2026.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/opengraph-image`,
        },
        description: SITE_DESCRIPTION,
        ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@genzy.com",
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        applicationCategory: "EducationApplication",
        operatingSystem: "Web",
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: "9",
            priceCurrency: "USD",
            description: "Monthly subscription — all tests, materials, and analytics.",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
