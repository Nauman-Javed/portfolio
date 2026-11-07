"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ManageError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <h1 className="text-3xl">Something went wrong</h1>
      <p className="text-muted-foreground mt-3 text-sm">
        This page failed to load. Your saved content is safe.
      </p>
      {error.digest && (
        <p className="text-muted-foreground mt-2 font-mono text-xs">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/manage" />}
        >
          Back to overview
        </Button>
      </div>
    </main>
  );
}
