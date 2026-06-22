"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROJECT_IDS = ["inventory", "sfa"] as const;

const TAGS: Record<(typeof PROJECT_IDS)[number], string[]> = {
  inventory: ["C#", "MVP Pattern", "MSSQL", "Desktop"],
  sfa: ["Flutter", "Mobile", "CRM"],
};

export function Projects() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards?.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        rotateX: -8,
        transformPerspective: 800,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
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
      id="projects"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>

      <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECT_IDS.map((id) => (
          <article key={id} className="project-card glass-panel rounded-3xl p-7">
            <h3 className="text-xl font-semibold">{t(`items.${id}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {t(`items.${id}.desc`)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {TAGS[id].map((tag) => (
                <span
                  key={tag}
                  className="glass-pill px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="https://github.com/vanda-cloud"
          target="_blank"
          rel="noreferrer noopener"
          className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
        >
          <GithubIcon size={16} />
          {t("viewGithub")}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
