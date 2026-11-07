import { ContactSection } from "@/components/public/contact-section";
import { ExperienceSection } from "@/components/public/experience-section";
import { Hero } from "@/components/public/hero";
import { ProjectsSection } from "@/components/public/projects-section";
import { SkillsMarquee } from "@/components/public/skills-marquee";
import { SkillsSection } from "@/components/public/skills-section";
import { Container } from "@/components/public/ui";
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

  if (!profile) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.1]">
          Coming soon
        </h1>
        <p className="text-fg2 mt-4">This portfolio is being set up.</p>
      </Container>
    );
  }

  // Fall back to every published project if none are marked featured.
  const shown = featured.length > 0 ? featured : published;

  return (
    <>
      <Hero profile={profile} skills={skills} stats={stats} />
      {skills.length > 0 && (
        <>
          <SkillsMarquee skills={skills} />
          <SkillsSection skills={skills} />
        </>
      )}
      {(experience.length > 0 || education.length > 0) && (
        <ExperienceSection experience={experience} education={education} />
      )}
      {shown.length > 0 && (
        <ProjectsSection
          projects={shown}
          showAllLink={published.length > shown.length}
        />
      )}
      <ContactSection profile={profile} links={links} />
    </>
  );
}
