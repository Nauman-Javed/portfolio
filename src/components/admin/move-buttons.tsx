"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/action-result";
import type { MoveDirection } from "@/lib/mutations";
import { useServerAction } from "./use-server-action";

export function MoveButtons({
  name,
  isFirst,
  isLast,
  onMove,
  onOptimistic,
}: {
  name: string;
  isFirst: boolean;
  isLast: boolean;
  onMove: (direction: MoveDirection) => Promise<ActionResult>;
  /** Reorders the list on screen right away, before the server has answered. */
  onOptimistic?: (direction: MoveDirection) => void;
}) {
  const router = useRouter();
  const { run, pending } = useServerAction();

  function move(direction: MoveDirection) {
    // Runs outside the transition so the new order shows immediately.
    onOptimistic?.(direction);
    // If the server refuses, reload the real order so the screen can't drift.
    run(() => onMove(direction), { onError: () => router.refresh() });
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move ${name} up`}
        disabled={isFirst || pending}
        onClick={() => move("up")}
      >
        <ChevronUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move ${name} down`}
        disabled={isLast || pending}
        onClick={() => move("down")}
      >
        <ChevronDown />
      </Button>
    </>
  );
}
