import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { ctaClass } from "./ui";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="text-center">
      <p className="text-teal text-[11px] tracking-[0.14em] uppercase">404</p>
      <h1 className="mt-4 text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
        {t("errors.notFoundTitle")}
      </h1>
      <p className="text-fg2 mx-auto mt-4 max-w-md text-[16px] leading-[1.6]">
        {t("errors.notFoundText")}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={localePath(locale, "/")} className={ctaClass("primary")}>
          {t("common.backHome")}
        </Link>
        <Link
          href={localePath(locale, "/projects")}
          className={ctaClass("secondary")}
        >
          {t("projects.viewProjects")}
        </Link>
      </div>
    </div>
  );
}
