"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightUpLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocale } from "@/i18n/use-locale";
import { ctaClass } from "./ui";

/** The navbar below the `md` breakpoint: theme toggle + a menu button that opens a panel. */
export function MobileNav({
  links,
  resumeUrl,
}: {
  links: { href: string; label: string }[];
  resumeUrl?: string | null;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle
          label={t("common.toggleTheme")}
          className="border-border size-9 rounded-full border"
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          className="border-border text-fg2 hover:text-fg hover:bg-raised flex size-9 items-center justify-center rounded-full border transition-colors duration-150"
        >
          {open ? (
            <RiCloseLine size={18} aria-hidden />
          ) : (
            <RiMenuLine size={18} aria-hidden />
          )}
        </button>
      </div>

      {/* Always mounted so it can animate: the grid row grows from 0fr to 1fr. */}
      <div
        inert={!open}
        className={`bg-canvas absolute inset-x-0 top-full grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "border-hairline visible grid-rows-[1fr] border-b opacity-100 shadow-lg"
            : "invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav
          id="mobile-menu"
          aria-label={t("nav.main")}
          className={`flex min-h-0 flex-col gap-1 overflow-hidden px-5 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "translate-y-0 py-3" : "-translate-y-2 py-0"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-fg2 hover:text-fg hover:bg-raised flex min-h-11 items-center rounded-md px-3 text-[15px] transition-colors duration-150"
            >
              {l.label}
            </Link>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              download="Nauman-Qureshi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`${ctaClass("primary")} mt-2`}
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
      </div>
    </div>
  );
}
