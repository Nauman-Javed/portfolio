"use server";

import { z } from "zod";
import { fail, invalid, isNotFound, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { invalidate, moveId } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { skillSchema } from "@/lib/validations/resume";

const idSchema = z.string().min(1);

export async function createSkill(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const last = await db.skill.findFirst({
    where: { category: parsed.data.category },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await db.skill.create({
    data: { ...parsed.data, order: (last?.order ?? -1) + 1 },
  });
  invalidate("skills");
  return ok();
}

export async function updateSkill(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid skill.");
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.skill.update({ where: { id }, data: parsed.data });
  } catch (error) {
    if (isNotFound(error)) return fail("That skill no longer exists.");
    throw error;
  }
  invalidate("skills");
  return ok();
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid skill.");

  await db.skill.deleteMany({ where: { id } });
  invalidate("skills");
  return ok();
}

// Skills are ordered within their category, so a move only swaps neighbours
// that share the category.
export async function moveSkill(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid skill.");

  const skill = await db.skill.findUnique({
    where: { id },
    select: { category: true },
  });
  if (!skill) return fail("That skill no longer exists.");

  const rows = await db.skill.findMany({
    where: { category: skill.category },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: { id: true },
  });
  const next = moveId(
    rows.map((r) => r.id),
    id,
    direction,
  );
  if (!next) return fail("Can't move that item.");

  await db.$transaction(
    next.map((skillId, order) =>
      db.skill.update({ where: { id: skillId }, data: { order } }),
    ),
  );
  invalidate("skills");
  return ok();
}
