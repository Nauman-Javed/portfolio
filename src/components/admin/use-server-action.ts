"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import type { ActionResult } from "@/lib/action-result";

type RunOptions<T> = {
  /** Toast shown on success. Omit for silent actions like reordering. */
  success?: string;
  onSuccess?: (data: T) => void;
  onError?: (result: Extract<ActionResult<T>, { ok: false }>) => void;
};

export function useServerAction() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const run = useCallback(
    <T>(
      action: () => Promise<ActionResult<T>>,
      options: RunOptions<T> = {},
    ) => {
      startTransition(async () => {
        try {
          const result = await action();
          if (result.ok) {
            if (options.success) toast.success(options.success);
            options.onSuccess?.(result.data);
            router.refresh();
          } else {
            toast.error(result.error);
            options.onError?.(result);
          }
        } catch {
          toast.error("Something went wrong. Please try again.");
          router.refresh();
        }
      });
    },
    [router],
  );

  return { run, pending };
}

/** Copies server-side Zod field errors onto the matching form fields. */
export function applyFieldErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  fieldErrors: Record<string, string[]> | undefined,
) {
  for (const [name, messages] of Object.entries(fieldErrors ?? {})) {
    if (messages[0]) {
      setError(name as Path<T>, { type: "server", message: messages[0] });
    }
  }
}
