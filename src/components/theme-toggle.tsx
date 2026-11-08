"use client";

import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

// Both icons are always rendered and CSS picks one from the <html> class, so
// there is no state to hydrate and no flash of the wrong icon.
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={cn(
        "text-fg2 hover:text-fg hover:bg-raised flex size-11 items-center justify-center rounded-md transition-colors duration-150",
        className,
      )}
    >
      <RiSunLine size={18} aria-hidden className="hidden dark:block" />
      <RiMoonLine size={18} aria-hidden className="dark:hidden" />
    </button>
  );
}
