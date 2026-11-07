import {
  IconBrowser,
  IconCloud,
  IconCode,
  IconDatabase,
  IconServer,
  IconTool,
} from "@tabler/icons-react";
import { abbreviation } from "@/data/site-content";
import type { Skill } from "@/data/types";
import { Container, SectionHeader } from "./ui";

function iconFor(category: string) {
  if (/cloud|devops|deploy/i.test(category)) return IconCloud;
  if (/data|db/i.test(category)) return IconDatabase;
  if (/back|server|api/i.test(category)) return IconServer;
  if (/front|framework|ui/i.test(category)) return IconBrowser;
  if (/tool|practice/i.test(category)) return IconTool;
  return IconCode;
}

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const groups = new Map<string, Skill[]>();
  for (const skill of [...skills].sort((a, b) => a.order - b.order)) {
    groups.set(skill.category, [...(groups.get(skill.category) ?? []), skill]);
  }

  // With an odd number of regular cards the last one would sit alone, so let it
  // span the row.
  const regular = [...groups.keys()].filter((c) => !/tool|practice/i.test(c));
  const orphan = regular.length % 2 === 1 ? regular[regular.length - 1] : null;

  return (
    <section id="skills" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <SectionHeader eyebrow="Skills" title="Skills by stack" />
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))] gap-5">
          {[...groups].map(([category, items]) => {
            const Icon = iconFor(category);
            const wide = /tool|practice/i.test(category) || category === orphan;
            return (
              <article
                key={category}
                className={`lift border-hairline bg-surface rounded-lg border p-[22px] ${wide ? "[grid-column:1/-1]" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <span className="bg-tealsoft text-teal flex size-11 shrink-0 items-center justify-center rounded-lg">
                    <Icon size={20} stroke={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[17px] leading-[1.35]">{category}</h3>
                    <p className="text-fg3 text-xs">
                      {items.length} {items.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li
                      key={skill.id}
                      className="chip-lift bg-raised border-hairline flex items-center gap-2.5 rounded-md border py-1 pr-3 pl-1"
                    >
                      <span
                        aria-hidden
                        className="bg-chip text-teal flex size-[30px] items-center justify-center rounded-[5px] font-mono text-[11px]"
                      >
                        {abbreviation(skill.name)}
                      </span>
                      <span className="text-[13px]">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
