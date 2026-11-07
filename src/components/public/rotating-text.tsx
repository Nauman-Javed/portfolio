"use client";

import { useEffect, useState } from "react";

// Slides vertically through the phrases. The first phrase is repeated at the
// end so the loop can snap back to the start without a visible jump.
export function RotatingText({ phrases }: { phrases: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const items = [...phrases, phrases[0]];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => i + 1), 2600);
    return () => clearInterval(timer);
  }, []);

  // Once the repeated first phrase is showing, jump back to the start without
  // animating. A timer (not transitionend) so it can never get stuck.
  useEffect(() => {
    if (index < phrases.length) return;
    const timer = setTimeout(() => {
      setSnapping(true);
      setIndex(0);
    }, 750);
    return () => clearTimeout(timer);
  }, [index, phrases.length]);

  useEffect(() => {
    if (!snapping) return;
    const frame = requestAnimationFrame(() => setSnapping(false));
    return () => cancelAnimationFrame(frame);
  }, [snapping]);

  return (
    <>
      <span className="sr-only">{phrases[0]}</span>
      <span
        aria-hidden
        className="text-teal block h-[1.2em] overflow-hidden leading-[1.2]"
      >
        <span
          className="block"
          style={{
            // A percentage is relative to the whole list, so step by 1/N of it.
            transform: `translateY(-${(index * 100) / items.length}%)`,
            transition: snapping
              ? "none"
              : "transform 0.7s cubic-bezier(.7,0,.2,1)",
          }}
        >
          {items.map((phrase, i) => (
            <span key={i} className="block h-[1.2em] whitespace-nowrap">
              {phrase}
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
