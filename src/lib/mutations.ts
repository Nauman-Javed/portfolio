import { updateTag } from "next/cache";

export type MoveDirection = "up" | "down";

// Called from Server Actions after a write. updateTag expires the tagged cache
// entries immediately, so public pages show the change on the next request.
export function invalidate(...tags: string[]) {
  for (const tag of new Set(tags)) updateTag(tag);
}

// Returns the ids in their new order, or null if the move isn't possible.
export function moveId(
  ids: string[],
  id: string,
  direction: MoveDirection,
): string[] | null {
  const from = ids.indexOf(id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from === -1 || to < 0 || to >= ids.length) return null;

  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}
