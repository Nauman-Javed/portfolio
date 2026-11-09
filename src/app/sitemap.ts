import type { MetadataRoute } from "next";
import { getProfile, getPublishedProjects } from "@/data/queries";
import { LOCALES, localePath } from "@/i18n/config";
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

  const entry = (
    path: string,
    changeFrequency: "monthly",
    priority: number,
    lastModified?: Date,
  ) =>
    LOCALES.map((locale) => ({
      url: SITE_URL + localePath(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, SITE_URL + localePath(l, path)]),
        ),
      },
    }));

  return [
    ...entry("/", "monthly", 1, latest),
    ...entry("/projects", "monthly", 0.8, latest),
    ...projects.flatMap((p) =>
      entry(`/projects/${p.slug}`, "monthly", 0.7, p.updatedAt),
    ),
  ];
}
