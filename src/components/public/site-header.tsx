import Link from "next/link";
import {
  getExperience,
  getProfile,
  getPublishedProjects,
  getSkills,
} from "@/data/queries";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container, ctaClass } from "./ui";

export async function SiteHeader() {
  const [profile, skills, experience, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getPublishedProjects(),
  ]);
  const name = profile?.name ?? "Portfolio";

  // Only link to sections that actually have content.
  const links = [
    profile?.about && { href: "/#about", label: "About" },
    skills.length > 0 && { href: "/#skills", label: "Skills" },
    experience.length > 0 && { href: "/#experience", label: "Experience" },
    projects.length > 0 && { href: "/projects", label: "Projects" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <header className="border-hairline bg-canvas/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link
          href="/"
          aria-label={`${name}, home`}
          className="flex items-center gap-3"
        >
          <span
            aria-hidden
            className="bg-tealsoft text-teal flex size-9 items-center justify-center rounded-md font-mono text-[13px]"
          >
            {"</>"}
          </span>
          <span className="text-[15px]">{name}</span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-fg2 hover:text-fg flex min-h-11 items-center rounded-md px-3 text-[13px] transition-colors duration-150"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ctaClass("primary")} ml-2`}
            >
              My Resume <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </nav>
      </Container>
    </header>
  );
}
