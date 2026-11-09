"use client";

import { useTranslation } from "react-i18next";
import type { Locale } from "./config";

/** Current locale plus `t` for client components. */
export function useLocale() {
  const { t, i18n } = useTranslation();
  return { t, locale: i18n.language as Locale };
}
