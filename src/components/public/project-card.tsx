import Link from "next/link";
import { SafeImage } from "@/components/safe-image";
import type { Project } from "@/data/types";
import { ctaClass } from "./ui";

function ProjectActions({ project }: { project: Project }) {
  return (
    <>
      <Link href={`/projects/${project.slug}`} className={ctaClass("primary")}>
        View project
        <span className="sr-only"> {project.title}</span>
      </Link>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClass("secondary")}
        >
          Live site <span aria-hidden>↗</span>
          <span className="sr-only">
            {" "}
            for {project.title} (opens in a new tab)
          </span>
        </a>
      )}
    </>
  );
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="group lift border-hairline bg-surface overflow-hidden rounded-lg border">
      <div className="bg-band border-hairline relative h-60 overflow-hidden border-b">
        <SafeImage
          src={project.coverImageUrl}
          alt={`${project.title} screenshot`}
          priority={priority}
          sizes="(min-width: 1000px) 600px, 100vw"
          className="object-cover object-top transition duration-300 group-focus-within:scale-105 group-focus-within:blur-sm group-hover:scale-105 group-hover:blur-sm"
        />
        {/* Shown on hover or keyboard focus. Devices that can't hover get the
            same buttons in the card body instead (below). */}
        <div className="bg-canvas/45 pointer-events-none absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 [@media(hover:none)]:hidden">
          <ProjectActions project={project} />
        </div>
      </div>
      <div className="p-[22px]">
        <h3 className="text-xl leading-[1.3]">{project.title}</h3>
        <p className="text-fg2 mt-2 text-[14px] leading-[1.6]">
          {project.shortDescription}
        </p>
        {project.techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="bg-raised border-hairline text-fg2 rounded-full border px-3 py-1 text-[11px] leading-[1.4]"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex flex-wrap gap-3 [@media(hover:hover)]:hidden">
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}
