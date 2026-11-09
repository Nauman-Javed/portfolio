"use client";

import { useLayoutEffect } from "react";

// Switching language swaps the <html> element, which comes back with the
// server's default "dark" class. Re-apply the saved choice before paint.
export function ThemeSync() {
  useLayoutEffect(() => {
    try {
      document.documentElement.classList.toggle(
        "dark",
        localStorage.getItem("theme") !== "light",
      );
    } catch {
      // Storage unavailable; keep the default.
    }
  }, []);
  return null;
}
