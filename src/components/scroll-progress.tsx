"use client";

import { useEffect, useRef } from "react";

// Thin bar fixed to the top that fills as the page scrolls. It grows from the
// inline start, so it fills right-to-left in Arabic.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
    >
      <div
        ref={bar}
        className="bg-teal h-full origin-left will-change-transform rtl:origin-right"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
