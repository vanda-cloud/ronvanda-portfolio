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
  LayoutGrid,
  Code2,
  Rocket,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SkillArchitecture } from "./skill-architecture";

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

type Badge = { alt: string; img: string; href?: string };

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  platform: LayoutGrid,
  stack: Code2,
  deployment: Rocket,
  pm: FolderKanban,
};

const TECH_CATEGORIES: { key: string; badges: Badge[] }[] = [
  {
    key: "platform",
    badges: [
      { alt: "Android", img: "https://img.shields.io/badge/Android-blue?style=flat-square&logo=android&logoColor=white" },
      { alt: "iOS", img: "https://img.shields.io/badge/iOS-blue?style=flat-square&logo=apple&logoColor=white" },
      { alt: "Web", img: "https://img.shields.io/badge/Web-blue?style=flat-square&logo=google-chrome&logoColor=white" },
      { alt: "Desktop", img: "https://img.shields.io/badge/Desktop-blue?style=flat-square&logo=pcgamingwiki&logoColor=white" },
    ],
  },
  {
    key: "stack",
    badges: [
      { alt: ".NET", href: "https://dotnet.microsoft.com/en-us/", img: "https://img.shields.io/badge/-.NET-02569B?style=flat-square&logo=dotnet&logoColor=white" },
      { alt: "Flutter", href: "https://flutter.dev/", img: "https://img.shields.io/badge/-Flutter-02569B?style=flat-square&logo=flutter&logoColor=white" },
      { alt: "Next.js", href: "https://nextjs.org/", img: "https://img.shields.io/badge/-Next.js-02569B?style=flat-square&logo=nextdotjs&logoColor=white" },
      { alt: "NestJS", href: "https://nestjs.com/", img: "https://img.shields.io/badge/-NestJS-02569B?style=flat-square&logo=nestjs&logoColor=white" },
      { alt: "NuGet", href: "https://www.nuget.org/", img: "https://img.shields.io/badge/-NuGet-02569B?style=flat-square&logo=nuget&logoColor=white" },
      { alt: "Pub.dev", href: "https://pub.dev/", img: "https://img.shields.io/badge/-PubDev-02569B?style=flat-square&logo=dart&logoColor=white" },
      { alt: "DevExpress", href: "https://demos.devexpress.com/ASPNetCore/", img: "https://img.shields.io/badge/-DevExpress-02569B?style=flat-square&logo=devexpress&logoColor=white" },
      { alt: "Dynatrace", href: "https://www.dynatrace.com/", img: "https://img.shields.io/badge/-Dynatrace-02569B?style=flat-square&logo=dynatrace&logoColor=white" },
      { alt: "MSSQL", href: "https://www.microsoft.com/en-us/sql-server", img: "https://img.shields.io/badge/-MSSQL-02569B?style=flat-square&logo=databricks&logoColor=white" },
      { alt: "PostgreSQL", href: "https://www.postgresql.org/", img: "https://img.shields.io/badge/-PostgreSQL-02569B?style=flat-square&logo=postgresql&logoColor=white" },
    ],
  },
  {
    key: "deployment",
    badges: [
      { alt: "IIS", href: "https://www.iis.net/", img: "https://img.shields.io/badge/-IIS-4169E1?style=flat-square&logo=serverfault&logoColor=white" },
      { alt: "Docker", href: "https://www.docker.com/", img: "https://img.shields.io/badge/-Docker-4169E1?style=flat-square&logo=docker&logoColor=white" },
      { alt: "Kubernetes", href: "https://kubernetes.io/", img: "https://img.shields.io/badge/-Kubernetes-4169E1?style=flat-square&logo=kubernetes&logoColor=white" },
      { alt: "Vercel", href: "https://vercel.com/", img: "https://img.shields.io/badge/-Vercel-4169E1?style=flat-square&logo=vercel&logoColor=white" },
      { alt: "AWS", href: "https://aws.amazon.com/", img: "https://img.shields.io/badge/-AWS-4169E1?style=flat-square&logo=icloud&logoColor=white" },
      { alt: "SonarCloud", href: "https://sonarcloud.io/", img: "https://img.shields.io/badge/-SonarCloud-4169E1?style=flat-square&logo=sonar&logoColor=white" },
      { alt: "Dependabot", href: "https://github.com/dependabot", img: "https://img.shields.io/badge/-Dependabot-4169E1?style=flat-square&logo=dependabot&logoColor=white" },
      { alt: "GitHub Actions", href: "https://github.com/features/actions", img: "https://img.shields.io/badge/-GitHub%20Actions-4169E1?style=flat-square&logo=githubactions&logoColor=white" },
    ],
  },
  {
    key: "pm",
    badges: [
      { alt: "Jira", href: "https://www.atlassian.com/software/jira", img: "https://img.shields.io/badge/-Jira-0052CC?style=flat-square&logo=jira&logoColor=white" },
      { alt: "GitHub", href: "https://github.com/", img: "https://img.shields.io/badge/-GitHub-0052CC?style=flat-square&logo=github&logoColor=white" },
      { alt: "Figma", href: "https://www.figma.com/", img: "https://img.shields.io/badge/-Figma-0052CC?style=flat-square&logo=figma&logoColor=white" },
      { alt: "Canva", href: "https://www.canva.com/", img: "https://img.shields.io/badge/-Canva-0052CC?style=flat-square&logo=figma&logoColor=white" },
      { alt: "DevOps", img: "https://img.shields.io/badge/-DevOps-0052CC?style=flat-square&logo=terraform&logoColor=white" },
      { alt: "DevSecOps", img: "https://img.shields.io/badge/-DevSecOps-0052CC?style=flat-square&logo=owasp&logoColor=white" },
    ],
  },
];

export function Skills() {
  const t = useTranslations("skills");
  const tStack = useTranslations("techStack");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 32,
          scale: 0.94,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          // Drop the inline transform/opacity once settled — leaving it on
          // the element after the tween ends is what was breaking the
          // glass-panel's backdrop-filter blur on some cards (a known
          // Chrome/Safari quirk where a stale composited layer from an
          // animated transform stops the blur from being recomputed).
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

      const rows = stackRef.current?.querySelectorAll(".tech-row");
      if (rows?.length) {
        gsap.from(rows, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 80%",
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
      <div className="mx-auto max-w-xl text-center">
        <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
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

      <div className="mx-auto mt-24 max-w-xl text-center">
        <h3 className="text-2xl font-bold tracking-tight">{tStack("title")}</h3>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {tStack("subtitle")}
        </p>
      </div>

      <div ref={stackRef} className="mx-auto mt-10 max-w-4xl space-y-6">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.key}
            className="tech-row glass-panel flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:gap-5"
          >
            <span className="glass-pill flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              {(() => { const Icon = CATEGORY_ICONS[category.key]; return Icon ? <Icon size={14} /> : null; })()}
              {tStack(`categories.${category.key}`)}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {category.badges.map((badge) =>
                badge.href ? (
                  <a
                    key={badge.alt}
                    href={badge.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-transform hover:scale-105"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={badge.img} alt={badge.alt} className="h-6 rounded" />
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={badge.alt}
                    src={badge.img}
                    alt={badge.alt}
                    className="h-6 rounded"
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <SkillArchitecture />
    </section>
  );
}
