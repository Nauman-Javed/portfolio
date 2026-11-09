"use client";

import { useState } from "react";
import { I18nextProvider } from "react-i18next";
import type { Locale } from "./config";
import { createI18n } from "./create";
import type { Messages } from "./messages/types";

/** Makes translations available to client components. Mount it with `key={locale}`. */
export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const [i18n] = useState(() => createI18n(locale, messages));
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
