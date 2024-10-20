import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/magic-link-sent", "/magic-link-confirmation", '/privacy-policy', '/terms-of-service', '/portfolio-components', '/get-started'],
      },
    ],
    sitemap: `https://www.webportfolios.dev/sitemap.xml`,
  };
}
