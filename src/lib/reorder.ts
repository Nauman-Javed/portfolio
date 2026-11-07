import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";

type OrderedTable =
  "Project" | "Experience" | "Skill" | "Education" | "Certification";

/**
 * Writes new `order` values for a few rows in one statement (one round trip).
 * Reordering used to update every row in a list one query at a time, which cost
 * about 110 ms per row against the hosted database.
 */
export async function setOrders(
  table: OrderedTable,
  updates: { id: string; order: number }[],
) {
  if (updates.length === 0) return;

  const values = Prisma.join(
    updates.map((u) => Prisma.sql`(${u.id}, ${u.order}::int)`),
  );
  // `table` is a closed union above, never user input, so the identifier is safe.
  await db.$executeRaw(
    Prisma.sql`UPDATE ${Prisma.raw(`"${table}"`)} AS t SET "order" = v.ord FROM (VALUES ${values}) AS v(id, ord) WHERE t.id = v.id`,
  );
}
