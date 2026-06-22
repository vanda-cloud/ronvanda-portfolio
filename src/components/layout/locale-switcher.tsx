"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import {
  locales,
  localeCookieName,
  localeCookieMaxAge,
} from "@/i18n/routing";

const labels: Record<string, string> = {
  en: "EN",
  km: "ខ្មែរ",
  ja: "日本語",
  zh: "中文",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("locale");
  const [open, setOpen] = useState(false);

  function selectLocale(loc: string) {
    setOpen(false);
    if (loc === locale) return;

    // No URL segment to change — just persist the choice in a cookie and
    // ask Next.js to re-render Server Components in place. This refetches
    // the RSC payload for the *same* URL, so client state (theme, Lenis,
    // GSAP contexts, scroll position) never unmounts — no reload flash.
    document.cookie = `${localeCookieName}=${loc}; path=/; max-age=${localeCookieMaxAge}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
        className="glass-pill flex h-9 items-center gap-1.5 px-3 text-xs font-medium transition-transform hover:scale-105"
      >
        <Globe size={14} />
        {labels[locale]}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul className="glass-panel absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-2xl p-1 text-sm">
            {locales.map((loc) => (
              <li key={loc}>
                <button
                  type="button"
                  className="flex w-full rounded-xl px-3 py-2 text-left transition-colors hover:bg-[var(--glass-strong)]"
                  onClick={() => selectLocale(loc)}
                >
                  {labels[loc]}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
