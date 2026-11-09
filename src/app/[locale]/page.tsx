import { AboutSection } from "@/components/public/about-section";
import type { Metadata } from "next";
import { ContactSection } from "@/components/public/contact-section";
import { ExperienceSection } from "@/components/public/experience-section";
import { Hero } from "@/components/public/hero";
import { ProjectsSection } from "@/components/public/projects-section";
import { SkillsMarquee } from "@/components/public/skills-marquee";
import { SkillsSection } from "@/components/public/skills-section";
import { Container } from "@/components/public/ui";
import {
  getEducation,
  getExperience,
  getFeaturedProjects,
  getProfile,
  getPublishedProjects,
  getSkills,
  getStats,
} from "@/data/queries";
import { SOCIAL_LINKS } from "@/data/site-content";
import { LOCALES, hasLocale, localePath } from "@/i18n/config";
import { getT } from "@/i18n/server";
import {
  EDUCATION_FIELDS,
  EXPERIENCE_FIELDS,
  PROFILE_FIELDS,
  PROJECT_FIELDS,
  localize,
} from "@/i18n/localize";

import { SITE_URL } from "@/lib/site";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return {
    alternates: {
      canonical: localePath(locale, "/"),
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localePath(l, "/")]),
      ),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getT(locale);

  const [
    rawProfile,
    rawEducation,
    skills,
    rawExperience,
    rawFeatured,
    rawPublished,
    stats,
  ] = await Promise.all([
    getProfile(),
    getEducation(),
    getSkills(),
    getExperience(),
    getFeaturedProjects(),
    getPublishedProjects(),
    getStats(),
  ]);

  const profile = rawProfile && localize(rawProfile, locale, PROFILE_FIELDS);
  const education = rawEducation.map((e) =>
    localize(e, locale, EDUCATION_FIELDS),
  );
  const experience = rawExperience.map((e) =>
    localize(e, locale, EXPERIENCE_FIELDS),
  );
  const featured = rawFeatured.map((p) => localize(p, locale, PROJECT_FIELDS));
  const published = rawPublished.map((p) =>
    localize(p, locale, PROJECT_FIELDS),
  );

  if (!profile) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.1]">
          {t("home.comingSoon")}
        </h1>
        <p className="text-fg2 mt-4">{t("home.beingSetUp")}</p>
      </Container>
    );
  }

  // Fall back to every published project if none are marked featured.
  const shown = featured.length > 0 ? featured : published;

  // Structured data so search engines can show a rich result for the person.
  // `<` is escaped so no stored text can close the script tag early.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.summary,
    url: SITE_URL,
    ...(profile.location && {
      homeLocation: { "@type": "Place", name: profile.location },
    }),
    sameAs: SOCIAL_LINKS.map((link) => link.url),
  }).replace(/</g, "\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Hero
        profile={profile}
        codeProfile={rawProfile}
        years={stats.years}
        locale={locale}
      />
      {skills.length > 0 && <SkillsMarquee skills={skills} locale={locale} />}
      <AboutSection profile={profile} stats={stats} locale={locale} />
      {skills.length > 0 && <SkillsSection skills={skills} locale={locale} />}
      {(experience.length > 0 || education.length > 0) && (
        <ExperienceSection
          experience={experience}
          education={education}
          locale={locale}
        />
      )}
      {shown.length > 0 && (
        <ProjectsSection
          projects={shown}
          showAllLink={published.length > shown.length}
          locale={locale}
        />
      )}
      <ContactSection profile={profile} locale={locale} />
    </>
  );
}
