import { RiHeartFill, RiArrowUpLine } from "react-icons/ri";
import { getProfile } from "@/data/queries";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { PROFILE_FIELDS, localize } from "@/i18n/localize";

import { Container } from "./ui";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const rawProfile = await getProfile();
  const profile = rawProfile && localize(rawProfile, locale, PROFILE_FIELDS);

  return (
    <footer className="border-hairline mt-24 border-t">
      <Container className="text-fg3 flex flex-wrap items-center justify-between gap-3 py-8 text-xs">
        <p>
          © {profile?.name}. {t("footer.madeWith")}{" "}
          <RiHeartFill
            size={14}
            aria-hidden
            className="inline-block align-[-2px] text-[#e5484d]"
          />
          <span className="sr-only">{t("footer.love")}</span>{" "}
          {t("footer.inCountry")}
        </p>
        <a
          href="#top"
          className="hover:text-fg flex min-h-11 items-center transition-colors duration-150"
        >
          {t("common.backToTop")}{" "}
          <RiArrowUpLine aria-hidden className="inline-block size-4" />
        </a>
      </Container>
    </footer>
  );
}
