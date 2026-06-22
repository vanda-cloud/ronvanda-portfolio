"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { key: "skills", href: "skills" },
  { key: "experience", href: "experience" },
  { key: "projects", href: "projects" },
  { key: "contact", href: "contact" },
] as const;

// "home" has no nav link of its own (the logo covers that) but is tracked
// here too so nothing lights up as active while you're still in the hero.
const SECTION_IDS = ["home", ...NAV_ITEMS.map((item) => item.href)];

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);

      const probe = scrollY + window.innerHeight / 2;
      let current = "home";
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) continue;
        const { offsetTop, offsetHeight } = section;
        if (probe >= offsetTop && probe < offsetTop + offsetHeight) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className="glass-panel w-full max-w-4xl rounded-[1.75rem] transition-colors duration-300"
        style={{ background: scrolled ? "var(--glass-strong)" : "var(--glass-bg)" }}
      >
        <div className="flex w-full items-center justify-between gap-4 px-5 py-2.5">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="text-sm font-semibold tracking-wide"
          >
            RV<span className="text-[var(--accent)]">.</span>
          </a>

          <ul className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.key} className="group relative">
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`pb-1 transition-colors duration-200 ${
                      isActive ? "text-[var(--accent)]" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {t(item.key)}
                  </a>
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                    style={{ background: "var(--gradient-text)" }}
                  />
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 sm:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="glass-pill flex h-9 w-9 items-center justify-center sm:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-[var(--glass-border)] px-5 py-4 sm:hidden">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.key}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--glass-strong)] text-[var(--accent)]"
                      : "hover:bg-[var(--glass-strong)]"
                  }`}
                >
                  {t(item.key)}
                </a>
              );
            })}
            <div className="mt-2 flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
