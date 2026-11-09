import type { Metadata } from "next";
import { ProjectGrid } from "@/components/public/projects-section";
import { Container, SectionHeader } from "@/components/public/ui";
import { getPublishedProjects } from "@/data/queries";
import { LOCALES, hasLocale, localePath } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { PROJECT_FIELDS, localize } from "@/i18n/localize";

import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getT(locale);
  return {
    title: t("nav.projects"),
    description: t("projects.pageDescription"),
    alternates: {
      canonical: localePath(locale, "/projects"),
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localePath(l, "/projects")]),
      ),
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getT(locale);
  const projects = (await getPublishedProjects()).map((p) =>
    localize(p, locale, PROJECT_FIELDS),
  );

  return (
    <Container className="pt-16 sm:pt-24">
      <SectionHeader title={t("projects.allProjects")} />
      {projects.length > 0 ? (
        <ProjectGrid projects={projects} locale={locale} />
      ) : (
        <p className="text-fg2">{t("projects.none")}</p>
      )}
    </Container>
  );
}
