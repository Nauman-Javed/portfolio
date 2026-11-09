"use server";

import { z } from "zod";
import { fail, invalid, isNotFound, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { emptyToNull } from "@/lib/validations/common";
import { db } from "@/lib/db";
import { setOrders } from "@/lib/reorder";
import { invalidate, planReorder } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { educationSchema } from "@/lib/validations/resume";
import type { EducationInput } from "@/lib/validations/resume";

const idSchema = z.string().min(1);

function toData(v: EducationInput) {
  return {
    institution: v.institution,
    degree: v.degree,
    institution_ar: emptyToNull(v.institution_ar),
    degree_ar: emptyToNull(v.degree_ar),
    startYear: Number(v.startYear),
    endYear: v.endYear ? Number(v.endYear) : null,
  };
}

export async function createEducation(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = educationSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const last = await db.education.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await db.education.create({
    data: { ...toData(parsed.data), order: (last?.order ?? -1) + 1 },
  });
  invalidate("education");
  return ok();
}

export async function updateEducation(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");
  const parsed = educationSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.education.update({ where: { id }, data: toData(parsed.data) });
  } catch (error) {
    if (isNotFound(error)) return fail("That entry no longer exists.");
    throw error;
  }
  invalidate("education");
  return ok();
}

export async function deleteEducation(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");

  await db.education.deleteMany({ where: { id } });
  invalidate("education");
  return ok();
}

export async function moveEducation(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");

  const rows = await db.education.findMany({
    orderBy: [{ order: "asc" }, { startYear: "desc" }],
    select: { id: true, order: true },
  });
  const updates = planReorder(rows, id, direction);
  if (!updates) return fail("Can't move that item.");

  await setOrders("Education", updates);
  invalidate("education");
  return ok();
}
