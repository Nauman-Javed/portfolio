"use server";

import { invalid, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { invalidate } from "@/lib/mutations";
import { emptyToNull, parseList } from "@/lib/validations/common";
import { profileSchema } from "@/lib/validations/profile";

export async function updateProfile(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  const v = parsed.data;

  const data = {
    name: v.name,
    headline: v.headline,
    summary: v.summary,
    about: v.about,
    location: emptyToNull(v.location),
    email: v.email,
    phone: emptyToNull(v.phone),
    resumeUrl: emptyToNull(v.resumeUrl),
    availability: emptyToNull(v.availability),
    heroLead: v.heroLead,
    heroPhrases: parseList(v.heroPhrases, /\r?\n/),
    name_ar: emptyToNull(v.name_ar),
    headline_ar: emptyToNull(v.headline_ar),
    summary_ar: emptyToNull(v.summary_ar),
    about_ar: emptyToNull(v.about_ar),
    location_ar: emptyToNull(v.location_ar),
    availability_ar: emptyToNull(v.availability_ar),
    heroLead_ar: emptyToNull(v.heroLead_ar),
    heroPhrases_ar: parseList(v.heroPhrases_ar, /\r?\n/),
  };

  await db.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", ...data },
  });

  invalidate("profile");
  return ok();
}
