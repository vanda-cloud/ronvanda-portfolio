"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, UserRound } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STAT_KEYS = ["years", "platforms", "systems", "languages"] as const;

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    if (!card || !num) return;

    // Count-up animation on enter
    const raw    = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    const isNum  = !isNaN(raw);

    const counter = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        if (isNum) {
          counter.val = 0;
          gsap.to(counter, {
            val: raw,
            duration: 1.4,
            ease: "power2.out",
            delay: index * 0.1,
            onUpdate() {
              if (num) num.textContent = Math.round(counter.val) + suffix;
            },
          });
        }
        gsap.from(card, {
          opacity: 0, y: 20, scale: 0.92,
          duration: 0.55, ease: "power3.out",
          delay: index * 0.1,
          clearProps: "transform,opacity",
        });
      },
    });

    return () => st.kill();
  }, [value, index]);

  return (
    <div
      ref={cardRef}
      className="glass-panel flex flex-col items-center rounded-2xl px-6 py-5 text-center"
    >
      <span ref={numRef} className="gradient-text text-4xl font-bold tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
        {label}
      </span>
    </div>
  );
}

export function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, x: -36, duration: 0.75, ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Text side */}
        <div ref={textRef}>
          <div className="flex items-center gap-3">
            <UserRound size={30} className="shrink-0 text-[var(--accent)]" />
            <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
          </div>

          <p className="mt-6 text-base leading-relaxed text-[var(--muted-foreground)]">
            {t("bio")}
          </p>

          <div className="mt-8">
            <a
              href="https://www.linkedin.com/in/ronvanda/"
              target="_blank"
              rel="noreferrer noopener"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
            >
              <LinkedinIcon size={16} />
              {t("linkedinButton")}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {STAT_KEYS.map((key, i) => (
            <StatCard
              key={key}
              value={t(`stats.${key}.value`)}
              label={t(`stats.${key}.label`)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
