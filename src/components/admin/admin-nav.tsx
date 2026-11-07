"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

function hrefFor(pathname: string) {
  return (
    links.find(({ href }) =>
      href === "/manage" ? pathname === href : pathname.startsWith(href),
    )?.href ?? null
  );
}

// The pill lives inside the <Link> so useLinkStatus can light it up the moment
// the tab is clicked, instead of waiting for the next page to arrive.
function Pill({ label, active }: { label: string; active: boolean }) {
  const { pending } = useLinkStatus();
  const on = active || pending;

  return (
    <span
      className={cn(
        "block rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-200",
        on
          ? "bg-foreground text-background"
          : "text-muted-foreground group-hover:text-foreground",
        pending && !active && "opacity-80",
      )}
    >
      {label}
    </span>
  );
}

export function AdminNav() {
  const pathname = usePathname();
  // The tab that was just clicked, remembered together with the page we were
  // on. Once the pathname changes the real route takes over.
  const [clicked, setClicked] = useState<{ href: string; from: string } | null>(
    null,
  );
  const activeHref =
    clicked && clicked.from === pathname ? clicked.href : hrefFor(pathname);

  return (
    <nav
      aria-label="Admin"
      className="border-border mx-auto flex max-w-6xl gap-1 overflow-x-auto border-b px-5 py-2 sm:px-8"
    >
      {links.map(({ href, label }) => {
        const active = href === activeHref;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className="group rounded-full"
            onClick={() => setClicked({ href, from: pathname })}
          >
            <Pill label={label} active={active} />
          </Link>
        );
      })}
    </nav>
  );
}
