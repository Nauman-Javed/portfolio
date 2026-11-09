import { z } from "zod";
import {
  dateString,
  optional,
  optionalDate,
  imageSource,
  required,
} from "./common";

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export const experienceSchema = z
  .object({
    company: required("Company", 150),
    role: required("Role", 150),
    employmentType: z.enum(EMPLOYMENT_TYPES),
    location: optional(120),
    startDate: dateString,
    endDate: optionalDate,
    bullets: optional(4000),
    company_ar: optional(150),
    role_ar: optional(150),
    location_ar: optional(120),
    bullets_ar: optional(4000),
  })
  .refine((v) => v.endDate === "" || v.endDate >= v.startDate, {
    message: "End date can't be before the start date",
    path: ["endDate"],
  });

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const skillSchema = z.object({
  name: required("Name", 60),
  category: required("Category", 60),
  category_ar: optional(60),
  iconUrl: imageSource,
  iconPublicId: optional(300),
});

export type SkillInput = z.infer<typeof skillSchema>;

const year = z
  .string()
  .trim()
  .regex(/^\d{4}$/, "Enter a 4-digit year");

export const educationSchema = z
  .object({
    institution: required("Institution", 200),
    degree: required("Degree", 200),
    institution_ar: optional(200),
    degree_ar: optional(200),
    startYear: year,
    endYear: z
      .string()
      .trim()
      .regex(/^(\d{4})?$/, "Enter a 4-digit year or leave empty"),
  })
  .refine((v) => v.endYear === "" || v.endYear >= v.startYear, {
    message: "End year can't be before the start year",
    path: ["endYear"],
  });

export type EducationInput = z.infer<typeof educationSchema>;
