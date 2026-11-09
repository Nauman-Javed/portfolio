"use client";

import { Container } from "@/components/public/ui";
import { useLocale } from "@/i18n/use-locale";

export default function PublicLoading() {
  const { t } = useLocale();
  return (
    <Container className="pt-16 sm:pt-24">
      <div role="status" aria-live="polite" className="animate-pulse">
        <span className="sr-only">{t("common.loading")}</span>
        <div className="bg-raised h-3 w-24 rounded-sm" />
        <div className="bg-raised mt-5 h-10 w-2/3 max-w-md rounded-md" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="bg-surface border-hairline h-72 rounded-lg border" />
          <div className="bg-surface border-hairline h-72 rounded-lg border" />
        </div>
      </div>
    </Container>
  );
}
