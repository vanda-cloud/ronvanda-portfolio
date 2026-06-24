"use client";

import { useEffect, useRef } from "react";

// ── types ─────────────────────────────────────────────────────────────────────
interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  idle: number;       // oscillation phase
  idleSpeed: number;
  pulse: number;      // 0-1, decays after a signal arrives
}

interface Signal {
  a: number; b: number;   // from/to node index
  t: number;              // 0-1 travel progress
  speed: number;
}

interface Label {
  x: number; y: number;
  text: string;
  alpha: number;
  vy: number;
}

// ── constants ─────────────────────────────────────────────────────────────────
const NODE_COUNT   = 48;
const MAX_SIGNALS  = 16;
const CONNECT_DIST = 190;
const ACCENT: [number, number, number] = [129, 140, 248]; // indigo-400

// ── component ─────────────────────────────────────────────────────────────────
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, rafId = 0;
    let lastTs = performance.now();
    let isDark = true;

    const readTheme = () => {
      isDark = document.documentElement.classList.contains("dark");
    };
    readTheme();

    // ── nodes ──
    const nodes: Node[] = [];
    const signals: Signal[] = [];
    const labels: Label[] = [];

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: 1.8 + Math.random() * 2,
          idle: Math.random() * Math.PI * 2,
          idleSpeed: 0.3 + Math.random() * 0.6,
          pulse: 0,
        });
      }
    };

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initNodes();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── signal spawning ──
    let sigElapsed = 0;
    let nextSig    = 400 + Math.random() * 600;

    const spawnSignal = () => {
      if (signals.length >= MAX_SIGNALS) return;
      const a = Math.floor(Math.random() * nodes.length);
      const na = nodes[a];
      const neighbors: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const dx = nodes[i].x - na.x, dy = nodes[i].y - na.y;
        if (dx * dx + dy * dy < CONNECT_DIST * CONNECT_DIST) neighbors.push(i);
      }
      if (!neighbors.length) return;
      const b = neighbors[Math.floor(Math.random() * neighbors.length)];
      signals.push({ a, b, t: 0, speed: 0.005 + Math.random() * 0.007 });
    };

    // ── floating hex labels ──
    const HEX = "0123456789ABCDEF";
    const randomHex = (n: number) =>
      Array.from({ length: n }, () => HEX[Math.floor(Math.random() * 16)]).join("");

    const spawnLabel = (x: number, y: number) => {
      labels.push({
        x, y,
        text: Math.random() < 0.5 ? `0x${randomHex(4)}` : randomHex(8),
        alpha: 0.75,
        vy: -(0.35 + Math.random() * 0.3),
      });
    };

    // ── draw ──────────────────────────────────────────────────────────────────
    const draw = (now: number) => {
      const dt  = now - lastTs; lastTs = now;
      const dtS = dt / 1000;
      sigElapsed += dt;

      ctx.clearRect(0, 0, W, H);

      const fade = isDark ? 1.0 : 0.32;
      const [ar, ag, ab] = ACCENT;

      // Update nodes
      for (const n of nodes) {
        n.x = (n.x + n.vx + W) % W;
        n.y = (n.y + n.vy + H) % H;
        n.idle  += n.idleSpeed * dtS;
        n.pulse  = Math.max(0, n.pulse - dtS * 1.8);
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const na = nodes[i], nb = nodes[j];
          const dx = nb.x - na.x, dy = nb.y - na.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > CONNECT_DIST * CONNECT_DIST) continue;
          const dist = Math.sqrt(d2);
          const ea   = (1 - dist / CONNECT_DIST) * 0.2 * fade;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = `rgba(${ar},${ag},${ab},${ea})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }

      // Draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.speed * (dt / 16);
        if (s.t >= 1) {
          nodes[s.b].pulse = 1;
          if (labels.length < 20) spawnLabel(nodes[s.b].x, nodes[s.b].y);
          signals.splice(i, 1);
          continue;
        }

        const na = nodes[s.a], nb = nodes[s.b];
        const sx = na.x + (nb.x - na.x) * s.t;
        const sy = na.y + (nb.y - na.y) * s.t;

        // Glow aura
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 9);
        grd.addColorStop(0, `rgba(200,215,255,${0.8 * fade})`);
        grd.addColorStop(1, `rgba(200,215,255,0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, 9, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.98 * fade})`;
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const idleG  = 0.07 + Math.sin(n.idle) * 0.035;
        const glowR  = n.r * (6 + n.pulse * 5);
        const glowA  = (idleG + n.pulse * 0.55) * fade;

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, `rgba(${ar},${ag},${ab},${glowA})`);
        grd.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${(0.5 + n.pulse * 0.5) * fade})`;
        ctx.fill();
      }

      // Draw floating hex labels
      ctx.font = "9px 'Courier New', monospace";
      for (let i = labels.length - 1; i >= 0; i--) {
        const lb = labels[i];
        lb.y    += lb.vy;
        lb.alpha = Math.max(0, lb.alpha - dtS * 0.7);
        if (lb.alpha <= 0) { labels.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${lb.alpha * fade})`;
        ctx.fillText(lb.text, lb.x + 10, lb.y);
      }

      // Spawn signal
      if (sigElapsed > nextSig) {
        spawnSignal();
        sigElapsed = 0;
        nextSig = 350 + Math.random() * 650;
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const observer = new MutationObserver(() => readTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
}
