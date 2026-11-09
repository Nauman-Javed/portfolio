import type { Locale } from "./config";

const isFilled = (value: unknown) =>
  Array.isArray(value)
    ? value.length > 0
    : typeof value === "string" && value.trim() !== "";

/**
 * Returns the row with each listed field swapped for its Arabic version
 * (`<field>_ar`) when the locale is Arabic and that version has been filled in.
 * Anything left empty keeps the English text, so a half-translated row still
 * renders completely.
 */
export function localize<T extends object>(
  row: T,
  locale: Locale,
  fields: readonly (keyof T & string)[],
): T {
  if (locale !== "ar") return row;

  const source = row as Record<string, unknown>;
  const result: Record<string, unknown> = { ...source };
  for (const field of fields) {
    const arabic = source[`${field}_ar`];
    if (isFilled(arabic)) result[field] = arabic;
  }
  return result as T;
}

export const PROFILE_FIELDS = [
  "name",
  "headline",
  "summary",
  "about",
  "location",
  "availability",
  "heroLead",
  "heroPhrases",
] as const;
export const PROJECT_FIELDS = [
  "title",
  "shortDescription",
  "description",
] as const;
export const EXPERIENCE_FIELDS = [
  "company",
  "role",
  "location",
  "bullets",
] as const;
export const EDUCATION_FIELDS = ["institution", "degree"] as const;
