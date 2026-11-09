// The languages the public site is available in. `ar` is right-to-left.
export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Each language written in itself, for the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Open Graph locale codes. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_AR",
};

export function hasLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Prefix an internal path with a locale: ("ar", "/#about") → "/ar#about". */
export function localePath(locale: Locale, href: string) {
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}
