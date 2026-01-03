/**
 * SEO Configuration and Structured Data
 */

export interface SEOConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const defaultSEO: SEOConfig = {
  title: "UX Designer & Product Designer",
  description:
    "Portfolio showcasing user-centered design solutions for SaaS, CRM, and enterprise applications. Specialized in UX research, design systems, and product strategy.",
  url: "https://yourportfolio.com",
  image: "https://yourportfolio.com/og-image.jpg",
  type: "website",
  author: "Your Name",
};

/**
 * Generate SEO meta tags
 */
export const generateSEO = (config: Partial<SEOConfig> = {}) => {
  const seo = { ...defaultSEO, ...config };

  return {
    title: seo.title,
    meta: [
      // Primary Meta Tags
      {
        name: "description",
        content: seo.description,
      },
      {
        name: "author",
        content: seo.author,
      },

      // Open Graph / Facebook
      {
        property: "og:type",
        content: seo.type,
      },
      {
        property: "og:title",
        content: seo.title,
      },
      {
        property: "og:description",
        content: seo.description,
      },
      {
        property: "og:url",
        content: seo.url,
      },
      ...(seo.image
        ? [
            {
              property: "og:image",
              content: seo.image,
            },
            {
              property: "og:image:width",
              content: "1200",
            },
            {
              property: "og:image:height",
              content: "630",
            },
          ]
        : []),
      ...(seo.publishedTime
        ? [{ property: "article:published_time", content: seo.publishedTime }]
        : []),
      ...(seo.modifiedTime
        ? [{ property: "article:modified_time", content: seo.modifiedTime }]
        : []),

      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: seo.title,
      },
      {
        name: "twitter:description",
        content: seo.description,
      },
      ...(seo.image
        ? [
            {
              name: "twitter:image",
              content: seo.image,
            },
          ]
        : []),

      // Additional
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        name: "theme-color",
        content: "#0a0a0a",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: seo.url,
      },
    ],
  };
};

/**
 * Generate Schema.org Person structured data
 */
export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    jobTitle: "UX Designer & Product Designer",
    url: "https://yourportfolio.com",
    sameAs: [
      "https://linkedin.com/in/yourprofile",
      "https://behance.net/yourprofile",
      "https://dribbble.com/yourprofile",
    ],
    image: "https://yourportfolio.com/profile.jpg",
    description:
      "UX Designer specializing in user-centered design solutions for SaaS and enterprise applications.",
  };
};

/**
 * Generate Schema.org CreativeWork structured data for case studies
 */
export const generateCreativeWorkSchema = (project: {
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    datePublished: project.datePublished || new Date().toISOString(),
    url: project.url,
  };
};

/**
 * Inject structured data into the page
 */
export const injectStructuredData = (schema: object) => {
  if (typeof window === "undefined") return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };
};

export default {
  generateSEO,
  generatePersonSchema,
  generateCreativeWorkSchema,
  injectStructuredData,
  defaultSEO,
};
