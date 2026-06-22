"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Smartphone,
  Globe,
  Monitor,
  Layers,
  Database,
  Cloud,
  Palette,
  ClipboardList,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SKILL_IDS = [
  "mobile",
  "web",
  "desktop",
  "website",
  "database",
  "devops",
  "design",
  "pm",
  "git",
] as const;

const ICONS: Record<(typeof SKILL_IDS)[number], LucideIcon> = {
  mobile: Smartphone,
  web: Globe,
  desktop: Monitor,
  website: Layers,
  database: Database,
  devops: Cloud,
  design: Palette,
  pm: ClipboardList,
  git: GitBranch,
};

export function Skills() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (!cards?.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 32,
        scale: 0.94,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>

      <div
        ref={gridRef}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILL_IDS.map((id) => {
          const Icon = ICONS[id];
          return (
            <div
              key={id}
              className="skill-card glass-panel flex items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <div className="glass-pill flex h-11 w-11 shrink-0 items-center justify-center">
                <Icon size={20} className="text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold">{t(`items.${id}.title`)}</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {t(`items.${id}.desc`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
