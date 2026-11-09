import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiSteamFill,
  RiFileTextLine,
  RiMailLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { SOCIAL_LINKS } from "@/data/site-content";
import type { SocialIcon } from "@/data/site-content";
import type { Profile } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { Container, ctaClass } from "./ui";

// Brand colours, switched to lighter tints in dark mode so they stay legible.
const BRANDS: Record<SocialIcon, { Icon: typeof RiGithubFill; color: string }> =
  {
    linkedin: {
      Icon: RiLinkedinBoxFill,
      color: "text-[#0a66c2] dark:text-[#58a6e6]",
    },
    github: {
      Icon: RiGithubFill,
      color: "text-[#181717] dark:text-white",
    },
    steam: {
      Icon: RiSteamFill,
      color: "text-[#171a21] dark:text-[#66c0f4]",
    },
  };

const iconProps = { size: 18, "aria-hidden": true } as const;

export function ContactSection({
  profile,
  locale,
}: {
  profile: Profile;
  locale: Locale;
}) {
  const t = getT(locale);
  return (
    <section id="contact" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <div className="border-accentline from-feat-from to-feat-to relative overflow-hidden rounded-[10px] border bg-linear-[135deg] p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="anim-ring border-teal/40 absolute -end-24 -top-24 size-72 rounded-full border-2 border-dashed"
          />
          <div className="relative max-w-[640px]">
            <h2 className="text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
              {t("contact.title")}
            </h2>
            <p className="text-info-fg mt-5 text-[16px] leading-[1.7]">
              {t("contact.text")}
            </p>
          </div>
          <div className="relative mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className={ctaClass("primary", "large")}
            >
              <RiMailLine {...iconProps} />
              {profile.email}
            </a>
            {SOCIAL_LINKS.map((link) => {
              const { Icon, color } = BRANDS[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass("secondary", "large")}
                >
                  <Icon {...iconProps} className={color} />
                  {link.label}{" "}
                  <RiArrowRightUpLine
                    aria-hidden
                    className="inline-block size-4 rtl:-scale-x-100"
                  />
                  <span className="sr-only">{t("common.opensInNewTab")}</span>
                </a>
              );
            })}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download="Nauman-Qureshi-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass("secondary", "large")}
              >
                <RiFileTextLine {...iconProps} />
                {t("common.resume")}{" "}
                <RiArrowRightUpLine
                  aria-hidden
                  className="inline-block size-4 rtl:-scale-x-100"
                />
                <span className="sr-only">{t("common.opensInNewTab")}</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
