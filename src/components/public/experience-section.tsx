import type { Experience } from "@/data/types";
import { Section } from "./section";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  return (
    <Section
      id="experience"
      label="03 — Experience"
      title="Where I’ve been working."
    >
      <ol className="border-border relative space-y-10 border-l">
        {[...experience]
          .sort((a, b) => a.order - b.order)
          .map((e) => (
            <li key={e.id} className="relative pl-8">
              <span
                aria-hidden
                className="bg-brand ring-background absolute top-2 -left-[5px] size-2.5 rounded-full ring-4"
              />
              <p className="text-muted-foreground font-mono text-xs">
                {fmt.format(e.startDate)} –{" "}
                {e.endDate ? fmt.format(e.endDate) : "Present"}
              </p>
              <h3 className="font-display mt-1 text-2xl">{e.role}</h3>
              <p className="text-muted-foreground mt-1">
                {e.company}
                {e.location && ` · ${e.location}`}
              </p>
              <span className="bg-muted mt-3 inline-block rounded-full px-3 py-1 font-mono text-xs">
                {e.employmentType}
              </span>
              {e.bullets.length > 0 && (
                <ul className="text-muted-foreground mt-4 list-disc space-y-1 pl-5">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ol>
    </Section>
  );
}
