"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, FolderCode } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROJECT_IDS = ["vnc-pos", "vnc-pms", "inventory", "sfa", "payroll", "parking", "production", "crm", "pos", "hrm", "canteen", "attendance"] as const;

const TAGS: Record<(typeof PROJECT_IDS)[number], string[]> = {
  "vnc-pos":  ["NestJS", "Next.js", "Flutter", "GraphQL", "PostgreSQL", "Redis"],
  "vnc-pms":  ["Flutter", "ASP.NET Core", "SignalR", "Firebird", "Windows Service"],
  inventory:  ["C#", "MVP Pattern", "MSSQL", "Barcode", "Reporting"],
  sfa:        ["Objective-C", "Android", "Firebase", "CRM"],
  payroll:    ["C#", "MVP Pattern", "MSSQL", "Payslip", "Tax Calc"],
  parking:    ["C#", "MVP Pattern", "MSSQL", "Fee Calc", "Daily Reports"],
  production: ["C#", "MVP Pattern", "MSSQL", "WIP Tracking", "Factory"],
  crm:        ["C#", "MVP Pattern", "MSSQL", "Lead Tracking", "Analytics"],
  pos:        ["C#", "MVP Pattern", "MSSQL", "Receipt Print", "Inventory"],
  hrm:        ["C#", "MVP Pattern", "MSSQL", "Leave Mgmt", "Contracts"],
  canteen:    ["C#", "MVP Pattern", "MSSQL", "Menu Mgmt", "Cost Report"],
  attendance: ["C#", "MVP Pattern", "MSSQL", "Check-in/out", "Overtime"],
};

// ── Per-card 3-D tilt + spotlight glow ──────────────────────────────────────
function ProjectCard({ id, title, desc, tags }: {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}) {
  const cardRef  = useRef<HTMLElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Normalise to [-1, 1]
    const nx = (x / width  - 0.5) * 2;
    const ny = (y / height - 0.5) * 2;

    // 3-D tilt — max ±10°
    gsap.to(card, {
      rotateY:  nx * 10,
      rotateX: -ny * 10,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 900,
      transformOrigin: "center center",
    });

    // Spotlight follows cursor
    glow.style.background = `radial-gradient(280px circle at ${x}px ${y}px, var(--accent-glow, rgba(99,102,241,0.18)), transparent 70%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(glow, { opacity: 0, duration: 0.3 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    const glow = glowRef.current;
    if (glow) gsap.to(glow, { opacity: 1, duration: 0.3 });

    // Stagger-pop the tag pills
    const pills = cardRef.current?.querySelectorAll(".tag-pill");
    if (pills?.length) {
      gsap.fromTo(pills,
        { scale: 0.85, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.06 }
      );
    }
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card glass-panel relative overflow-hidden rounded-3xl p-7"
      style={{ willChange: "transform" }}
    >
      {/* Cursor spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0"
        aria-hidden
      />

      {/* Accent top-edge line that brightens on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <h3 className="relative text-xl font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]">
        {title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {desc}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="tag-pill glass-pill px-3 py-1 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function Projects() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards?.length) return;

      // Entrance: cards fly in from bottom with alternating slight X offset
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.94,
        duration: 0.65,
        ease: "power3.out",
        stagger: {
          amount: 0.9,
          from: "start",
        },
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <div className="flex items-center justify-center gap-3">
          <FolderCode size={30} className="shrink-0 text-[var(--accent)]" />
          <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>

      <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECT_IDS.map((id) => (
          <ProjectCard
            key={id}
            id={id}
            title={t(`items.${id}.title`)}
            desc={t(`items.${id}.desc`)}
            tags={TAGS[id]}
          />
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
