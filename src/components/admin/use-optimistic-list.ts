"use client";

import { useState } from "react";
import type { MoveDirection } from "@/lib/mutations";

/**
 * A copy of a server-provided list that can be changed instantly on screen
 * (for example after clicking a move button) while the server catches up.
 * Whenever the server sends a fresh list, it replaces the local copy.
 *
 * Updates must be made from an event handler, not from inside a server-action
 * transition, or React holds them back until the action has finished.
 */
export function useOptimisticList<T>(items: T[]) {
  const [rows, setRows] = useState(items);
  const [source, setSource] = useState(items);

  if (items !== source) {
    setSource(items);
    setRows(items);
  }

  return [rows, setRows] as const;
}

/** Swaps an item with its neighbour above or below. */
export function swapNeighbour<T extends { id: string }>(
  list: T[],
  id: string,
  direction: MoveDirection,
): T[] {
  const from = list.findIndex((item) => item.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from === -1 || to < 0 || to >= list.length) return list;

  const next = [...list];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

/**
 * Skills are ordered by their `order` value within a category, so a move swaps
 * that value with the neighbour in the same category.
 */
export function swapSkillOrder<
  T extends { id: string; category: string; order: number },
>(skills: T[], id: string, direction: MoveDirection): T[] {
  const skill = skills.find((s) => s.id === id);
  if (!skill) return skills;

  const peers = skills
    .filter((s) => s.category === skill.category)
    .sort((a, b) => a.order - b.order);
  const from = peers.findIndex((s) => s.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (to < 0 || to >= peers.length) return skills;

  const other = peers[to];
  return skills.map((s) => {
    if (s.id === skill.id) return { ...s, order: other.order };
    if (s.id === other.id) return { ...s, order: skill.order };
    return s;
  });
}
