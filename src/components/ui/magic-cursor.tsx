"use client";

import { useEffect, useRef } from "react";

// ── types ─────────────────────────────────────────────────────────────────────
interface Sparkle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;      // 1 → 0
  decay: number;
  color: string;
  points: number;    // 4 or 6 pointed star, or 0 = glowing dot
}

// ── magic color palette ───────────────────────────────────────────────────────
const COLORS = [
  "#FFD700", // gold
  "#FFF8DC", // cream
  "#FFFFFF", // white
  "#c084fc", // violet
  "#818cf8", // indigo
  "#f0abfc", // fuchsia
  "#67e8f9", // cyan
  "#fde68a", // amber
];

// ── draw a N-pointed star centred at (x,y) ───────────────────────────────────
function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  outer: number, inner: number,
  points: number, rotation: number,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points + rotation;
    const r = i % 2 === 0 ? outer : inner;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// ── component ─────────────────────────────────────────────────────────────────
export function MagicCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, rafId = 0, lastTs = performance.now();
    let mx = -1000, my = -1000;
    const sparkles: Sparkle[] = [];

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    // ── spawn sparkles at cursor ──
    const spawn = (x: number, y: number) => {
      const n = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.5;
        const roll  = Math.random();
        sparkles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: 2.5 + Math.random() * 5.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.25,
          life: 1,
          decay: 0.018 + Math.random() * 0.028,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          points: roll < 0.5 ? 4 : roll < 0.8 ? 6 : 0,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      spawn(e.clientX, e.clientY);
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── draw loop ─────────────────────────────────────────────────────────────
    const draw = (now: number) => {
      const dt = now - lastTs; lastTs = now;
      ctx.clearRect(0, 0, W, H);

      // Wand-tip glow at cursor
      if (mx > 0) {
        const tipGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 18);
        tipGlow.addColorStop(0, "rgba(255,230,100,0.55)");
        tipGlow.addColorStop(0.4, "rgba(200,150,255,0.18)");
        tipGlow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.fillStyle = tipGlow;
        ctx.fill();
      }

      // Particles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life -= s.decay * (dt / 16);
        if (s.life <= 0) { sparkles.splice(i, 1); continue; }

        s.x  += s.vx * (dt / 16);
        s.y  += s.vy * (dt / 16);
        s.vy += 0.04 * (dt / 16);   // subtle gravity
        s.rotation += s.rotationSpeed * (dt / 16);

        const sz = s.size * Math.pow(s.life, 0.6);   // shrink as it fades

        ctx.save();
        ctx.globalAlpha = s.life;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = s.color;

        if (s.points === 0) {
          // Glowing dot
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, sz);
          g.addColorStop(0, s.color);
          g.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(s.x, s.y, sz, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          // Star
          drawStar(ctx, s.x, s.y, sz, sz * 0.38, s.points, s.rotation);
          ctx.fillStyle = s.color;
          ctx.fill();
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
    />
  );
}
