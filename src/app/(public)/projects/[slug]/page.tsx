import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ctaClass } from "@/components/public/ui";
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
    <Container className="max-w-[960px] pt-12 sm:pt-20">
      <article>
        <Link
          href="/projects"
          className="text-fg2 hover:text-fg mb-8 inline-flex min-h-11 items-center text-[13px] transition-colors duration-150"
        >
          ← All projects
        </Link>
        <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
          {project.title}
        </h1>
        <p className="text-fg2 mt-4 max-w-2xl text-[18px] leading-[1.6]">
          {project.shortDescription}
        </p>

        <div className="border-hairline bg-band relative mt-10 aspect-16/10 overflow-hidden rounded-[10px] border">
          <Image
            src={project.coverImageUrl}
            alt={`${project.title} screenshot`}
            fill
            priority
            sizes="(min-width: 960px) 912px, 100vw"
            className="object-contain"
          />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-fg2 mb-3 text-[11px] tracking-[0.14em] uppercase">
              Overview
            </h2>
            <p className="text-fg2 text-[16px] leading-[1.7]">
              {project.description}
            </p>
          </div>
          <div>
            <h2 className="text-fg2 mb-3 text-[11px] tracking-[0.14em] uppercase">
              Built with
            </h2>
            <ul className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <li
                  key={t}
                  className="bg-chip text-fg2 rounded-sm px-2 py-1 text-[11px] leading-[1.4]"
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
                  className={ctaClass("primary")}
                >
                  Live site <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass("secondary")}
                >
                  Source code <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {project.gallery.length > 0 && (
          <section className="mt-16" aria-labelledby="gallery-heading">
            <h2
              id="gallery-heading"
              className="text-fg2 mb-4 text-[11px] tracking-[0.14em] uppercase"
            >
              Gallery
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {project.gallery.map((image) => (
                <li
                  key={image.id}
                  className="border-hairline bg-band relative aspect-16/10 overflow-hidden rounded-lg border"
                >
                  <Image
                    src={image.url}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 640px) 448px, 100vw"
                    className="object-contain"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </Container>
  );
}
