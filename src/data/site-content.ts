// Small helpers for site copy. The hero headline and rotating phrases are
// stored on the profile and edited in the admin.

/** Two-letter mark for a skill tile, e.g. "TypeScript" → "TS", "React" → "Re". */
export function abbreviation(name: string) {
  const words = name.split(/[\s.\-/]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();

  const capitals = name.match(/[A-Z]/g);
  if (capitals && capitals.length >= 2) return capitals.slice(0, 2).join("");

  return name.charAt(0).toUpperCase() + name.charAt(1).toLowerCase();
}

// Display order for skill categories on the home page. A category is placed by
// the first pattern it matches, so "Frontend" and "Front-end" both come first.
// Categories that match nothing follow, alphabetically.
const CATEGORY_ORDER = [
  /front/i,
  /back/i,
  /data|db/i,
  /version|git/i,
  /tool|practice/i,
];

function categoryRank(category: string) {
  const index = CATEGORY_ORDER.findIndex((pattern) => pattern.test(category));
  return index === -1 ? CATEGORY_ORDER.length : index;
}

/** Skills grouped by category in display order; items keep their saved order. */
export function groupSkills<T extends { category: string; order: number }>(
  skills: T[],
): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const skill of [...skills].sort((a, b) => a.order - b.order)) {
    groups.set(skill.category, [...(groups.get(skill.category) ?? []), skill]);
  }
  return [...groups].sort(
    ([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b),
  );
}

export type SocialIcon = "linkedin" | "github" | "steam";

/** Profile links shown in the Contact section. Edit here to change them. */
export const SOCIAL_LINKS: { label: string; url: string; icon: SocialIcon }[] =
  [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/nauman-javed-268162210/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      url: "https://github.com/Nauman-Javed",
      icon: "github",
    },
    {
      label: "Steam",
      url: "https://steamcommunity.com/id/H3adShOt_841/",
      icon: "steam",
    },
  ];
