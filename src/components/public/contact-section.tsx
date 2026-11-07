import type { Profile } from "@/data/types";
import { Container, ctaClass } from "./ui";

type Link = { id: string; label: string; url: string };

export function ContactSection({
  profile,
  links,
}: {
  profile: Profile;
  links: Link[];
}) {
  return (
    <section id="contact" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <div className="border-accentline from-feat-from to-feat-to relative overflow-hidden rounded-[10px] border bg-linear-[135deg] p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="anim-ring border-teal/40 absolute -top-24 -right-24 size-72 rounded-full border-2 border-dashed"
          />
          <div className="relative max-w-[640px]">
            <h2 className="text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
              Let’s build something together
            </h2>
            <p className="text-info-fg mt-5 text-[16px] leading-[1.7]">
              Have a role or a project in mind? Send me a message and I’ll get
              back to you.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className={ctaClass("primary", "large")}
              >
                {profile.email}
              </a>
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass("secondary", "large")}
                >
                  {link.label} <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass("secondary", "large")}
                >
                  Résumé <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
