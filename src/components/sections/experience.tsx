"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Briefcase, TrendingUp } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Lottie from "lottie-react";
import programmerAnimation from "@/assets/lottie/programmer.json";

const EXPERIENCE_IDS = ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8"] as const;

const EXPERIENCE_TAGS: Record<(typeof EXPERIENCE_IDS)[number], string[]> = {
  e1: ["Flutter", "Next.js", "ASP.NET Core", "NestJS", "AWS", "Docker", "DevSecOps"],
  e2: ["ASP.NET Core", "MSSQL", "PostgreSQL", "Docker", "GitHub Actions", "DevSecOps"],
  e3: ["C#", ".NET", "MSSQL", "Desktop", "Web", "Project Management"],
  e4: ["C#", "MSSQL", "Desktop", "Server", "Network"],
  e5: ["C#", "MSSQL", "Inventory System", "Desktop"],
  e6: ["IT Support", "Lab Management", "C#", "MSSQL"],
  e7: ["Microsoft Office", "HTML", "Networking", "Teaching"],
  e8: ["English", "Translation", "Teaching"],
};

const PROMOTED_IDS: ReadonlySet<string> = new Set(["e4"]);

// ── Single timeline entry ─────────────────────────────────────────────────────
function ExperienceItem({ period, role, company, desc, tags, promoted }: {
  period: string; role: string; company: string; desc: string; tags: string[]; promoted?: boolean;
}) {
  const itemRef    = useRef<HTMLLIElement>(null);
  const dotRef     = useRef<HTMLSpanElement>(null);
  const ringRef    = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    // Slide content slightly right
    gsap.to(contentRef.current, { x: 6, duration: 0.25, ease: "power2.out" });
    // Swell the dot
    gsap.to(dotRef.current, { scale: 1.4, duration: 0.25, ease: "back.out(2)" });
    // Pulse ring
    if (ringRef.current) {
      gsap.fromTo(ringRef.current,
        { scale: 1, opacity: 0.7 },
        { scale: 3, opacity: 0, duration: 0.55, ease: "power2.out" }
      );
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(contentRef.current, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.6)" });
    gsap.to(dotRef.current, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" });
  }, []);

  // Scrollspy activation lives here so it can directly access dotRef / ringRef
  useEffect(() => {
    const item = itemRef.current;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!item || !dot) return;

    const st = ScrollTrigger.create({
      trigger: item,
      start: "top 70%",
      onEnter: () => {
        item.classList.add("is-active");
        // Dot burst on first reveal
        gsap.to(dot, {
          scale: 1.5, duration: 0.15, ease: "power2.out",
          onComplete: () => gsap.to(dot, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }),
        });
        if (ring) {
          gsap.fromTo(ring,
            { scale: 1, opacity: 0.8 },
            { scale: 3.2, opacity: 0, duration: 0.65, ease: "power2.out" }
          );
        }
      },
      onEnterBack: () => item.classList.add("is-active"),
      onLeaveBack: () => item.classList.remove("is-active"),
    });

    return () => st.kill();
  }, []);

  return (
    <li
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="experience-item group relative pl-9 cursor-default"
    >
      {/* Hover glass highlight */}
      <div
        className="absolute -inset-x-3 -inset-y-2 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--glass-bg, rgba(255,255,255,0.04))", border: "1px solid var(--glass-border)" }}
      />

      {/* Accent left bar on hover */}
      <div className="absolute left-[-1px] top-2 bottom-2 w-0.5 rounded-full bg-[var(--accent)] scale-y-0 transition-transform duration-300 origin-top group-hover:scale-y-100" />

      {/* Dot + pulse ring */}
      <span
        ref={dotRef}
        className="experience-dot absolute left-0 top-1.5 z-10 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--background)]"
      >
        <span
          ref={ringRef}
          className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-0"
        />
      </span>

      {/* Content */}
      <div ref={contentRef} className="relative">
        <p className="experience-period text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
          {period}
        </p>
        <h3 className="mt-1 font-semibold">
          {role}
          <span className="text-[var(--muted-foreground)]"> · {company}</span>
        </h3>
        {promoted && (
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500">
            <TrendingUp size={11} />
            Promoted · Dec 2014
          </span>
        )}
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {desc}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="glass-pill px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Experience() {
  const t = useTranslations("experience");
  const sectionRef  = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lottieRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Lottie slides in from left
      if (lottieRef.current) {
        gsap.from(lottieRef.current, {
          opacity: 0, x: -40, duration: 0.8, ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }

      // Progress line charges up with scroll
      gsap.fromTo(progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%", end: "bottom 60%", scrub: true,
          },
        }
      );

      // Items fly in from the right (fresh direction vs. left-leaning sections)
      const liEls = timelineRef.current?.querySelectorAll<HTMLLIElement>(".experience-item");
      if (liEls?.length) {
        gsap.from(liEls, {
          opacity: 0, x: 32, duration: 0.55, ease: "power3.out",
          stagger: 0.1, clearProps: "transform,opacity",
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <div className="flex items-center justify-center gap-3">
          <Briefcase size={30} className="shrink-0 text-[var(--accent)]" />
          <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        {/* Lottie — sticky on desktop */}
        <div ref={lottieRef} className="flex items-center justify-center lg:sticky lg:top-28">
          <Lottie animationData={programmerAnimation} loop autoplay style={{ width: "100%", maxWidth: 420 }} />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--glass-border)]" />
          <div ref={progressRef} className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-[var(--accent)]" />

          <ul className="space-y-10">
            {EXPERIENCE_IDS.map((id) => (
              <ExperienceItem
                key={id}
                period={t(`items.${id}.period`)}
                role={t(`items.${id}.role`)}
                company={t(`items.${id}.company`)}
                desc={t(`items.${id}.desc`)}
                tags={EXPERIENCE_TAGS[id]}
                promoted={PROMOTED_IDS.has(id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
