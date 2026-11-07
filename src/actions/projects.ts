"use server";

import { z } from "zod";
import {
  fail,
  invalid,
  isNotFound,
  isUniqueViolation,
  ok,
} from "@/lib/action-result";
import type { ActionResult } from "@/lib/action-result";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { invalidate, moveId } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { emptyToNull, parseList } from "@/lib/validations/common";
import { projectSchema } from "@/lib/validations/project";
import type { ProjectInput } from "@/lib/validations/project";

const idSchema = z.string().min(1);

const SLUG_TAKEN = { slug: ["That slug is already used by another project."] };

function toData(v: ProjectInput) {
  return {
    slug: v.slug,
    title: v.title,
    shortDescription: v.shortDescription,
    description: v.description,
    techStack: parseList(v.techStack, /,/),
    coverImageUrl: v.coverImageUrl,
    coverImageId: v.coverImageId,
    liveUrl: emptyToNull(v.liveUrl),
    githubUrl: emptyToNull(v.githubUrl),
    featured: v.featured,
    published: v.published,
  };
}

export async function createProject(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const last = await db.project.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  try {
    const project = await db.project.create({
      data: { ...toData(parsed.data), order: (last?.order ?? -1) + 1 },
      select: { id: true, slug: true },
    });
    invalidate("projects", `project:${project.slug}`);
    return ok({ id: project.id });
  } catch (error) {
    if (isUniqueViolation(error))
      return fail("Slug already in use.", SLUG_TAKEN);
    throw error;
  }
}

export async function updateProject(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid project.");
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const existing = await db.project.findUnique({
    where: { id },
    select: { slug: true },
  });
  if (!existing) return fail("That project no longer exists.");

  try {
    await db.project.update({ where: { id }, data: toData(parsed.data) });
  } catch (error) {
    if (isUniqueViolation(error))
      return fail("Slug already in use.", SLUG_TAKEN);
    throw error;
  }
  invalidate(
    "projects",
    `project:${existing.slug}`,
    `project:${parsed.data.slug}`,
  );
  return ok();
}

export async function setProjectFlag(
  id: string,
  flag: "featured" | "published",
  value: boolean,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid project.");
  if (flag !== "featured" && flag !== "published") return fail("Invalid flag.");

  try {
    const project = await db.project.update({
      where: { id },
      data: { [flag]: Boolean(value) },
      select: { slug: true },
    });
    invalidate("projects", `project:${project.slug}`);
    return ok();
  } catch (error) {
    if (isNotFound(error)) return fail("That project no longer exists.");
    throw error;
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid project.");

  const project = await db.project.findUnique({
    where: { id },
    select: { slug: true },
  });
  if (!project) return ok();

  await db.project.delete({ where: { id } });
  invalidate("projects", `project:${project.slug}`);
  return ok();
}

export async function moveProject(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return fail("Invalid project.");

  const rows = await db.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  const next = moveId(
    rows.map((r) => r.id),
    id,
    direction,
  );
  if (!next) return fail("Can't move that item.");

  await db.$transaction(
    next.map((projectId, order) =>
      db.project.update({ where: { id: projectId }, data: { order } }),
    ),
  );
  invalidate("projects");
  return ok();
}
