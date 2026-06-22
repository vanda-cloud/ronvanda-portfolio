"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, localeCookieName, localeCookieMaxAge } from "@/i18n/routing";

const labels: Record<string, string> = {
  en: "EN",
  km: "ខ្មែរ",
  ja: "日本語",
  zh: "中文",
};

// Flags are the most universally recognizable shorthand for a language
// picker — lucide-react only has a generic "Languages" glyph, nothing
// per-language, so emoji flags fill that gap without a new dependency.
const flags: Record<string, string> = {
  en: "🇺🇸",
  km: "🇰🇭",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("locale");

  function selectLocale(loc: string) {
    if (loc === locale) return;

    document.cookie = `${localeCookieName}=${loc}; path=/; max-age=${localeCookieMaxAge}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={t("label")}
          className="h-9 gap-1.5 px-3 text-xs font-medium"
        >
          <span aria-hidden>{flags[locale]}</span>
          {labels[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {locales.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => selectLocale(loc)}>
            <span aria-hidden>{flags[loc]}</span>
            <span>{labels[loc]}</span>
            {locale === loc && (
              <Check size={14} className="ml-auto text-[var(--accent)]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
