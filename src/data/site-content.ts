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
