import type { Metadata } from "next";
import { Roboto, Kantumruy_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PwaRegister } from "@/components/providers/pwa-register";
import { ParticleBackground } from "@/components/ui/particle-background";
import { MagicCursor } from "@/components/ui/magic-cursor";
import "./globals.css";

// next/font self-hosts these automatically at build time — the files are
// fetched once during `next build`/`next dev` (on a machine with normal
// internet access) and then served from this app's own domain, never from
// Google at runtime. That's the embedding: zero external font requests in
// the shipped site. Each font exposes a CSS variable; globals.css decides
// which one is active based on the <html lang> attribute.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kantumruy",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Ron Vanda",
    },
    icons: {
      icon: [
        { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192.png",   sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
        { url: "/icons/apple-167.png",        sizes: "167x167" },
        { url: "/icons/apple-152.png",        sizes: "152x152" },
        { url: "/icons/apple-120.png",        sizes: "120x120" },
      ],
      other: [
        { rel: "msapplication-TileImage", url: "/icons/ms-tile-150.png" },
      ],
    },
    other: {
      "msapplication-TileColor": "#0b0c10",
      "theme-color": "#818cf8",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${roboto.variable} ${kantumruyPro.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <ParticleBackground />
        <MagicCursor />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="rv-portfolio-theme">
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </ThemeProvider>
          <PwaRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
