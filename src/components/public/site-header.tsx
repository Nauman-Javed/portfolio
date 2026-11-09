import { RiArrowRightUpLine, RiCodeSSlashLine } from "react-icons/ri";
import Link from "next/link";
import {
  getExperience,
  getProfile,
  getPublishedProjects,
  getSkills,
} from "@/data/queries";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { localePath, type Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { PROFILE_FIELDS, localize } from "@/i18n/localize";

import { MobileNav } from "./mobile-nav";
import { Container, ctaClass } from "./ui";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [rawProfile, skills, experience, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getPublishedProjects(),
  ]);
  const profile = rawProfile && localize(rawProfile, locale, PROFILE_FIELDS);
  const name = profile?.name ?? "Portfolio";

  // Only link to sections that actually have content.
  const links = [
    profile?.about && { href: "/#about", label: t("nav.about") },
    skills.length > 0 && { href: "/#skills", label: t("nav.skills") },
    experience.length > 0 && {
      href: "/#experience",
      label: t("nav.experience"),
    },
    projects.length > 0 && { href: "/projects", label: t("nav.projects") },
  ]
    .filter(Boolean)
    .map((l) => {
      const link = l as { href: string; label: string };
      return { ...link, href: localePath(locale, link.href) };
    });

  return (
    <header className="border-hairline bg-canvas/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link
          href={localePath(locale, "/")}
          aria-label={t("common.homeLabel", { name })}
          className="flex min-w-0 items-center gap-3"
        >
          <span
            aria-hidden
            className="bg-tealsoft text-teal flex size-9 items-center justify-center rounded-md"
          >
            <RiCodeSSlashLine size={20} />
          </span>
          <span className="truncate text-[15px]">{name}</span>
        </Link>
        <nav
          aria-label={t("nav.main")}
          className="hidden items-center gap-1 md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-fg2 hover:text-fg flex min-h-11 items-center rounded-md px-3 text-[13px] transition-colors duration-150"
            >
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher className="mx-1" />
          <ThemeToggle
            label={t("common.toggleTheme")}
            className="border-border mx-1 size-9 rounded-full border"
          />
          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ctaClass("primary")} ms-2`}
            >
              {t("common.myResume")}{" "}
              <RiArrowRightUpLine
                aria-hidden
                className="inline-block size-4 rtl:-scale-x-100"
              />
              <span className="sr-only">{t("common.opensInNewTab")}</span>
            </a>
          )}
        </nav>
        <MobileNav links={links} resumeUrl={profile?.resumeUrl} />
      </Container>
    </header>
  );
}
