"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";
import { TypingText } from "@/components/ui/typing-text";

// Placeholder public Spline scene (a 3D robot) — swap for your own exported
// scene URL from spline.design whenever it's ready.
const HERO_SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Hero() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !robotRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(robotRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
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
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center px-6 pb-20 pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="liquid-blob liquid-blob-a" />
        <div className="liquid-blob liquid-blob-b" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            {t("greeting")}
          </p>
          <h1 className="gradient-text mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
            {t("name")}
          </h1>
          <p className="mt-2 text-xl font-medium text-[var(--accent)]">
            <span aria-hidden="true">
              <TypingText texts={roles} />
            </span>
            <span className="sr-only">{roles.join(" · ")}</span>
          </p>
          <p className="mt-6 max-w-md text-base text-[var(--muted-foreground)]">
            {t("tagline")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="glass-panel flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
            >
              {t("ctaProjects")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
            >
              <Mail size={16} />
              {t("ctaContact")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          ref={robotRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="glass-panel relative h-full w-full overflow-hidden rounded-[2.5rem]">
            <Spotlight className="-top-1/4 left-1/4" size={320} />
            <SplineScene scene={HERO_SPLINE_SCENE} className="h-full w-full" />
          </div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 transition-opacity hover:opacity-100"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          {t("scroll")}
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce text-[var(--accent)]"
        />
      </button>
    </section>
  );
}
