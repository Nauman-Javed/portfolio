"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container, ctaClass } from "@/components/public/ui";

export default function PublicError({
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
    <Container className="py-32 text-center">
      <p className="text-teal text-[11px] tracking-[0.14em] uppercase">Error</p>
      <h1 className="mt-4 text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
        Something went wrong
      </h1>
      <p className="text-fg2 mx-auto mt-4 max-w-md text-[16px] leading-[1.6]">
        This page couldn’t be loaded. Try again, or head back home.
      </p>
      {error.digest && (
        <p className="text-fg3 mt-3 font-mono text-xs">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className={ctaClass("primary")}
        >
          Try again
        </button>
        <Link href="/" className={ctaClass("secondary")}>
          Back home
        </Link>
      </div>
    </Container>
  );
}
