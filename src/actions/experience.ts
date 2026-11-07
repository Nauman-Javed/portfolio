"use server";

import { z } from "zod";
import { fail, invalid, isNotFound, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { invalidate, moveId } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { emptyToNull, parseList, toUtcDate } from "@/lib/validations/common";
import { experienceSchema } from "@/lib/validations/resume";
import type { ExperienceInput } from "@/lib/validations/resume";

const idSchema = z.string().min(1);

function toData(v: ExperienceInput) {
  return {
    company: v.company,
    role: v.role,
    employmentType: v.employmentType,
    location: emptyToNull(v.location),
    startDate: toUtcDate(v.startDate),
    endDate: v.endDate ? toUtcDate(v.endDate) : null,
    bullets: parseList(v.bullets, /\r?\n/),
  };
}

export async function createExperience(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const last = await db.experience.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await db.experience.create({
    data: { ...toData(parsed.data), order: (last?.order ?? -1) + 1 },
  });
  invalidate("experience");
  return ok();
}

export async function updateExperience(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.experience.update({ where: { id }, data: toData(parsed.data) });
  } catch (error) {
    if (isNotFound(error)) return fail("That entry no longer exists.");
    throw error;
  }
  invalidate("experience");
  return ok();
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");

  await db.experience.deleteMany({ where: { id } });
  invalidate("experience");
  return ok();
}

export async function moveExperience(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");

  const rows = await db.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
    select: { id: true },
  });
  const next = moveId(
    rows.map((r) => r.id),
    id,
    direction,
  );
  if (!next) return fail("Can't move that item.");

  await db.$transaction(
    next.map((entryId, order) =>
      db.experience.update({ where: { id: entryId }, data: { order } }),
    ),
  );
  invalidate("experience");
  return ok();
}
