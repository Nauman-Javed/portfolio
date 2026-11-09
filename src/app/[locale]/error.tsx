"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container, ctaClass } from "@/components/public/ui";
import { localePath } from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";

export default function PublicError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { t, locale } = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-32 text-center">
      <p className="text-teal text-[11px] tracking-[0.14em] uppercase">
        {t("errors.label")}
      </p>
      <h1 className="mt-4 text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
        {t("errors.title")}
      </h1>
      <p className="text-fg2 mx-auto mt-4 max-w-md text-[16px] leading-[1.6]">
        {t("errors.text")}
      </p>
      {error.digest && (
        <p className="text-fg3 mt-3 font-mono text-xs">
          {t("errors.reference", { digest: error.digest })}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className={ctaClass("primary")}
        >
          {t("errors.tryAgain")}
        </button>
        <Link href={localePath(locale, "/")} className={ctaClass("secondary")}>
          {t("common.backHome")}
        </Link>
      </div>
    </Container>
  );
}
