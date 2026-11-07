"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/manage", label: "Overview" },
  { href: "/manage/profile", label: "Profile" },
  { href: "/manage/projects", label: "Projects" },
  { href: "/manage/experience", label: "Experience" },
  { href: "/manage/skills", label: "Skills" },
  { href: "/manage/education", label: "Education" },
  { href: "/manage/certifications", label: "Certifications" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className="border-border mx-auto flex max-w-6xl gap-1 overflow-x-auto border-b px-5 py-2 sm:px-8"
    >
      {links.map(({ href, label }) => {
        const active =
          href === "/manage" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
