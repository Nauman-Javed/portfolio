"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

// The site toggles a `dark` class on <html>; mirror it so toasts match.
export function AppToaster() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setTheme(root.classList.contains("dark") ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Toaster theme={theme} position="bottom-right" richColors closeButton />
  );
}
