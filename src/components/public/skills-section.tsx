import {
  IconBrowser,
  IconCloud,
  IconCode,
  IconDatabase,
  IconGitBranch,
  IconServer,
  IconTool,
} from "@tabler/icons-react";
import { groupSkills } from "@/data/site-content";
import type { Skill } from "@/data/types";
import { SkillIcon } from "./skill-icon";
import { Container, SectionHeader } from "./ui";

function iconFor(category: string) {
  if (/version|git/i.test(category)) return IconGitBranch;
  if (/cloud|devops|deploy/i.test(category)) return IconCloud;
  if (/back|server|api/i.test(category)) return IconServer;
  if (/data|db/i.test(category)) return IconDatabase;
  if (/front|framework|ui/i.test(category)) return IconBrowser;
  if (/tool|practice/i.test(category)) return IconTool;
  return IconCode;
}

export function SkillsSection({ skills }: { skills: Skill[] }) {
  // Two columns, filled left to right in display order: Frontend | Backend,
  // Databases | Version control, then Tools & practices on its own row.
  const groups = groupSkills(skills);

  return (
    <section id="skills" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <SectionHeader eyebrow="Skills" title="Skills by stack" />
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map(([category, items]) => {
            const Icon = iconFor(category);
            return (
              <article
                key={category}
                className="lift border-hairline bg-surface rounded-lg border p-[22px]"
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
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {items.map((skill) => (
                    <li
                      key={skill.id}
                      className="chip-lift bg-raised border-hairline flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-2"
                    >
                      <SkillIcon
                        name={skill.name}
                        iconUrl={skill.iconUrl}
                        size={24}
                      />
                      <span className="text-[14px]">{skill.name}</span>
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
