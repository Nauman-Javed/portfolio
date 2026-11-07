import type { Education, Experience } from "@/data/types";
import { Reveal } from "./reveal";
import { Container, SectionHeader } from "./ui";

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function pillClass(type: string) {
  if (type === "Full-time") return "bg-tealsoft text-tealsoft-fg";
  if (type === "Part-time") return "bg-warnsoft text-warn-fg";
  return "bg-chip text-fg2";
}

const delay = (seconds: number) =>
  ({ "--d": `${seconds}s` }) as React.CSSProperties;

export function ExperienceSection({
  experience,
  education,
}: {
  experience: Experience[];
  education: Education[];
}) {
  const items = [...experience].sort((a, b) => a.order - b.order);
  const last = Math.max(items.length - 1, 1);

  return (
    <section id="experience" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <SectionHeader eyebrow="Experience" title="Where I’ve worked" />

        <Reveal>
          <ol className="relative max-w-[860px] space-y-5 pl-9">
            <span
              aria-hidden
              className="bg-track absolute top-0 bottom-0 left-[7px] w-0.5 overflow-hidden"
            >
              <span className="anim-rail bg-teal absolute inset-0" />
            </span>
            <span
              aria-hidden
              className="absolute top-0 bottom-0 left-[7px] w-0.5"
            >
              <span className="anim-glow bg-teal-light absolute left-1/2 size-2 -translate-x-1/2 rounded-full shadow-[0_0_12px_2px_var(--ds-accent)]" />
            </span>

            {items.map((job, i) => {
              const current = job.endDate === null;
              return (
                <li key={job.id} className="relative">
                  <span
                    aria-hidden
                    className={`absolute top-7 -left-9 size-4 rounded-full ${
                      current
                        ? "anim-pulse bg-teal"
                        : "anim-pop border-teal bg-canvas border-2"
                    }`}
                    style={delay(0.3 + 2.6 * (i / last))}
                  />
                  <article
                    className={`lift anim-rise bg-surface rounded-lg border p-[22px] ${
                      current ? "border-accentline" : "border-hairline"
                    }`}
                    style={delay(0.25 + i * 0.3)}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div>
                        <h3 className="text-xl leading-[1.3]">{job.company}</h3>
                        <p className="text-teal mt-1 text-[15px]">{job.role}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-fg3 text-xs">
                          {monthYear.format(job.startDate)} –{" "}
                          {job.endDate
                            ? monthYear.format(job.endDate)
                            : "Present"}
                          {job.location && ` · ${job.location}`}
                        </p>
                        <span
                          className={`mt-2 inline-block rounded-full px-3 py-1 text-[11px] leading-[1.4] ${pillClass(job.employmentType)}`}
                        >
                          {job.employmentType}
                        </span>
                      </div>
                    </div>
                    {job.bullets.length > 0 && (
                      <ul className="text-fg2 mt-4 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.65]">
                        {job.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {education.length > 0 && (
          <div className="mt-12 max-w-[860px]">
            <h3 className="text-fg2 mb-4 text-[11px] tracking-[0.14em] uppercase">
              Education
            </h3>
            <ul className="grid gap-5 sm:grid-cols-2">
              {education.map((e) => (
                <li
                  key={e.id}
                  className="lift border-hairline bg-surface rounded-lg border p-[22px]"
                >
                  <p className="text-[17px] leading-[1.35]">{e.degree}</p>
                  <p className="text-fg2 mt-1 text-[14px]">{e.institution}</p>
                  <p className="text-fg3 mt-2 text-xs">
                    {e.startYear} – {e.endYear ?? "Present"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
