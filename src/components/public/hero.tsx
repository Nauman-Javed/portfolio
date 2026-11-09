import Link from "next/link";
import {
  RiRocketLine,
  RiShieldCheckLine,
  RiArrowRightUpLine,
  RiArrowRightLine,
} from "react-icons/ri";
import type { Profile } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { CodeEditor } from "./code-editor";
import { RotatingText } from "./rotating-text";
import { Container, ctaClass } from "./ui";

const delay = (seconds: number) =>
  ({ "--d": `${seconds}s` }) as React.CSSProperties;

export function Hero({
  profile,
  codeProfile,
  years,
  locale,
}: {
  profile: Profile;
  /** English values for the code window, which always stays English and left-to-right. */
  codeProfile: Profile;
  years: number;
  locale: Locale;
}) {
  const t = getT(locale);
  const lead = profile.heroLead.trim();
  const phrases = profile.heroPhrases.map((p) => p.trim()).filter(Boolean);

  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-28">
      <Container className="grid items-center gap-16 *:min-w-0 min-[1100px]:grid-cols-[1.05fr_1fr]">
        <div>
          {profile.availability && (
            <p
              className="anim-rise border-hairline bg-surface text-fg2 mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px]"
              style={delay(0.1)}
            >
              <span
                aria-hidden
                className="anim-pulse bg-teal size-2 rounded-full"
              />
              {profile.availability}
            </p>
          )}
          <h1
            className="anim-rise text-[clamp(40px,6vw,72px)] leading-[1.08] tracking-[-0.02em]"
            style={delay(0.25)}
          >
            {lead || phrases.length > 0 ? (
              <>
                {lead}
                {phrases.length > 1 ? (
                  <RotatingText phrases={phrases} />
                ) : phrases.length === 1 ? (
                  <span className="text-teal block leading-[1.2]">
                    {phrases[0]}
                  </span>
                ) : null}
              </>
            ) : (
              profile.name
            )}
          </h1>
          <p
            className="anim-rise text-fg2 mt-6 max-w-[34rem] text-[18px] leading-[1.6]"
            style={delay(0.4)}
          >
            {profile.summary}
          </p>
          <div
            className="anim-rise mt-9 flex flex-wrap gap-3"
            style={delay(0.55)}
          >
            <Link
              href={localePath(locale, "/projects")}
              className={ctaClass("primary")}
            >
              {t("hero.viewWork")}{" "}
              <RiArrowRightLine
                aria-hidden
                className="inline-block size-4 rtl:-scale-x-100"
              />
            </Link>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass("secondary")}
              >
                {t("common.myResume")}{" "}
                <RiArrowRightUpLine
                  aria-hidden
                  className="inline-block size-4 rtl:-scale-x-100"
                />
                <span className="sr-only">{t("common.opensInNewTab")}</span>
              </a>
            )}
          </div>
        </div>

        <div className="relative pb-10 min-[1100px]:pe-6 min-[1100px]:pb-12">
          <div className="anim-rise" style={delay(0.4)}>
            <CodeEditor
              name={codeProfile.name}
              role={codeProfile.headline}
              location={codeProfile.location}
              years={years}
              phone={codeProfile.phone}
              email={profile.email}
              available={!!codeProfile.availability}
            />
          </div>

          <div
            aria-hidden="true"
            className="anim-bob border-hairline bg-surface shadow-float absolute end-3 top-3 flex items-center gap-3 rounded-lg border px-4 py-3 min-[1100px]:-end-4 sm:-end-2 sm:-top-5"
          >
            <span className="bg-tealsoft text-teal flex size-9 items-center justify-center rounded-md">
              <RiShieldCheckLine size={18} />
            </span>
            <span>
              <span className="block text-[13px]">{t("hero.testSuite")}</span>
              <span className="text-tealsoft-fg block text-[11px]">
                {t("hero.checksPassing")}
              </span>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="anim-bob-2 border-hairline bg-surface shadow-float absolute start-3 bottom-0 w-[min(260px,calc(100%-24px))] rounded-lg border p-4 min-[1100px]:-start-6 sm:-start-4"
          >
            <div className="flex items-center gap-3">
              <span className="bg-tealsoft text-teal flex size-9 items-center justify-center rounded-md">
                <RiRocketLine size={18} />
              </span>
              <span className="text-[13px]">{t("hero.deploying")}</span>
            </div>
            <div className="bg-track mt-3 h-1.5 overflow-hidden rounded-full">
              <div className="anim-deploy from-teal to-teal-light h-full rounded-full bg-linear-to-r" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
