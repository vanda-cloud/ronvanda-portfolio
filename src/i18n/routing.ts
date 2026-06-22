// Locale is no longer encoded in the URL at all (see i18n/request.ts) — this
// file just holds the shared constants used by the request config and the
// locale switcher. There's no `defineRouting`/middleware-routing involved
// anymore since we're not doing locale-prefixed routing.

export const locales = ["en", "km", "ja", "zh"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";

// Cookie that remembers the user's chosen locale across visits.
export const localeCookieName = "NEXT_LOCALE";
export const localeCookieMaxAge = 60 * 60 * 24 * 365; // 1 year

export function isAppLocale(value: string | undefined | null): value is AppLocale {
  return !!value && (locales as readonly string[]).includes(value);
}
