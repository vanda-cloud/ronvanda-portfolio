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

const OPTIONS = [
  { value: "light",  icon: Sun },
  { value: "dark",   icon: Moon },
  { value: "system", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="glass-pill h-9 w-9"
        style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
        aria-hidden
      />
    );
  }

  const icon =
    theme === "system" ? <Monitor size={16} /> :
    resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("menuLabel")}
          className="h-9 w-9"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
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
