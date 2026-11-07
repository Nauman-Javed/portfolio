import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the private dashboard and the API out of search results.
      disallow: ["/manage", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
