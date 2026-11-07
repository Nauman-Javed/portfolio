"use server";

import { z } from "zod";
import { fail, invalid, isNotFound, ok } from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { invalidate, moveId } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { emptyToNull, toUtcDate } from "@/lib/validations/common";
import { certificationSchema } from "@/lib/validations/resume";
import type { CertificationInput } from "@/lib/validations/resume";

const idSchema = z.string().min(1);

function toData(v: CertificationInput) {
  return {
    name: v.name,
    issuer: v.issuer,
    date: v.date ? toUtcDate(v.date) : null,
    url: emptyToNull(v.url),
  };
}

export async function createCertification(
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = certificationSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const last = await db.certification.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await db.certification.create({
    data: { ...toData(parsed.data), order: (last?.order ?? -1) + 1 },
  });
  invalidate("certifications");
  return ok();
}

export async function updateCertification(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");
  const parsed = certificationSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.certification.update({ where: { id }, data: toData(parsed.data) });
  } catch (error) {
    if (isNotFound(error)) return fail("That entry no longer exists.");
    throw error;
  }
  invalidate("certifications");
  return ok();
}

export async function deleteCertification(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");

  await db.certification.deleteMany({ where: { id } });
  invalidate("certifications");
  return ok();
}

export async function moveCertification(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid entry.");

  const rows = await db.certification.findMany({
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
    next.map((entryId, order) =>
      db.certification.update({ where: { id: entryId }, data: { order } }),
    ),
  );
  invalidate("certifications");
  return ok();
}
