"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Example placeholders spanning 2012 → present, newest first.
// Swap in your real roles/companies/dates whenever you're ready —
// nothing else about the section needs to change.
const EXPERIENCE_IDS = ["current", "prior3", "prior2", "prior1"] as const;

export function Experience() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Fill line "charges up" as you scroll through the timeline.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      const items = timelineRef.current?.querySelectorAll(".experience-item");
      if (items?.length) {
        gsap.from(items, {
          opacity: 0,
          x: -24,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
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
      id="experience"
      ref={sectionRef}
      className="relative mx-auto max-w-4xl px-6 py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>

      <div ref={timelineRef} className="relative mx-auto mt-16 max-w-2xl">
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--glass-border)]" />
        <div
          ref={progressRef}
          className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-[var(--accent)]"
        />

        <ul className="space-y-10">
          {EXPERIENCE_IDS.map((id) => (
            <li key={id} className="experience-item relative pl-9">
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--background)]" />
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {t(`items.${id}.period`)}
              </p>
              <h3 className="mt-1 font-semibold">
                {t(`items.${id}.role`)}
                <span className="text-[var(--muted-foreground)]">
                  {" "}
                  · {t(`items.${id}.company`)}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {t(`items.${id}.desc`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
