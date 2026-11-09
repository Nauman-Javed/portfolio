import { z } from "zod";
import { optional, optionalUrl, required } from "./common";

export const HERO_PHRASES_MAX = 8;
// Longer phrases get clipped by the hero column, so keep them short.
export const HERO_PHRASE_MAX_LENGTH = 18;

const phraseLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const heroPhrasesField = optional(400)
  .refine(
    (v) => phraseLines(v).length <= HERO_PHRASES_MAX,
    `Use at most ${HERO_PHRASES_MAX} phrases`,
  )
  .refine(
    (v) =>
      phraseLines(v).every((line) => line.length <= HERO_PHRASE_MAX_LENGTH),
    `Each phrase must be ${HERO_PHRASE_MAX_LENGTH} characters or fewer`,
  );

export const profileSchema = z.object({
  name: required("Name", 100),
  headline: required("Headline", 150),
  summary: required("Summary", 500),
  about: required("About", 5000),
  location: optional(120),
  email: z.email("Enter a valid email").max(200),
  phone: optional(40),
  resumeUrl: optionalUrl,
  availability: optional(120),
  heroLead: optional(40),
  heroPhrases: heroPhrasesField,
  // Arabic versions (optional; the English text is shown when empty).
  name_ar: optional(100),
  headline_ar: optional(150),
  summary_ar: optional(500),
  about_ar: optional(5000),
  location_ar: optional(120),
  availability_ar: optional(120),
  heroLead_ar: optional(40),
  heroPhrases_ar: heroPhrasesField,
});

export type ProfileInput = z.infer<typeof profileSchema>;
