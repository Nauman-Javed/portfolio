import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/types";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="lift border-hairline bg-surface overflow-hidden rounded-lg border">
      <div className="bg-band border-hairline relative h-60 overflow-hidden border-b">
        <Image
          src={project.coverImageUrl}
          alt={`${project.title} screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 1000px) 600px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-[22px]">
        <h3 className="flex items-start justify-between gap-4 text-xl leading-[1.3]">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal transition-colors duration-150"
            >
              {project.title} <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-teal transition-colors duration-150"
            >
              {project.title}
            </Link>
          )}
        </h3>
        <p className="text-fg2 mt-2 text-[14px] leading-[1.6]">
          {project.shortDescription}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="bg-chip text-fg2 rounded-sm px-2 py-1 text-[11px] leading-[1.4]"
            >
              {tech}
            </li>
          ))}
        </ul>
        <Link
          href={`/projects/${project.slug}`}
          className="text-teal mt-5 inline-flex min-h-11 items-center text-[13px] hover:underline"
        >
          Case study →<span className="sr-only"> for {project.title}</span>
        </Link>
      </div>
    </article>
  );
}
