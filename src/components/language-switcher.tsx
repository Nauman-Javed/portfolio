"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_NAMES,
  hasLocale,
  type Locale,
} from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

/** One-click toggle: shows the other language's name and switches to it. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next: Locale = LOCALES.find((l) => l !== locale) ?? locale;

  function change() {
    // Remember the choice so the root URL opens in this language next time.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const [, first, ...rest] = pathname.split("/");
    const tail = hasLocale(first) ? rest.join("/") : [first, ...rest].join("/");
    router.push(`/${next}${tail ? `/${tail}` : ""}${window.location.hash}`);
  }

  return (
    <button
      type="button"
      onClick={change}
      lang={next}
      style={{
        fontFamily:
          next === "ar"
            ? "var(--font-arabic), system-ui, sans-serif"
            : "var(--font-inter), system-ui, sans-serif",
      }}
      aria-label={`${t("common.language")}: ${LOCALE_NAMES[next]}`}
      className={cn(
        "text-fg2 hover:text-fg hover:bg-raised flex h-9 items-center rounded-full px-3 text-[13px] transition-colors duration-150",
        className,
      )}
    >
      {LOCALE_NAMES[next]}
    </button>
  );
}
