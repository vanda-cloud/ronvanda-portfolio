"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsDark } from "@/hooks/use-is-dark";

const OPTIONS = [
  { value: "light",  icon: Sun },
  { value: "dark",   icon: Moon },
  { value: "system", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const isDark = useIsDark();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const glassStyle = {
    background:       isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.78)",
    borderColor:      isDark ? "rgba(255,255,255,0.14)" : "rgba(79,82,232,0.16)",
    // Disable backdrop-filter on the button itself — iOS WebKit renders nested
    // backdrop-filter (button inside glass-panel nav) incorrectly, causing a
    // white/washed-out appearance even though computed background is correct.
    backdropFilter:         "none",
    WebkitBackdropFilter:   "none",
  };

  if (!mounted) {
    return <div className="glass-pill h-9 w-9" style={glassStyle} aria-hidden />;
  }

  const icon =
    theme === "system" ? <Monitor size={16} /> :
    isDark             ? <Moon    size={16} /> : <Sun size={16} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("menuLabel")}
          className="h-9 w-9"
          style={glassStyle}
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {OPTIONS.map(({ value, icon: Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
            <Icon size={16} className="opacity-70" />
            <span>{t(value)}</span>
            {theme === value && <Check size={14} className="ml-auto text-[var(--accent)]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
