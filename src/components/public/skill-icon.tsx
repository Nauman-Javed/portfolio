"use client";

import { useCallback, useState } from "react";
import { abbreviation } from "@/data/site-content";

/**
 * A skill's uploaded icon, or a two-letter mark when there is none (or the file
 * fails to load). Purely decorative: the skill name is always shown next to it.
 */
export function SkillIcon({
  name,
  iconUrl,
  size = 28,
}: {
  name: string;
  iconUrl?: string | null;
  size?: number;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  // An image that failed before React hydrated never fires onError.
  const ref = useCallback(
    (img: HTMLImageElement | null) => {
      if (iconUrl && img?.complete && img.naturalWidth === 0) {
        setFailedUrl(iconUrl);
      }
    },
    [iconUrl],
  );

  if (!iconUrl || failedUrl === iconUrl) {
    return (
      <span
        aria-hidden
        className="text-teal flex shrink-0 items-center justify-center font-mono"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
      >
        {abbreviation(name)}
      </span>
    );
  }

  return (
    // A plain <img>: small icons, often SVG, which the Next.js image optimizer
    // doesn't serve.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={iconUrl}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
      onError={() => setFailedUrl(iconUrl)}
    />
  );
}
