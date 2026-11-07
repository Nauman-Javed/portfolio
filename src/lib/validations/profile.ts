import { z } from "zod";
import { imageSource, optional, optionalUrl, required } from "./common";

export const profileSchema = z.object({
  name: required("Name", 100),
  headline: required("Headline", 150),
  summary: required("Summary", 500),
  about: required("About", 5000),
  location: optional(120),
  email: z.email("Enter a valid email").max(200),
  phone: optional(40),
  imageUrl: imageSource,
  imagePublicId: optional(300),
  resumeUrl: optionalUrl,
  availability: optional(120),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const socialLinkSchema = z.object({
  label: required("Label", 60),
  url: optionalUrl.refine((v) => v !== "", "URL is required"),
});

export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
