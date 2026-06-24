"use client";

import { useEffect, useRef, useCallback } from "react";
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
  ShieldCheck,
  LayoutGrid,
  Code2,
  Rocket,
  FolderKanban,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SkillArchitecture } from "./skill-architecture";

const SKILL_IDS = [
  "mobile", "web", "desktop", "website",
  "database", "devops", "design", "pm", "devsecops",
] as const;

const ICONS: Record<(typeof SKILL_IDS)[number], LucideIcon> = {
  mobile:    Smartphone,
  web:       Globe,
  desktop:   Monitor,
  website:   Layers,
  database:  Database,
  devops:    Cloud,
  design:    Palette,
  pm:        ClipboardList,
  devsecops: ShieldCheck,
};

type Badge = { alt: string; img: string; href?: string };

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  platform:   LayoutGrid,
  stack:      Code2,
  deployment: Rocket,
  pm:         FolderKanban,
};

const TECH_CATEGORIES: { key: string; badges: Badge[] }[] = [
  {
    key: "platform",
    badges: [
      { alt: "Android", img: "https://img.shields.io/badge/Android-blue?style=flat-square&logo=android&logoColor=white" },
      { alt: "iOS",     img: "https://img.shields.io/badge/iOS-blue?style=flat-square&logo=apple&logoColor=white" },
      { alt: "Web",     img: "https://img.shields.io/badge/Web-blue?style=flat-square&logo=google-chrome&logoColor=white" },
      { alt: "Desktop", img: "https://img.shields.io/badge/Desktop-blue?style=flat-square&logo=pcgamingwiki&logoColor=white" },
    ],
  },
  {
    key: "stack",
    badges: [
      { alt: ".NET",       href: "https://dotnet.microsoft.com/en-us/",               img: "https://img.shields.io/badge/-.NET-02569B?style=flat-square&logo=dotnet&logoColor=white" },
      { alt: "Flutter",    href: "https://flutter.dev/",                               img: "https://img.shields.io/badge/-Flutter-02569B?style=flat-square&logo=flutter&logoColor=white" },
      { alt: "Next.js",    href: "https://nextjs.org/",                                img: "https://img.shields.io/badge/-Next.js-02569B?style=flat-square&logo=nextdotjs&logoColor=white" },
      { alt: "NestJS",     href: "https://nestjs.com/",                                img: "https://img.shields.io/badge/-NestJS-02569B?style=flat-square&logo=nestjs&logoColor=white" },
      { alt: "NuGet",      href: "https://www.nuget.org/",                             img: "https://img.shields.io/badge/-NuGet-02569B?style=flat-square&logo=nuget&logoColor=white" },
      { alt: "Pub.dev",    href: "https://pub.dev/",                                   img: "https://img.shields.io/badge/-PubDev-02569B?style=flat-square&logo=dart&logoColor=white" },
      { alt: "DevExpress", href: "https://demos.devexpress.com/ASPNetCore/",           img: "https://img.shields.io/badge/-DevExpress-02569B?style=flat-square&logo=devexpress&logoColor=white" },
      { alt: "Dynatrace",  href: "https://www.dynatrace.com/",                         img: "https://img.shields.io/badge/-Dynatrace-02569B?style=flat-square&logo=dynatrace&logoColor=white" },
      { alt: "MSSQL",      href: "https://www.microsoft.com/en-us/sql-server",         img: "https://img.shields.io/badge/-MSSQL-02569B?style=flat-square&logo=databricks&logoColor=white" },
      { alt: "PostgreSQL", href: "https://www.postgresql.org/",                        img: "https://img.shields.io/badge/-PostgreSQL-02569B?style=flat-square&logo=postgresql&logoColor=white" },
    ],
  },
  {
    key: "deployment",
    badges: [
      { alt: "IIS",            href: "https://www.iis.net/",                           img: "https://img.shields.io/badge/-IIS-4169E1?style=flat-square&logo=serverfault&logoColor=white" },
      { alt: "Docker",         href: "https://www.docker.com/",                        img: "https://img.shields.io/badge/-Docker-4169E1?style=flat-square&logo=docker&logoColor=white" },
      { alt: "Kubernetes",     href: "https://kubernetes.io/",                         img: "https://img.shields.io/badge/-Kubernetes-4169E1?style=flat-square&logo=kubernetes&logoColor=white" },
      { alt: "Vercel",         href: "https://vercel.com/",                            img: "https://img.shields.io/badge/-Vercel-4169E1?style=flat-square&logo=vercel&logoColor=white" },
      { alt: "AWS",            href: "https://aws.amazon.com/",                        img: "https://img.shields.io/badge/-AWS-4169E1?style=flat-square&logo=icloud&logoColor=white" },
      { alt: "SonarCloud",     href: "https://sonarcloud.io/",                         img: "https://img.shields.io/badge/-SonarCloud-4169E1?style=flat-square&logo=sonar&logoColor=white" },
      { alt: "Dependabot",     href: "https://github.com/dependabot",                  img: "https://img.shields.io/badge/-Dependabot-4169E1?style=flat-square&logo=dependabot&logoColor=white" },
      { alt: "GitHub Actions", href: "https://github.com/features/actions",            img: "https://img.shields.io/badge/-GitHub%20Actions-4169E1?style=flat-square&logo=githubactions&logoColor=white" },
    ],
  },
  {
    key: "pm",
    badges: [
      { alt: "Jira",       href: "https://www.atlassian.com/software/jira",            img: "https://img.shields.io/badge/-Jira-0052CC?style=flat-square&logo=jira&logoColor=white" },
      { alt: "GitHub",     href: "https://github.com/",                                img: "https://img.shields.io/badge/-GitHub-0052CC?style=flat-square&logo=github&logoColor=white" },
      { alt: "Figma",      href: "https://www.figma.com/",                             img: "https://img.shields.io/badge/-Figma-0052CC?style=flat-square&logo=figma&logoColor=white" },
      { alt: "Canva",      href: "https://www.canva.com/",                             img: "https://img.shields.io/badge/-Canva-0052CC?style=flat-square&logo=canva&logoColor=white" },
      { alt: "DevOps",     img: "https://img.shields.io/badge/-DevOps-0052CC?style=flat-square&logo=terraform&logoColor=white" },
      { alt: "DevSecOps",  img: "https://img.shields.io/badge/-DevSecOps-0052CC?style=flat-square&logo=owasp&logoColor=white" },
    ],
  },
];

