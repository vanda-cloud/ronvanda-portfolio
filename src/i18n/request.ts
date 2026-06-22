import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import {
  defaultLocale,
  isAppLocale,
  localeCookieName,
  type AppLocale,
} from "./routing";

function detectFromAcceptLanguage(header: string | null): AppLocale | undefined {
  if (!header) return undefined;

  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().split("-")[0]?.toLowerCase());

  return preferred.find(isAppLocale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  let locale: AppLocale;
  if (isAppLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const headerStore = await headers();
    locale = detectFromAcceptLanguage(headerStore.get("accept-language")) ?? defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
