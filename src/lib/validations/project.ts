import { z } from "zod";
import { imageSource, optional, optionalUrl, required } from "./common";

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(80, "Max 80 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens",
    ),
  title: required("Title", 120),
  shortDescription: required("Short description", 300),
  description: required("Description", 10000),
  techStack: optional(1000),
  coverImageUrl: imageSource.refine((v) => v !== "", "Cover image is required"),
  coverImageId: optional(300),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  featured: z.boolean(),
  published: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
