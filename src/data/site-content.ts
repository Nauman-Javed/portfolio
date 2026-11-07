// Copy that isn't stored in the database. Edit here to change it.

/**
 * The line that slides under "I engineer" in the hero. Keep each phrase to
 * about 16 characters or it will be clipped in the two-column hero.
 */
export const ROTATING_PHRASES = [
  "fast interfaces",
  "accessible UIs",
  "type-safe apps",
  "things that ship",
] as const;

/** Two-letter mark for a skill tile, e.g. "TypeScript" → "TS", "React" → "Re". */
export function abbreviation(name: string) {
  const words = name.split(/[\s.\-/]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();

  const capitals = name.match(/[A-Z]/g);
  if (capitals && capitals.length >= 2) return capitals.slice(0, 2).join("");

  return name.charAt(0).toUpperCase() + name.charAt(1).toLowerCase();
}
