import { ContactSection } from "@/components/public/contact-section";
import { ExperienceSection } from "@/components/public/experience-section";
import { Hero } from "@/components/public/hero";
import { ProjectsSection } from "@/components/public/projects-section";
import { SkillsMarquee } from "@/components/public/skills-marquee";
import { SkillsSection } from "@/components/public/skills-section";
import {
  getEducation,
  getExperience,
  getFeaturedProjects,
  getProfile,
  getPublishedProjects,
  getSkills,
  getSocialLinks,
  getStats,
} from "@/data/queries";

export default async function HomePage() {
  const [
    profile,
    education,
    skills,
    experience,
    featured,
    published,
    links,
    stats,
  ] = await Promise.all([
    getProfile(),
    getEducation(),
    getSkills(),
    getExperience(),
    getFeaturedProjects(),
    getPublishedProjects(),
    getSocialLinks(),
    getStats(),
  ]);
  if (!profile) throw new Error("Profile not found. Run the database seed.");

  // Fall back to every published project if none are marked featured.
  const shown = featured.length > 0 ? featured : published;

  return (
    <>
      <Hero profile={profile} skills={skills} stats={stats} />
      <SkillsMarquee skills={skills} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} education={education} />
      <ProjectsSection
        projects={shown}
        showAllLink={published.length > shown.length}
      />
      <ContactSection profile={profile} links={links} />
    </>
  );
}
