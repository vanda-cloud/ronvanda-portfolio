"use client";

import { motion } from "motion/react";

/**
 * Placeholder hero illustration. Swap this for a Spline embed or
 * react-three-fiber model later — it lives in its own component so the
 * Hero section doesn't need to change when that happens.
 */
export function RobotIllustration({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 240 240"
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <line
        x1="120"
        y1="40"
        x2="120"
        y2="20"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <motion.circle
        cx="120"
        cy="16"
        r="6"
        fill="var(--accent)"
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      <rect
        x="70"
        y="40"
        width="100"
        height="80"
        rx="24"
        fill="var(--glass-strong)"
        stroke="var(--glass-border)"
        strokeWidth="2"
      />

      <motion.circle
        cx="100"
        cy="80"
        r="8"
        fill="var(--accent)"
        style={{ transformOrigin: "100px 80px" }}
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.circle
        cx="140"
        cy="80"
        r="8"
        fill="var(--accent)"
        style={{ transformOrigin: "140px 80px" }}
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3 }}
      />

      <rect
        x="60"
        y="130"
        width="120"
        height="80"
        rx="28"
        fill="var(--glass-strong)"
        stroke="var(--glass-border)"
        strokeWidth="2"
      />

      <motion.circle
        cx="120"
        cy="168"
        r="14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        style={{ transformOrigin: "120px 168px" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <rect
        x="30"
        y="140"
        width="22"
        height="60"
        rx="11"
        fill="var(--glass-strong)"
        stroke="var(--glass-border)"
        strokeWidth="2"
      />
      <rect
        x="188"
        y="140"
        width="22"
        height="60"
        rx="11"
        fill="var(--glass-strong)"
        stroke="var(--glass-border)"
        strokeWidth="2"
      />
    </motion.svg>
  );
}
