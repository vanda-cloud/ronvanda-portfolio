"use client";

import { useState, useEffect } from "react";

/**
 * Reads dark-mode state directly from the <html> class attribute.
 *
 * More reliable than next-themes `resolvedTheme` on iOS Safari PWA:
 * next-themes' inline script sets the class synchronously BEFORE React runs,
 * while `resolvedTheme` is undefined until ThemeProvider's useEffect fires —
 * causing a race where newly mounted components see the wrong value.
 *
 * A MutationObserver keeps it reactive to subsequent theme switches.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setIsDark(el.classList.contains("dark"));
    sync(); // read the class that next-themes already set
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return isDark;
}
