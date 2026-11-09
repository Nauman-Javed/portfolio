import {
  RiWindowLine,
  RiCloudLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiGitBranchLine,
  RiServerLine,
  RiToolsLine,
} from "react-icons/ri";
import { groupSkills } from "@/data/site-content";
import type { Skill } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { SkillPill } from "./skill-pill";
import { Container, SectionHeader } from "./ui";

function iconFor(category: string) {
  if (/version|git/i.test(category)) return RiGitBranchLine;
  if (/cloud|devops|deploy/i.test(category)) return RiCloudLine;
  if (/back|server|api/i.test(category)) return RiServerLine;
  if (/data|db/i.test(category)) return RiDatabase2Line;
  if (/front|framework|ui/i.test(category)) return RiWindowLine;
  if (/tool|practice/i.test(category)) return RiToolsLine;
  return RiCodeSSlashLine;
}

// Groups are keyed by the English category (it drives ordering and icons);
// the Arabic name comes from any skill in the group that has one.
function categoryLabel(category: string, items: Skill[], locale: Locale) {
  if (locale !== "ar") return category;
  return items.find((s) => s.category_ar?.trim())?.category_ar ?? category;
}

export function SkillsSection({
  skills,
  locale,
}: {
  skills: Skill[];
  locale: Locale;
}) {
  const t = getT(locale);
  // Two columns, filled left to right in display order: Frontend | Backend,
  // Databases | Version control, then Tools & practices on its own row.
  const groups = groupSkills(skills);

  return (
    <section id="skills" className="scroll-mt-16 pt-24 sm:pt-28">
      <Container>
        <SectionHeader title={t("skills.title")} />
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
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[17px] leading-[1.35]">
                      {categoryLabel(category, items, locale)}
                    </h3>
                    <p className="text-fg3 text-xs">
                      {t("skills.count", { count: items.length })}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li key={skill.id}>
                      <SkillPill skill={skill} className="chip-lift" />
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
