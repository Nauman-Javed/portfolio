import { abbreviation } from "@/data/site-content";
import type { Skill } from "@/data/types";

function Item({ name, hidden }: { name: string; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="border-hairline bg-surface flex shrink-0 items-center gap-3 rounded-lg border py-2 pr-5 pl-2"
    >
      <span
        aria-hidden
        className="bg-raised text-teal flex size-10 items-center justify-center rounded-md font-mono text-[13px]"
      >
        {abbreviation(name)}
      </span>
      <span className="text-[14px] whitespace-nowrap">{name}</span>
    </li>
  );
}

function Row({
  skills,
  reverse = false,
}: {
  skills: Skill[];
  reverse?: boolean;
}) {
  // Make sure one half of the track is wider than a typical screen, then
  // render it twice so the −50% loop is seamless.
  const repeats = Math.max(1, Math.ceil(10 / skills.length));
  const half = Array.from({ length: repeats }, () => skills).flat();

  return (
    <ul
      className={`${reverse ? "marquee-track-r" : "marquee-track"} flex w-max gap-3`}
    >
      {[0, 1].map((copy) =>
        half.map((skill, i) => (
          <Item key={`${copy}-${i}`} name={skill.name} hidden={copy === 1} />
        )),
      )}
    </ul>
  );
}

export function SkillsMarquee({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <section
      aria-label="Technologies"
      className="bg-band border-hairline marquee flex flex-col gap-3 overflow-hidden border-y py-6"
    >
      <Row skills={skills} />
      <Row skills={[...skills].reverse()} reverse />
    </section>
  );
}
