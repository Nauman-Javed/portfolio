import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/public/projects-grid";
import { getPublishedProjects } from "@/data/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of the web applications I've built.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-brand mb-4 font-mono text-xs tracking-widest uppercase">
        Work
      </p>
      <h1 className="font-display mb-12 text-5xl tracking-tight sm:text-7xl">
        Projects
      </h1>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
