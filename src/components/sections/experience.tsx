"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Lottie from "lottie-react";
import programmerAnimation from "@/assets/lottie/programmer.json";

// Example placeholders spanning 2012 → present, newest first.
// Swap in your real roles/companies/dates whenever you're ready —
// nothing else about the section needs to change.
const EXPERIENCE_IDS = ["current", "prior3", "prior2", "prior1"] as const;

export function Experience() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Lottie panel slides in from the left on scroll.
      if (lottieRef.current) {
        gsap.from(lottieRef.current, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

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

      const items = timelineRef.current?.querySelectorAll<HTMLLIElement>(".experience-item");
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

        // Bold/fill each point as you scroll past it, and keep it that way —
        // points accumulate going down, like a checklist. Scrolling back up
        // above a point un-marks it again.
        items.forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            onEnter: () => item.classList.add("is-active"),
            onEnterBack: () => item.classList.add("is-active"),
            onLeaveBack: () => item.classList.remove("is-active"),
          });
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

      <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        {/* Lottie — sticky on desktop so it stays visible while scrolling timeline */}
        <div
          ref={lottieRef}
          className="flex items-center justify-center lg:sticky lg:top-28"
        >
          <Lottie
            animationData={programmerAnimation}
            loop
            autoplay
            style={{ width: "100%", maxWidth: 420 }}
          />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--glass-border)]" />
          <div
            ref={progressRef}
            className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-[var(--accent)]"
          />

          <ul className="space-y-10">
            {EXPERIENCE_IDS.map((id) => (
              <li key={id} className="experience-item relative pl-9">
                <span className="experience-dot absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--background)]" />
                <p className="experience-period text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
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
      </div>
    </section>
  );
}
