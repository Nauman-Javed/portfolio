import { type Locale } from "./config";
import { createI18n } from "./create";
import { MESSAGES } from "./messages";

const instances = new Map<Locale, ReturnType<typeof createI18n>>();

/** Translation function for server components: `const t = getT(locale)`. */
export function getT(locale: Locale) {
  let i18n = instances.get(locale);
  if (!i18n) {
    i18n = createI18n(locale, MESSAGES[locale], MESSAGES.en);
    instances.set(locale, i18n);
  }
  return i18n.t.bind(i18n);
}
