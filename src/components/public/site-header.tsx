import Link from "next/link";
import { getProfile } from "@/data/queries";
import { Container, ctaClass } from "./ui";

const links = [
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
];

export async function SiteHeader() {
  const profile = await getProfile();
  const name = profile?.name ?? "Portfolio";

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
          <Link href="/#contact" className={`${ctaClass("primary")} ml-2`}>
            Get in touch →
          </Link>
        </nav>
      </Container>
    </header>
  );
}