// ── Skill card with 3-D tilt + icon bounce ───────────────────────────────────
function SkillCard({ id, title, desc, Icon }: {
  id: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const nx = (x / width  - 0.5) * 2;
    const ny = (y / height - 0.5) * 2;

    gsap.to(card, {
      rotateY:  nx * 8,
      rotateX: -ny * 8,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 800,
    });

    glow.style.background = `radial-gradient(220px circle at ${x}px ${y}px, var(--accent-glow, rgba(99,102,241,0.15)), transparent 70%)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.25 });

    // Icon: pop up and spin slightly
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.25,
        rotate: 12,
        duration: 0.35,
        ease: "back.out(2)",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    gsap.to(glow, { opacity: 0, duration: 0.3 });

    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: "elastic.out(1, 0.6)" });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="skill-card glass-panel relative overflow-hidden flex items-start gap-4 rounded-2xl p-5"
      style={{ willChange: "transform" }}
    >
      {/* Spotlight glow */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-2xl opacity-0" aria-hidden />

      <div
        ref={iconRef}
        className="glass-pill relative flex h-11 w-11 shrink-0 items-center justify-center"
      >
        <Icon size={20} className="text-[var(--accent)]" />
      </div>

      <div className="relative">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{desc}</p>
      </div>
    </div>
  );
}

// ── Tech-stack row with badge wave on hover ───────────────────────────────────
function TechRow({ category, label, CategoryIcon }: {
  category: { key: string; badges: Badge[] };
  label: string;
  CategoryIcon?: LucideIcon;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    const badges = rowRef.current?.querySelectorAll(".badge-item");
    if (!badges?.length) return;
    // Wave: each badge bounces up in sequence
    gsap.fromTo(
      badges,
      { y: 0 },
      {
        y: -6,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.04,
        yoyo: true,
        repeat: 1,
      }
    );
    // Pill label glow
    const pill = rowRef.current?.querySelector(".category-pill");
    if (pill) gsap.to(pill, { scale: 1.06, duration: 0.2, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const pill = rowRef.current?.querySelector(".category-pill");
    if (pill) gsap.to(pill, { scale: 1, duration: 0.25, ease: "power2.out" });
  }, []);

  return (
    <div
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="tech-row glass-panel flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:gap-5"
    >
      <span className="category-pill glass-pill flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
        {CategoryIcon && <CategoryIcon size={14} />}
        {label}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {category.badges.map((badge) =>
          badge.href ? (
            <a
              key={badge.alt}
              href={badge.href}
              target="_blank"
              rel="noreferrer noopener"
              className="badge-item block transition-transform hover:scale-110"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badge.img} alt={badge.alt} className="h-6 rounded" />
            </a>
          ) : (
            <span key={badge.alt} className="badge-item inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badge.img} alt={badge.alt} className="h-6 rounded" />
            </span>
          )
        )}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Skills() {
  const t      = useTranslations("skills");
  const tStack = useTranslations("techStack");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const stackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Skill cards — wave from center outward
      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 32,
          scale: 0.92,
          duration: 0.55,
          ease: "power3.out",
          stagger: { amount: 0.6, from: "center" },
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
          },
        });
      }

      // Tech rows — slide in from left, one by one
      const rows = stackRef.current?.querySelectorAll(".tech-row");
      if (rows?.length) {
        gsap.from(rows, {
          opacity: 0,
          x: -40,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 82%",
          },
        });
      }
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
      {/* Section header */}
      <div className="mx-auto max-w-xl text-center">
        <div className="flex items-center justify-center gap-3">
          <Zap size={30} className="shrink-0 text-[var(--accent)]" />
          <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>

      {/* Skill cards */}
      <div
        ref={gridRef}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILL_IDS.map((id) => (
          <SkillCard
            key={id}
            id={id}
            title={t(`items.${id}.title`)}
            desc={t(`items.${id}.desc`)}
            Icon={ICONS[id]}
          />
        ))}
      </div>

      {/* Tech stack header */}
      <div className="mx-auto mt-24 max-w-xl text-center">
        <h3 className="text-2xl font-bold tracking-tight">{tStack("title")}</h3>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {tStack("subtitle")}
        </p>
      </div>

      {/* Tech stack rows */}
      <div ref={stackRef} className="mx-auto mt-10 max-w-4xl space-y-6">
        {TECH_CATEGORIES.map((category) => (
          <TechRow
            key={category.key}
            category={category}
            label={tStack(`categories.${category.key}`)}
            CategoryIcon={CATEGORY_ICONS[category.key]}
          />
        ))}
      </div>

      <SkillArchitecture />
    </section>
  );
}
