import Link from "next/link";
import type { Project } from "@/data/types";
import { ProjectCard } from "./project-card";
import { Container, SectionHeader } from "./ui";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} priority={i < 2} />
      ))}
    </div>
  );
}

export function ProjectsSection({
  projects,
  showAllLink,
}: {
  projects: Project[];
  showAllLink: boolean;
}) {
  return (
    <section id="projects" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <SectionHeader title="Selected work" />
        <ProjectGrid projects={projects} />
        {showAllLink && (
          <Link
            href="/projects"
            className="text-teal mt-8 inline-flex min-h-11 items-center text-[14px] hover:underline"
          >
            All projects →
          </Link>
        )}
      </Container>
    </section>
  );
}
