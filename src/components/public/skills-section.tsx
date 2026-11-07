import type { Skill } from "@/data/types";
import { Section } from "./section";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const byCategory = new Map<string, Skill[]>();
  for (const s of [...skills].sort((a, b) => a.order - b.order)) {
    byCategory.set(s.category, [...(byCategory.get(s.category) ?? []), s]);
  }

  return (
    <Section
      id="skills"
      label="02 — Skills"
      title="The tools I reach for every day."
    >
      <div className="grid gap-10 sm:grid-cols-2">
        {[...byCategory].map(([category, items]) => (
          <div key={category}>
            <h3 className="text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li
                  key={s.id}
                  className="border-border bg-card hover:border-brand rounded-full border px-4 py-1.5 text-sm transition-colors"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
