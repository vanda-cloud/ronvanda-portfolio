// No longer used: we dropped locale-prefixed routing (see i18n/request.ts
// and i18n/routing.ts), so there's no need for next-intl's routing-aware
// `Link`/`useRouter`/`usePathname` wrappers anymore. Components import
// `Link` from "next/link" and `useRouter` from "next/navigation" directly.
// Kept as an empty module instead of deleting it, since this sandbox can't
// delete files from the connected project folder — safe to remove by hand.
export {};
