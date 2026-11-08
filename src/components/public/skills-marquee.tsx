import { groupSkills } from "@/data/site-content";
import type { Skill } from "@/data/types";
import { SkillPill } from "./skill-pill";

function Row({
  skills,
  reverse = false,
}: {
  skills: Skill[];
  reverse?: boolean;
}) {
  // Make sure one half of the track is wider than a typical screen, then
  // render it twice so the −50% loop is seamless.
  const repeats = Math.max(1, Math.ceil(16 / skills.length));
  const half = Array.from({ length: repeats }, () => skills).flat();

  return (
    <ul
      className={`${reverse ? "marquee-track-r" : "marquee-track"} flex w-max gap-2.5`}
    >
      {[0, 1].map((copy) =>
        half.map((skill, i) => (
          <li
            key={`${copy}-${i}`}
            aria-hidden={copy === 1 || undefined}
            className="shrink-0"
          >
            <SkillPill skill={skill} className="border-transparent" />
          </li>
        )),
      )}
    </ul>
  );
}

export function SkillsMarquee({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  const ordered = groupSkills(skills).flatMap(([, items]) => items);

  return (
    <section
      aria-label="Technologies"
      className="bg-band border-hairline marquee flex flex-col gap-2.5 overflow-hidden border-y py-5"
    >
      <Row skills={ordered} />
      <Row skills={[...ordered].reverse()} reverse />
    </section>
  );
}
