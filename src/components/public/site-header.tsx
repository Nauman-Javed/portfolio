import Link from "next/link";
import { getProfile } from "@/data/queries";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export async function SiteHeader() {
  const profile = await getProfile();

  return (
    <header className="bg-background/80 border-border sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight"
          aria-label={`${profile?.name ?? "Portfolio"}, home`}
        >
          nauman<span className="text-brand">.</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground rounded-full px-2.5 py-1.5 text-sm transition-colors sm:px-3"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
