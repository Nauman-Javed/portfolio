import type { Skill } from "@/data/types";
import { cn } from "@/lib/utils";
import { SkillIcon } from "./skill-icon";

/**
 * A skill as a bordered pill: its icon (or a two-letter mark) and its name.
 * Used by the skill cards and the sliding rows so both always match.
 */
export function SkillPill({
  skill,
  className,
}: {
  skill: Pick<Skill, "name" | "iconUrl">;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-raised border-hairline inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-1.5 text-[13px] leading-none whitespace-nowrap",
        className,
      )}
    >
      <SkillIcon name={skill.name} iconUrl={skill.iconUrl} size={20} />
      {skill.name}
    </span>
  );
}
