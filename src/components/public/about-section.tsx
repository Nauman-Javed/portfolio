import type { Profile } from "@/data/types";
import { Container, SectionHeader } from "./ui";

type Stats = { years: number; projects: number; skills: number };

export function AboutSection({
  profile,
  stats,
}: {
  profile: Profile;
  stats: Stats;
}) {
  const paragraphs = profile.about
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const statItems = [
    stats.years > 0 && {
      value: `${stats.years}+`,
      label: "Years of experience",
    },
    stats.projects > 0 && {
      value: String(stats.projects),
      label: "Projects shipped",
    },
    stats.skills > 0 && { value: String(stats.skills), label: "Technologies" },
  ].filter(Boolean) as { value: string; label: string }[];

  if (paragraphs.length === 0 && statItems.length === 0) return null;

  return (
    <section id="about" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <SectionHeader title="About me" />
        <div
          className={`grid items-start gap-10 ${
            statItems.length > 0 && paragraphs.length > 0
              ? "lg:grid-cols-[1.4fr_1fr]"
              : ""
          }`}
        >
          {paragraphs.length > 0 && (
            <div className="text-fg2 max-w-[44rem] space-y-5 text-[16px] leading-[1.7] sm:text-[18px]">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
          {statItems.length > 0 && (
            <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {statItems.map((s) => (
                <div
                  key={s.label}
                  className="lift border-hairline bg-surface flex flex-col-reverse rounded-lg border p-[22px]"
                >
                  <dt className="text-fg3 text-xs">{s.label}</dt>
                  <dd className="text-[28px] leading-[1.25]">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}
