"use server";

import { z } from "zod";
import { fail, invalid, isNotFound, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { deleteAssets } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { invalidate, moveId } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { emptyToNull, parseList } from "@/lib/validations/common";
import { profileSchema, socialLinkSchema } from "@/lib/validations/profile";

const idSchema = z.string().min(1);

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

export async function createSocialLink(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = socialLinkSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const last = await db.socialLink.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await db.socialLink.create({
    data: { ...parsed.data, order: (last?.order ?? -1) + 1 },
  });
  invalidate("social-links");
  return ok();
}

export async function updateSocialLink(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const parsedId = idSchema.safeParse(id);
  const parsed = socialLinkSchema.safeParse(input);
  if (!parsedId.success) return fail("Invalid link.");
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.socialLink.update({ where: { id }, data: parsed.data });
  } catch (error) {
    if (isNotFound(error)) return fail("That link no longer exists.");
    throw error;
  }
  invalidate("social-links");
  return ok();
}

export async function deleteSocialLink(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid link.");

  await db.socialLink.deleteMany({ where: { id } });
  invalidate("social-links");
  return ok();
}

export async function moveSocialLink(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid link.");

  const rows = await db.socialLink.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
    select: { id: true },
  });
  const next = moveId(
    rows.map((r) => r.id),
    id,
    direction,
  );
  if (!next) return fail("Can't move that item.");

  await db.$transaction(
    next.map((linkId, order) =>
      db.socialLink.update({ where: { id: linkId }, data: { order } }),
    ),
  );
  invalidate("social-links");
  return ok();
}
