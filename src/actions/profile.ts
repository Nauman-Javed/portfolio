"use server";

import { invalid, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { deleteAssets } from "@/lib/cloudinary";
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
    imageUrl: emptyToNull(v.imageUrl),
    imagePublicId: emptyToNull(v.imagePublicId),
    resumeUrl: emptyToNull(v.resumeUrl),
    availability: emptyToNull(v.availability),
    heroLead: v.heroLead,
    heroPhrases: parseList(v.heroPhrases, /\r?\n/),
  };

  const existing = await db.profile.findUnique({
    where: { id: "profile" },
    select: { imagePublicId: true },
  });

  await db.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", ...data },
  });

  // Drop the previous profile image from Cloudinary once it is replaced.
  if (
    existing?.imagePublicId &&
    existing.imagePublicId !== data.imagePublicId
  ) {
    await deleteAssets([existing.imagePublicId]);
  }
  invalidate("profile");
  return ok();
}
