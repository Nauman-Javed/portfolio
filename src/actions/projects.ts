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
import { deleteAssets } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { setOrders } from "@/lib/reorder";
import { invalidate, planReorder } from "@/lib/mutations";
import type { MoveDirection } from "@/lib/mutations";
import { emptyToNull, parseList } from "@/lib/validations/common";
import { projectSchema } from "@/lib/validations/project";
import type { ProjectInput } from "@/lib/validations/project";

const idSchema = z.string().min(1);

const SLUG_TAKEN = { slug: ["That slug is already used by another project."] };

function toData({ gallery: _gallery, ...v }: ProjectInput) {
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

const toGalleryRows = (gallery: ProjectInput["gallery"]) =>
  gallery.map((image, order) => ({
    url: image.url,
    publicId: image.publicId,
    order,
  }));

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
      data: {
        ...toData(parsed.data),
        order: (last?.order ?? -1) + 1,
        gallery: { create: toGalleryRows(parsed.data.gallery) },
      },
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
    select: {
      slug: true,
      coverImageId: true,
      gallery: { select: { publicId: true } },
    },
  });
  if (!existing) return fail("That project no longer exists.");

  try {
    await db.$transaction([
      db.project.update({ where: { id }, data: toData(parsed.data) }),
      db.projectImage.deleteMany({ where: { projectId: id } }),
      db.projectImage.createMany({
        data: toGalleryRows(parsed.data.gallery).map((row) => ({
          ...row,
          projectId: id,
        })),
      }),
    ]);
  } catch (error) {
    if (isUniqueViolation(error))
      return fail("Slug already in use.", SLUG_TAKEN);
    throw error;
  }

  // Only after the database change succeeded: drop images that are no longer
  // referenced (a replaced cover, removed gallery images).
  const keep = new Set([
    parsed.data.coverImageId,
    ...parsed.data.gallery.map((g) => g.publicId),
  ]);
  await deleteAssets(
    [existing.coverImageId, ...existing.gallery.map((g) => g.publicId)].filter(
      (publicId) => !keep.has(publicId),
    ),
  );

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
    select: {
      slug: true,
      coverImageId: true,
      gallery: { select: { publicId: true } },
    },
  });
  if (!project) return ok();

  await db.project.delete({ where: { id } });
  await deleteAssets([
    project.coverImageId,
    ...project.gallery.map((g) => g.publicId),
  ]);
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
    select: { id: true, order: true },
  });
  const updates = planReorder(rows, id, direction);
  if (!updates) return fail("Can't move that item.");

  await setOrders("Project", updates);
  invalidate("projects");
  return ok();
}
