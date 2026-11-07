import { db } from "@/lib/db";

// Uncached reads for the admin dashboard. Unlike the public queries these
// include unpublished projects. Callers must have passed requireAdmin().

export const getAdminProjects = () =>
  db.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

export const getAdminProject = (id: string) =>
  db.project.findUnique({
    where: { id },
    include: { gallery: { orderBy: { order: "asc" } } },
  });

export const getAdminProfile = () =>
  db.profile.findUnique({ where: { id: "profile" } });

export const getAdminExperience = () =>
  db.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });

export const getAdminSkills = () =>
  db.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
  });

export const getAdminEducation = () =>
  db.education.findMany({ orderBy: [{ order: "asc" }, { startYear: "desc" }] });

export const getAdminCertifications = () =>
  db.certification.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });

export async function getAdminCounts() {
  const [projects, experience, skills, education, certifications] =
    await Promise.all([
      db.project.count(),
      db.experience.count(),
      db.skill.count(),
      db.education.count(),
      db.certification.count(),
    ]);
  return { projects, experience, skills, education, certifications };
}
