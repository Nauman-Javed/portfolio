"use client";

import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-band text-fg3 absolute inset-0 flex flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <IconPhoto size={28} stroke={1.5} />
      <span className="text-[11px]">No image</span>
    </div>
  );
}

type Props = Omit<ComponentProps<typeof Image>, "src" | "alt" | "fill"> & {
  src?: string | null;
  alt: string;
};

/**
 * A fill-mode image that falls back to a placeholder when there is no URL or
 * the file can't be loaded (deleted upload, bad URL). Render it inside a
 * `relative` container.
 */
export function SafeImage({ src, alt, className, ...props }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  // An image that already failed before React hydrated never fires onError,
  // so also check it when the element mounts.
  const ref = useCallback(
    (img: HTMLImageElement | null) => {
      if (src && img?.complete && img.naturalWidth === 0) setFailedSrc(src);
    },
    [src],
  );

  if (!src || failedSrc === src) return <ImagePlaceholder />;

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  );
}
