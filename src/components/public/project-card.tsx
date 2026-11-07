import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";

export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  return (
    <article className="group border-border bg-card focus-within:ring-ring relative overflow-hidden rounded-2xl border transition-all focus-within:ring-2 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-muted relative aspect-16/10 overflow-hidden">
        <Image
          src={project.coverImageUrl}
          alt={`${project.title} screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-brand font-mono text-xs">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-1 text-3xl">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <ArrowUpRight className="text-muted-foreground group-hover:text-brand size-6 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {project.shortDescription}
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((t) => (
            <li
              key={t}
              className="bg-muted rounded-full px-2.5 py-1 font-mono text-[11px]"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
