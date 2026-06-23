"use client";

import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { gsap } from "@/lib/gsap";
import heartAnimation from "@/assets/lottie/animation-heart.json";
import { ReleaseNotesModal } from "@/components/ui/release-notes-modal";

function spawnHearts(originX: number, originY: number) {
  const count = 16;
  const colors = ["#f43f5e", "#fb7185", "#ff6b6b", "#f472b6", "#e879f9", "#ff4d6d"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.textContent = "❤";
    const size = 12 + Math.random() * 18;
    el.style.cssText = [
      "position:fixed",
      `left:${originX}px`,
      `top:${originY}px`,
      `font-size:${size}px`,
      `color:${colors[Math.floor(Math.random() * colors.length)]}`,
      "pointer-events:none",
      "z-index:9999",
      "transform:translate(-50%,-50%)",
      "will-change:transform,opacity",
    ].join(";");
    document.body.appendChild(el);

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const dist = 55 + Math.random() * 90;
    gsap.to(el, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40 - Math.random() * 30,
      opacity: 0,
      scale: 0.2 + Math.random() * 0.8,
      rotation: -30 + Math.random() * 60,
      duration: 0.7 + Math.random() * 0.5,
      ease: "power2.out",
      delay: Math.random() * 0.1,
      onComplete: () => el.remove(),
    });
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
      <div className="mb-4 flex items-center justify-center">
        <ReleaseNotesModal />
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
