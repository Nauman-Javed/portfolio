"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/action-result";
import type { MoveDirection } from "@/lib/mutations";
import { useServerAction } from "./use-server-action";

export function MoveButtons({
  name,
  isFirst,
  isLast,
  onMove,
}: {
  name: string;
  isFirst: boolean;
  isLast: boolean;
  onMove: (direction: MoveDirection) => Promise<ActionResult>;
}) {
  const { run, pending } = useServerAction();

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move ${name} up`}
        disabled={isFirst || pending}
        onClick={() => run(() => onMove("up"))}
      >
        <ChevronUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move ${name} down`}
        disabled={isLast || pending}
        onClick={() => run(() => onMove("down"))}
      >
        <ChevronDown />
      </Button>
    </>
  );
}
