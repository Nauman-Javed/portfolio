import { createInstance } from "i18next";
import { DEFAULT_LOCALE, type Locale } from "./config";
import type { Messages } from "./messages/types";

/**
 * A ready-to-use i18next instance for one language, with English as the
 * fallback. Resources are passed in, so nothing is fetched and init is
 * synchronous — safe to call during render on the server and the client.
 */
export function createI18n(
  locale: Locale,
  messages: Messages,
  fallback?: Messages,
) {
  const i18n = createInstance();
  void i18n.init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: "translation",
    resources: {
      [locale]: { translation: messages },
      ...(fallback && locale !== DEFAULT_LOCALE
        ? { [DEFAULT_LOCALE]: { translation: fallback } }
        : {}),
    },
    interpolation: { escapeValue: false }, // React already escapes.
    initAsync: false,
  });
  return i18n;
}
