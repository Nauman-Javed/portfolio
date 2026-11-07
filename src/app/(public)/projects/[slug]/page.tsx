import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getPublishedProjects } from "@/data/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublishedProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: { images: [project.coverImageUrl] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-20">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>
      <h1 className="font-display text-5xl tracking-tight sm:text-7xl">
        {project.title}
      </h1>
      <p className="text-muted-foreground mt-5 max-w-2xl text-lg">
        {project.shortDescription}
      </p>

      <div className="border-border bg-muted relative mt-10 aspect-16/10 overflow-hidden rounded-2xl border">
        <Image
          src={project.coverImageUrl}
          alt={`${project.title} screenshot`}
          fill
          priority
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-3 font-mono text-xs tracking-widest uppercase">
            Overview
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-mono text-xs tracking-widest uppercase">
            Built with
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <li
                key={t}
                className="bg-muted rounded-full px-3 py-1 font-mono text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-opacity hover:opacity-85"
              >
                Live site <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border hover:bg-muted inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors"
              >
                Source code <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
