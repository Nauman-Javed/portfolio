import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutSection } from "@/components/public/about-section";
import { ContactSection } from "@/components/public/contact-section";
import { ExperienceSection } from "@/components/public/experience-section";
import { Hero } from "@/components/public/hero";
import { ProjectsGrid } from "@/components/public/projects-grid";
import { Section } from "@/components/public/section";
import { SkillsSection } from "@/components/public/skills-section";
import {
  getEducation,
  getExperience,
  getFeaturedProjects,
  getProfile,
  getSkills,
} from "@/data/queries";

export default async function HomePage() {
  const [profile, education, skills, experience, featured] = await Promise.all([
    getProfile(),
    getEducation(),
    getSkills(),
    getExperience(),
    getFeaturedProjects(),
  ]);
  if (!profile) throw new Error("Profile not found. Run the database seed.");

  return (
    <>
      <Hero profile={profile} />
      <AboutSection profile={profile} education={education} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <Section
        id="projects"
        label="Selected work"
        title="Things I’ve built recently."
      >
        <ProjectsGrid projects={featured} />
        <Link
          href="/projects"
          className="hover:text-brand mt-10 inline-flex items-center gap-2 font-medium transition-colors"
        >
          All projects <ArrowRight className="size-4" />
        </Link>
      </Section>
      <ContactSection profile={profile} />
    </>
  );
}
