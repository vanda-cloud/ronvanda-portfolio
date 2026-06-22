"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass-panel flex w-full max-w-4xl items-center justify-between gap-4 rounded-full px-5 py-2.5">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          RV<span className="text-[var(--accent)]">.</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <li>
            <Link href="#skills" className="opacity-80 transition-opacity hover:opacity-100">
              {t("skills")}
            </Link>
          </li>
          <li>
            <Link href="#experience" className="opacity-80 transition-opacity hover:opacity-100">
              {t("experience")}
            </Link>
          </li>
          <li>
            <Link href="#projects" className="opacity-80 transition-opacity hover:opacity-100">
              {t("projects")}
            </Link>
          </li>
          <li>
            <Link href="#contact" className="opacity-80 transition-opacity hover:opacity-100">
              {t("contact")}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
