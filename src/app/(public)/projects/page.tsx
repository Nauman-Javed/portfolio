import type { Metadata } from "next";
import { ProjectGrid } from "@/components/public/projects-section";
import { Container, SectionHeader } from "@/components/public/ui";
import { getPublishedProjects } from "@/data/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of the web applications I've built.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <Container className="pt-16 sm:pt-24">
      <SectionHeader title="All projects" />
      {projects.length > 0 ? (
        <ProjectGrid projects={projects} />
      ) : (
        <p className="text-fg2">No projects to show yet.</p>
      )}
    </Container>
  );
}
