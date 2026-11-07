// Canonical origin used for absolute URLs (sitemap, canonical links, OG tags).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");
