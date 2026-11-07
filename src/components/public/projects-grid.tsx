import type { Project } from "@/data/types";
import { ProjectCard } from "./project-card";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} priority={i < 2} />
      ))}
    </div>
  );
}
