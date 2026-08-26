"use client";

import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { gsap } from "@/lib/gsap";
import heartAnimation from "@/assets/lottie/animation-heart.json";
import { ReleaseNotesModal } from "@/components/ui/release-notes-modal";
import { OnlineBadge } from "@/components/ui/online-badge";

const HEART_COLORS = ["#f43f5e","#fb7185","#ff6b6b","#f472b6","#e879f9","#ff4d6d","#fda4af","#f9a8d4","#fbbf24","#fb923c"];

function makeHeart(x: number, y: number, size: number): HTMLSpanElement {
  const el = document.createElement("span");
  el.textContent = "❤";
  el.style.cssText = [
    "position:fixed",
    `left:${x}px`,
    `top:${y}px`,
    `font-size:${size}px`,
    `color:${HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]}`,
    "pointer-events:none",
    "z-index:9999",
    "transform:translate(-50%,-50%)",
    "will-change:transform,opacity",
  ].join(";");
  document.body.appendChild(el);
  return el;
}

function burst(cx: number, cy: number, count: number, distMin: number, distMax: number, delay = 0) {
  for (let i = 0; i < count; i++) {
    const el = makeHeart(cx, cy, 10 + Math.random() * 18);
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
    const dist  = distMin + Math.random() * (distMax - distMin);
    gsap.to(el, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0.2 + Math.random() * 1.1,
      rotation: -60 + Math.random() * 120,
      duration: 0.9 + Math.random() * 0.7,
      ease: "power2.out",
      delay: delay + Math.random() * 0.12,
      onComplete: () => el.remove(),
    });
  }
}

function spawnHearts(originX: number, originY: number) {
  const midX = window.innerWidth  / 2;
  const midY = window.innerHeight / 2;

  // Phase 1 — immediate ground burst at the heart button
  burst(originX, originY, 55, 120, 320);

  // Phase 2 — 6 rockets fly from the button toward the screen center,
  //           then each explodes into a secondary burst of hearts
  const ROCKETS = 6;
  for (let r = 0; r < ROCKETS; r++) {
    const delay   = 0.08 + r * 0.08;
    const startX  = originX + (-50 + Math.random() * 100);
    const startY  = originY;
    // Target: somewhere near screen center with scatter
    const targetX = midX + (-120 + Math.random() * 240);
    const targetY = midY + (-120 + Math.random() * 240);

    const rocket = makeHeart(startX, startY, 16 + Math.random() * 10);

    gsap.to(rocket, {
      x: targetX - startX,
      y: targetY - startY,
      scale: 1.4,
      duration: 0.55 + Math.random() * 0.2,
      ease: "power3.out",
      delay,
      onComplete: () => {
        rocket.remove();
        // Explode at the rocket's landing point
        burst(targetX, targetY, 22, 60, 200);
      },
    });
  }

  // Phase 3 — a wide slow rain of large hearts drifting down from mid-screen
  const RAIN = 20;
  for (let i = 0; i < RAIN; i++) {
    const rx  = midX + (-window.innerWidth * 0.4 + Math.random() * window.innerWidth * 0.8);
    const ry  = midY + (-120 + Math.random() * 100);
    const el  = makeHeart(rx, ry, 18 + Math.random() * 22);
    gsap.fromTo(el,
      { opacity: 0, scale: 0 },
      {
        opacity: 0,
        scale: 1,
        y: 80 + Math.random() * 120,
        x: -30 + Math.random() * 60,
        rotation: -20 + Math.random() * 40,
        duration: 1.2 + Math.random() * 0.8,
        ease: "power1.out",
        delay: 0.4 + Math.random() * 0.4,
        keyframes: [
          { opacity: 1, scale: 1, duration: 0.2 },
          { opacity: 0, y: 80 + Math.random() * 120, duration: 1.0 },
        ],
        onComplete: () => el.remove(),
      },
    );
  }
}

export function Footer() {
  const t = useTranslations("footer");
  const heartRef = useRef<LottieRefCurrentProps>(null);
  const heartWrapRef = useRef<HTMLButtonElement>(null);
  const year = new Date().getFullYear();

  const handleHeartClick = useCallback(() => {
    if (!heartWrapRef.current) return;
    const rect = heartWrapRef.current.getBoundingClientRect();
    spawnHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
    heartRef.current?.goToAndPlay(0, true);
  }, []);

  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--background)] py-6">
      {/* Version badge — clicking opens release notes modal */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <ReleaseNotesModal />
        <OnlineBadge />
      </div>

      <p className="flex flex-wrap items-center justify-center gap-x-1 text-center text-xs text-[var(--muted-foreground)]">
        <span>© {year} {t("madeWith")}</span>
        <button
          ref={heartWrapRef}
          onClick={handleHeartClick}
          aria-label="Made with love"
          className="inline-flex cursor-pointer items-center transition-transform hover:scale-125 active:scale-110"
          style={{ background: "none", border: "none", padding: 0, lineHeight: 1 }}
        >
          <Lottie
            lottieRef={heartRef}
            animationData={heartAnimation}
            loop
            autoplay
            style={{ width: 28, height: 28 }}
          />
        </button>
        <span>{t("by")}</span>
        <a
          href="https://github.com/vanda-cloud"
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
        >
          Ron Vanda
        </a>
        <span>. {t("rights")}</span>
      </p>
    </footer>
  );
}
