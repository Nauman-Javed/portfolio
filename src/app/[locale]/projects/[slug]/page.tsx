import { RiArrowLeftLine, RiArrowRightUpLine } from "react-icons/ri";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/safe-image";
import { Container, ctaClass } from "@/components/public/ui";
import { getProjectBySlug, getPublishedProjects } from "@/data/queries";
import { LOCALES, hasLocale, localePath } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { PROJECT_FIELDS, localize } from "@/i18n/localize";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return (await getPublishedProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = await getProjectBySlug(slug);
  if (!raw || !hasLocale(locale)) return {};
  const project = localize(raw, locale, PROJECT_FIELDS);
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: localePath(locale, `/projects/${project.slug}`),
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localePath(l, `/projects/${project.slug}`)]),
      ),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getT(locale);
  const raw = await getProjectBySlug(slug);
  if (!raw) notFound();
  const project = localize(raw, locale, PROJECT_FIELDS);

  const hasTech = project.techStack.length > 0;
  const hasLinks = !!(project.liveUrl || project.githubUrl);

  return (
    <Container className="max-w-[960px] pt-12 sm:pt-20">
      <article>
        <Link
          href={localePath(locale, "/projects")}
          className="text-fg2 hover:text-fg mb-8 inline-flex min-h-11 items-center gap-1.5 text-[13px] transition-colors duration-150"
        >
          <RiArrowLeftLine
            aria-hidden
            className="inline-block size-4 rtl:-scale-x-100"
          />
          {t("projects.allProjects")}
        </Link>
        <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
          {project.title}
        </h1>
        <p className="text-fg2 mt-4 max-w-2xl text-[18px] leading-[1.6]">
          {project.shortDescription}
        </p>

        <div className="border-hairline bg-band relative mt-10 aspect-16/10 overflow-hidden rounded-[10px] border">
          <SafeImage
            src={project.coverImageUrl}
            alt={t("projects.screenshot", { title: project.title })}
            priority
            sizes="(min-width: 960px) 912px, 100vw"
            className="object-contain"
          />
        </div>

        <div
          className={`mt-12 grid gap-10 ${hasTech || hasLinks ? "md:grid-cols-[1.6fr_1fr]" : ""}`}
        >
          <div>
            <h2 className="text-fg2 mb-3 text-[11px] tracking-[0.14em] uppercase">
              {t("projects.overview")}
            </h2>
            <p className="text-fg2 text-[16px] leading-[1.7]">
              {project.description}
            </p>
          </div>
          {(hasTech || hasLinks) && (
            <div>
              {hasTech && (
                <>
                  <h2 className="text-fg2 mb-3 text-[11px] tracking-[0.14em] uppercase">
                    {t("projects.builtWith")}
                  </h2>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.techStack.map((t) => (
                      <li
                        key={t}
                        className="bg-raised border-hairline text-fg2 rounded-full border px-3 py-1 text-[11px] leading-[1.4]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {hasLinks && (
                <div className={`${hasTech ? "mt-8" : ""} flex flex-col gap-3`}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ctaClass("primary")}
                    >
                      {t("projects.liveSite")}{" "}
                      <RiArrowRightUpLine
                        aria-hidden
                        className="inline-block size-4 rtl:-scale-x-100"
                      />
                      <span className="sr-only">
                        {t("common.opensInNewTab")}
                      </span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ctaClass("secondary")}
                    >
                      {t("projects.sourceCode")}{" "}
                      <RiArrowRightUpLine
                        aria-hidden
                        className="inline-block size-4 rtl:-scale-x-100"
                      />
                      <span className="sr-only">
                        {t("common.opensInNewTab")}
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {project.gallery.length > 0 && (
          <section className="mt-16" aria-labelledby="gallery-heading">
            <h2
              id="gallery-heading"
              className="text-fg2 mb-4 text-[11px] tracking-[0.14em] uppercase"
            >
              {t("projects.gallery")}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {project.gallery.map((image) => (
                <li
                  key={image.id}
                  className="border-hairline bg-band relative aspect-16/10 overflow-hidden rounded-lg border"
                >
                  <SafeImage
                    src={image.url}
                    alt={t("projects.screenshot", { title: project.title })}
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
