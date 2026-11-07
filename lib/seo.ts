import type { BlogPost, FaqItem } from "./posts";

export const SITE_URL = "https://veyra.website";
export const SITE_NAME = "Veyra";
export const SITE_EMAIL = "info@veyra.website";
export const SITE_PHONE = "+96171709133";
export const SITE_LOGO =
  "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762117640/log_ctyaz9.png";

export const SOCIAL_LINKS = [
  "https://www.facebook.com/profile.php?id=61579729479913",
  "https://www.instagram.com/veyra.website/",
  "https://www.tiktok.com/@veyra2211",
  "https://www.linkedin.com/company/veyraweb/",
];

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

// Stable entity ID for a post author, so every post points at the same Person
export function personId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${SITE_URL}/#author-${slug}`;
}

export function personJsonLd(name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(name),
    name,
    url: absoluteUrl("/about"),
    worksFor: { "@id": ORG_ID },
  };
}

// Pages that define their own openGraph/twitter replace the inherited ones, so they pass this explicitly
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Veyra — Web Development Agency in Beirut, Lebanon",
};

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Single source of truth for where a blog post lives
export function postPath(slug: string): string {
  return `/blog/${slug}`;
}

// Homepage-level entity graph: Organization, WebSite and the local business
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: SITE_LOGO },
        description:
          "Veyra is a web development and digital marketing agency in Beirut, Lebanon, building websites, mobile apps and SEO strategies for businesses in Lebanon and worldwide.",
        email: SITE_EMAIL,
        telephone: SITE_PHONE,
        sameAs: SOCIAL_LINKS,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: SITE_EMAIL,
          telephone: SITE_PHONE,
          areaServed: ["LB", "Worldwide"],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        url: SITE_URL,
        image: SITE_LOGO,
        email: SITE_EMAIL,
        telephone: SITE_PHONE,
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Beirut",
          addressCountry: "LB",
        },
        areaServed: [
          { "@type": "Country", name: "Lebanon" },
          { "@type": "City", name: "Beirut" },
        ],
        sameAs: SOCIAL_LINKS,
      },
    ],
  };
}

// Names and descriptions mirror the service cards shown on the Services page
export const SITE_SERVICES: { name: string; description: string }[] = [
  {
    name: "Website Development",
    description:
      "Fast, secure and responsive websites tailored to your business goals — professional business websites, dynamic portfolios and online stores, built custom or on WordPress, Shopify and WooCommerce.",
  },
  {
    name: "Web Design",
    description:
      "Modern UI/UX design that balances aesthetics, functionality and user intent, with unique visual identities that reflect your brand's professionalism.",
  },
  {
    name: "Digital Marketing",
    description:
      "Data-driven marketing strategies including Google Ads (PPC), Meta Ads, TikTok Ads and targeted lead generation.",
  },
  {
    name: "Search Engine Optimization (SEO)",
    description:
      "Technical SEO, On-Page Optimization and Generative Engine Optimization (GEO) to improve visibility across Google, Bing and AI-powered search platforms.",
  },
  {
    name: "Maintenance and Support",
    description:
      "Proactive maintenance and technical assistance, from speed audits to security patches.",
  },
  {
    name: "Web & App Hosting",
    description:
      "Secure, high-performance managed hosting with 99.9% uptime and daily backups.",
  },
  {
    name: "Domain Registration",
    description:
      "Registration of .com, .co, .net and .org domains to protect your brand name and establish your online identity.",
  },
  {
    name: "Mobile App Development",
    description:
      "Custom iOS and Android applications built with modern frameworks like FlutterFlow and React Native.",
  },
];

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Veyra services",
    itemListElement: SITE_SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.name,
        serviceType: service.name,
        description: service.description,
        provider: { "@id": ORG_ID },
        areaServed: [
          { "@type": "Country", name: "Lebanon" },
          { "@type": "City", name: "Beirut" },
        ],
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
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

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

// Date-only (YYYY-MM-DD) from a human-entered date like "May 22, 2026",
// built from local parts so the day never shifts across timezones.
function toDateOnly(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// The visible post date is what readers (and Google) compare against, so it wins over createdAt
export function postPublishedDate(post: BlogPost): string | undefined {
  return toDateOnly(post.date) ?? toIsoDate(post.createdAt);
}

export function postModifiedDate(post: BlogPost): string | undefined {
  const published = postPublishedDate(post);
  const updated = toIsoDate(post.updatedAt);
  if (!updated) return published;
  return published && updated.slice(0, 10) < published ? published : updated;
}

export function blogPostingJsonLd(post: BlogPost) {
  const url = absoluteUrl(postPath(post.slug));
  const wordCount = [
    ...post.intro,
    ...post.finalThoughts,
    ...post.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
      ...(s.numbered ?? []),
      ...(s.checklist ?? []),
    ]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    image: [post.image, post.image2].filter(Boolean),
    articleSection: post.category,
    wordCount,
    inLanguage: "en",
    datePublished: postPublishedDate(post),
    dateModified: postModifiedDate(post),
    author: { "@type": "Person", "@id": personId(post.author), name: post.author },
    publisher: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
  };
}
