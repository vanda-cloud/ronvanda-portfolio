"use client";

import { useTranslations } from "next-intl";
import { useOnlinePresence } from "@/hooks/use-online-count";

const MAX_COUNTRIES_SHOWN = 5;
const UNKNOWN_COUNTRY = "XX";

/** ISO 3166-1 alpha-2 code -> flag emoji, via regional indicator symbols. */
function countryFlag(code: string): string {
  if (code === UNKNOWN_COUNTRY || code.length !== 2) return "\u{1F310}"; // globe
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

export function OnlineBadge() {
  const t = useTranslations("footer");
  const presence = useOnlinePresence();

  if (presence === null) return null;

  const topCountries = Object.entries(presence.byCountry)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_COUNTRIES_SHOWN);
  const hiddenCountries = Object.keys(presence.byCountry).length - topCountries.length;

  return (
    <div className="glass-pill flex items-center gap-2 px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-xs font-medium text-[var(--muted-foreground)]">
        {t("online", { count: presence.count })}
      </span>
      {topCountries.length > 0 && (
        <>
          <span className="h-3 w-px bg-[var(--glass-border)]" />
          <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
            {topCountries.map(([code, n]) => (
              <span key={code} title={code === UNKNOWN_COUNTRY ? undefined : code}>
                {countryFlag(code)}
                {n > 1 ? n : ""}
              </span>
            ))}
            {hiddenCountries > 0 && <span>+{hiddenCountries}</span>}
          </span>
        </>
      )}
    </div>
  );
}
