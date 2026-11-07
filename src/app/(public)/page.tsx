import { AboutSection } from "@/components/public/about-section";
import type { Metadata } from "next";
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
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

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

  // Structured data so search engines can show a rich result for the person.
  // `<` is escaped so no stored text can close the script tag early.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.summary,
    url: SITE_URL,
    ...(profile.location && {
      homeLocation: { "@type": "Place", name: profile.location },
    }),
    ...(links.length > 0 && { sameAs: links.map((l) => l.url) }),
  }).replace(/</g, "\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Hero profile={profile} skills={skills} />
      {skills.length > 0 && <SkillsMarquee skills={skills} />}
      <AboutSection profile={profile} stats={stats} />
      {skills.length > 0 && <SkillsSection skills={skills} />}
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
