"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Sparkles, Zap, Shield, Smartphone, Globe, Monitor, Tag } from "lucide-react";
import { gsap } from "@/lib/gsap";

const VERSION = "3.0.0";
const RELEASE_DATE = "23 Jun 2026";
const STORAGE_KEY = "rv-last-seen-version";

type ReleaseItem = { icon: React.ReactNode; title: string; desc: string };

const RELEASE_NOTES: ReleaseItem[] = [
  {
    icon: <Sparkles size={15} />,
    title: "Liquid Glass UI",
    desc: "Apple-inspired glassmorphism design system with dark, light, and system theme support.",
  },
  {
    icon: <Globe size={15} />,
    title: "4-Language Support",
    desc: "Full localization in English, Khmer (ខ្មែរ), Japanese (日本語), and Chinese (中文) — cookie-based, no page reload.",
  },
  {
    icon: <Zap size={15} />,
    title: "Skill Architecture Diagram",
    desc: "Custom SVG flowchart covering 9 domains: Desktop, Web, Mobile, Backend, Automation, Database, Tools, DevOps, and DevSecOps.",
  },
  {
    icon: <Smartphone size={15} />,
    title: "Progressive Web App (PWA)",
    desc: "Installable on all platforms with service worker caching, full icon set, and web manifest.",
  },
  {
    icon: <Monitor size={15} />,
    title: "Apple-style Scroll Animations",
    desc: "GSAP ScrollTrigger-powered reveals, parallax robot, scrubbed timeline progress, and Lenis smooth scrolling.",
  },
  {
    icon: <Shield size={15} />,
    title: "DevSecOps Coverage",
    desc: "SAST, SCA, Secret Scanning, Image Scan, SBOM, IaC Scan, Dockerfile Lint, and License Compliance — all documented.",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

function Modal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const overlay = document.getElementById("rn-overlay");
    const panel   = document.getElementById("rn-panel");
    if (!overlay || !panel) return;

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    gsap.fromTo(panel,   { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" });
  }, [open]);

  const handleClose = useCallback(() => {
    const overlay = document.getElementById("rn-overlay");
    const panel   = document.getElementById("rn-panel");
    gsap.to(panel,   { opacity: 0, y: 16, scale: 0.97, duration: 0.2, ease: "power2.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  const handleBackdropClick = useCallback(() => {
    const panel = document.getElementById("rn-panel");
    if (!panel) return;
    // Shake: rapid left-right oscillation to signal "use the buttons"
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      keyframes: [
        { x: -10, duration: 0.07 },
        { x:  10, duration: 0.07 },
        { x:  -8, duration: 0.06 },
        { x:   8, duration: 0.06 },
        { x:  -4, duration: 0.05 },
        { x:   0, duration: 0.05 },
      ],
      ease: "power1.inOut",
    });
  }, []);

  if (!open) return null;

  return (
    <div
      id="rn-overlay"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
    >
      <div
        id="rn-panel"
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-lg rounded-3xl p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--accent)]">v{VERSION}</span>
              <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold text-white">
                Latest
              </span>
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight">What&apos;s New</h2>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">Released {RELEASE_DATE}</p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="glass-pill flex h-8 w-8 shrink-0 items-center justify-center transition-transform hover:scale-110"
          >
            <X size={14} />
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-[var(--glass-border)]" />

        {/* Release items */}
        <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {RELEASE_NOTES.map((item) => (
            <li key={item.title} className="flex gap-3">
              <div className="glass-pill mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[var(--accent)]">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <a
            href="https://github.com/vanda-cloud"
            target="_blank"
            rel="noreferrer noopener"
            className="text-xs text-[var(--accent)] transition-opacity hover:opacity-75"
          >
            View on GitHub →
          </a>
          <button
            onClick={handleClose}
            className="glass-panel rounded-full px-4 py-1.5 text-xs font-semibold transition-transform hover:scale-[1.03]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReleaseNotesModal() {
  const [open, setOpen] = useState(false);

  // Auto-show once per version on first visit
  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen !== VERSION) {
      // Small delay so page animations finish first
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, VERSION);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      {/* Clickable version badge — exported so footer can use it */}
      <button
        onClick={() => setOpen(true)}
        aria-label="View release notes"
        className="glass-pill flex items-center gap-2 px-3 py-1.5 transition-transform hover:scale-105"
      >
        <Tag size={11} className="text-[var(--accent)]" />
        <span className="text-xs font-semibold text-[var(--accent)]">v{VERSION}</span>
        <span className="h-3 w-px bg-[var(--glass-border)]" />
        <span className="text-xs text-[var(--muted-foreground)]">Released {RELEASE_DATE}</span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
