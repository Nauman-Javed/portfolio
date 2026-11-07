"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";

// Read functions for the public pages. Everything here is cached and tagged;
// admin Server Actions call updateTag() with these tags after a mutation so
// changes go live without a redeploy.

export async function getProfile() {
  cacheTag("profile");
  cacheLife("max");
  return db.profile.findUnique({ where: { id: "profile" } });
}

export async function getSocialLinks() {
  cacheTag("social-links");
  cacheLife("max");
  return db.socialLink.findMany({ orderBy: { order: "asc" } });
}

export async function getPublishedProjects() {
  cacheTag("projects");
  cacheLife("max");
  return db.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getFeaturedProjects() {
  cacheTag("projects");
  cacheLife("max");
  return db.project.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
  });
}

export async function getProjectBySlug(slug: string) {
  cacheTag("projects", `project:${slug}`);
  cacheLife("max");
  return db.project.findFirst({
    where: { slug, published: true },
    include: { gallery: { orderBy: { order: "asc" } } },
  });
}

export async function getExperience() {
  cacheTag("experience");
  cacheLife("max");
  return db.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getSkills() {
  cacheTag("skills");
  cacheLife("max");
  return db.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
}

export async function getEducation() {
  cacheTag("education");
  cacheLife("max");
  return db.education.findMany({ orderBy: { order: "asc" } });
}

export async function getCertifications() {
  cacheTag("certifications");
  cacheLife("max");
  return db.certification.findMany({ orderBy: { order: "asc" } });
}

export async function getStats() {
  cacheTag("experience", "projects", "skills");
  cacheLife("days");
  const [first, projects, skills] = await Promise.all([
    db.experience.findFirst({
      where: { employmentType: { not: "Internship" } },
      orderBy: { startDate: "asc" },
      select: { startDate: true },
    }),
    db.project.count({ where: { published: true } }),
    db.skill.count(),
  ]);
  const years = first
    ? Math.max(
        1,
        Math.floor((Date.now() - first.startDate.getTime()) / (365.25 * 864e5)),
      )
    : 0;
  return { years, projects, skills };
}
