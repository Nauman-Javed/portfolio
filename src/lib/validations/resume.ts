import { z } from "zod";
import {
  dateString,
  optional,
  optionalDate,
  optionalUrl,
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
  })
  .refine((v) => v.endDate === "" || v.endDate >= v.startDate, {
    message: "End date can't be before the start date",
    path: ["endDate"],
  });

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const skillSchema = z.object({
  name: required("Name", 60),
  category: required("Category", 60),
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

export const certificationSchema = z.object({
  name: required("Name", 200),
  issuer: required("Issuer", 200),
  date: optionalDate,
  url: optionalUrl,
});

export type CertificationInput = z.infer<typeof certificationSchema>;
