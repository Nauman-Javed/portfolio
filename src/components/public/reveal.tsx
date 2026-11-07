"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Entrance animations inside this wrapper stay paused (see globals.css) until
// it scrolls into view, so below-the-fold motion isn't spent before it's seen.
export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      data-inview={inView ? "" : undefined}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
