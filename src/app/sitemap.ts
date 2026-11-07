import type { MetadataRoute } from "next";
import { getProfile, getPublishedProjects } from "@/data/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [profile, projects] = await Promise.all([
    getProfile(),
    getPublishedProjects(),
  ]);

  // Last-modified dates come from the database, so the sitemap only changes
  // when content does.
  const latest = [profile?.updatedAt, ...projects.map((p) => p.updatedAt)]
    .filter((d): d is Date => !!d)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
