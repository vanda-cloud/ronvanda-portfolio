"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ColorSet = { fill: string; text: string; stroke: string };

type RawNode = { id: string; label: string };

type RawSubgraph = {
  key: string;
  colors: ColorSet;
  nodes: RawNode[];
};

// 1:1 port of the "Skill Architecture" mermaid diagram: same subgraphs,
// same nodes, same classDef colors, same cross-links (A-->G, B-->O, etc.)
// — laid out as an actual top-down flowchart (hub on top, subgraph
// clusters below, individually colored leaf nodes, arrowed edges)
// instead of mermaid.js, so it stays theme-aware and dependency-free.
// Order: Desktop, Web, Mobile, Backend, Automation, Database, Tools,
// DevOps, DevSecOps (DevOps repositioned to sit right before DevSecOps).
const SUBGRAPHS_RAW: RawSubgraph[] = [
  {
    key: "desktop",
    colors: { fill: "#94a3b8", text: "#1e293b", stroke: "#475569" },
    nodes: [
      { id: "winforms", label: ".NET WinForms" },
      { id: "devcomponent", label: "DevComponent" },
    ],
  },
  {
    key: "web",
    colors: { fill: "#38bdf8", text: "#0c4a6e", stroke: "#0284c7" },
    nodes: [
      { id: "aspnetcore", label: "Asp.Net Core" },
      { id: "A", label: "Next.js" },
      { id: "typo3", label: "Typo3" },
      { id: "devexpress", label: "DevExpress" },
      { id: "vuexy", label: "Vuexy" },
      { id: "C", label: "TailwindCSS" },
      { id: "D", label: "Framer Motion" },
    ],
  },
  {
    key: "mobile",
    colors: { fill: "#f472b6", text: "#500724", stroke: "#db2777" },
    nodes: [
      { id: "FF", label: "Flutter" },
      { id: "GG", label: "Android" },
      { id: "HH", label: "iOS" },
      { id: "II", label: "Scanning - zScan Zimperium" },
      { id: "JJ", label: "RASP - zDefend Zimperium" },
      { id: "KK", label: "Shielding - zShield Zimperium" },
      { id: "LL", label: "Monitoring - Dynatrace" },
      { id: "MM", label: "Firebase App Distribution" },
      { id: "NN", label: "Firebase Messaging" },
      { id: "OO", label: "Firebase Realtime Analytic" },
      { id: "PP", label: "Firebase Remote Config" },
    ],
  },
  {
    key: "backend",
    colors: { fill: "#fb923c", text: "#7c2d12", stroke: "#ea580c" },
    nodes: [
      { id: "E", label: "NestJS" },
      { id: "F", label: "ASP.NET Core" },
      { id: "G", label: "GraphQL" },
      { id: "H", label: "REST API" },
    ],
  },
  {
    key: "automation",
    colors: { fill: "#2dd4bf", text: "#134e4a", stroke: "#0d9488" },
    nodes: [
      { id: "spellcheck", label: "Spell Check" },
      { id: "codeformat", label: "Code Format" },
      { id: "buildtest", label: "Build Test" },
      { id: "unittest", label: "Unit Test" },
      { id: "uitest", label: "UI Test" },
      { id: "integrationtest", label: "Integration Test" },
      { id: "publishghcr", label: "Publish Image to GHCR" },
      { id: "dependabot", label: "Dependabot Dependency Check" },
      { id: "codepipeline", label: "AWS CodePipeline" },
    ],
  },
  {
    key: "database",
    colors: { fill: "#a78bfa", text: "#3b0764", stroke: "#7c3aed" },
    nodes: [
      { id: "I", label: "PostgreSQL" },
      { id: "CC", label: "MSSQL Server" },
      { id: "J", label: "Prisma ORM" },
      { id: "DD", label: "Redis" },
      { id: "EE", label: "DynamoDB" },
    ],
  },
  {
    key: "tools",
    colors: { fill: "#fbbf24", text: "#422006", stroke: "#d97706" },
    nodes: [
      { id: "jira", label: "Jira" },
      { id: "R", label: "GitHub" },
      { id: "S", label: "Figma" },
      { id: "canva", label: "Canva" },
      { id: "T", label: "Postman" },
      { id: "vscode", label: "VS Code" },
      { id: "cursor", label: "Cursor" },
      { id: "trae", label: "Trae" },
      { id: "antigravity", label: "Antigravity" },
      { id: "claude", label: "Claude" },
      { id: "codex", label: "Codex" },
      { id: "dbeaver", label: "DBeaver" },
      { id: "windowsapp", label: "Windows App" },
    ],
  },
  {
    key: "devops",
    colors: { fill: "#4ade80", text: "#065f46", stroke: "#16a34a" },
    nodes: [
      { id: "K", label: "Docker" },
      { id: "M", label: "GitHub Container Registry (GHCR)" },
      { id: "L", label: "AWS" },
      { id: "iis", label: "IIS" },
      { id: "vercel", label: "Vercel" },
      { id: "digitalocean", label: "Digital Ocean" },
      { id: "N", label: "CI/CD Workflow Pipeline" },
    ],
  },
  {
    key: "devsecops",
    colors: { fill: "#f87171", text: "#7f1d1d", stroke: "#dc2626" },
    nodes: [
      { id: "U", label: "Secret Scanning" },
      { id: "V", label: "SAST" },
      { id: "W", label: "Dockerfile Lint" },
      { id: "X", label: "IaC Scan" },
      { id: "Y", label: "SCA" },
      { id: "Z", label: "License Compliance" },
      { id: "AA", label: "Image Scan" },
      { id: "BB", label: "SBOM" },
      { id: "CC", label: "Internal Vulnerability Assessment" },
      { id: "DD", label: "Web Application Penetration Test" },
      { id: "EE", label: "Mobile Application Penetration Test" },
    ],
  },
];

// Layout constants — a top-down tree: hub, then one column per subgraph.
const COL_WIDTH = 220;
const COL_GAP = 30;
const COL_STEP = COL_WIDTH + COL_GAP;
const SUBGRAPH_TOP = 170;
const HEADER_H = 36;
const ITEM_H = 30;
const ITEM_GAP = 10;
const PAD_BOTTOM = 16;
const PAD_X = 15;

const TOTAL_WIDTH = SUBGRAPHS_RAW.length * COL_WIDTH + (SUBGRAPHS_RAW.length - 1) * COL_GAP;
const HUB = { x: TOTAL_WIDTH / 2, y: 70, r: 48 };
const VIEW_W = TOTAL_WIDTH;

const SUBGRAPHS = SUBGRAPHS_RAW.map((sg, colIndex) => {
  const left = colIndex * COL_STEP;
  const centerX = left + COL_WIDTH / 2;
  const height =
    HEADER_H + sg.nodes.length * ITEM_H + (sg.nodes.length - 1) * ITEM_GAP + PAD_BOTTOM;
  const nodes = sg.nodes.map((node, i) => {
    const y = SUBGRAPH_TOP + HEADER_H + i * (ITEM_H + ITEM_GAP);
    return {
      ...node,
      x: left + PAD_X,
      y,
      width: COL_WIDTH - PAD_X * 2,
      height: ITEM_H,
      centerX,
      centerY: y + ITEM_H / 2,
    };
  });
  return { ...sg, left, centerX, height, nodes };
});

// Computed after SUBGRAPHS exists, since DevSecOps (11 items) is taller
// than every other group — the viewBox needs to fit whichever is tallest.
const VIEW_H = SUBGRAPH_TOP + Math.max(...SUBGRAPHS.map((sg) => sg.height)) + 30;

const NODE_POSITIONS: Record<string, { x: number; y: number }> = {};
for (const sg of SUBGRAPHS) {
  for (const node of sg.nodes) {
    NODE_POSITIONS[node.id] = { x: node.centerX, y: node.centerY };
  }
}

type CrossEdge = { from: string; to: string; control?: { x: number; y: number } };

// Cross-links from the mermaid source. B→O (Flutter→AppsFlyer) is dropped
// since the Mobile group's item list was fully replaced and that target
// node no longer exists. K→L→M (Docker→AWS ECS→GHCR) is dropped too: the
// DevOps list was reordered (GHCR now comes before AWS) so that chain no
// longer reads correctly, and no replacement relationship was specified.
// A→G, E→I, and E→J now skip over a whole column each (Mobile landed
// between Web/Backend, Automation landed between Backend/Database), so
// they're routed as a high arc through the clear band above the subgraphs
// instead of cutting straight through those columns. F→H still gets its
// short bypass curve so it doesn't draw straight through GraphQL.
const ARC_Y = SUBGRAPH_TOP - 30;
const CROSS_EDGES: CrossEdge[] = [
  {
    from: "A",
    to: "G",
    control: { x: (NODE_POSITIONS.A.x + NODE_POSITIONS.G.x) / 2, y: ARC_Y },
  },
  {
    from: "E",
    to: "I",
    control: { x: (NODE_POSITIONS.E.x + NODE_POSITIONS.I.x) / 2, y: ARC_Y },
  },
  {
    from: "E",
    to: "J",
    control: { x: (NODE_POSITIONS.E.x + NODE_POSITIONS.J.x) / 2, y: ARC_Y },
  },
  { from: "F", to: "H", control: { x: NODE_POSITIONS.F.x + 70, y: NODE_POSITIONS.F.y + 40 } },
  {
    from: "J",
    to: "I",
    // Database now has MSSQL Server inserted between PostgreSQL and Prisma
    // ORM, so this edge needs to bypass it the same way F→H bypasses GraphQL.
    control: {
      x: NODE_POSITIONS.J.x + 70,
      y: (NODE_POSITIONS.J.y + NODE_POSITIONS.I.y) / 2,
    },
  },
];

export function SkillArchitecture() {
  const t = useTranslations("architecture");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".arch-hub-edge", {
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        clearProps: "opacity",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 75%" },
      });

      gsap.from(".arch-hub", {
        opacity: 0,
        y: 10,
        duration: 0.45,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 75%" },
      });

      gsap.from(".arch-subgraph", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 75%" },
      });

      gsap.from(".arch-item", {
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
        delay: 0.3,
        clearProps: "opacity",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 75%" },
      });

      gsap.from(".arch-cross-edge", {
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.6,
        clearProps: "opacity",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 75%" },
      });
    }, wrapperRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mt-24" ref={wrapperRef}>
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-2xl font-bold tracking-tight">{t("title")}</h3>
        <p className="mt-3 text-base text-[var(--muted-foreground)]">{t("subtitle")}</p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mx-auto block"
          style={{ minWidth: 900, height: "auto" }}
        >
          <defs>
            <marker
              id="arch-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-foreground)" />
            </marker>
          </defs>

          {/* hub -> subgraph edges */}
          {SUBGRAPHS.map((sg) => (
            <line
              key={`hub-${sg.key}`}
              className="arch-hub-edge"
              x1={HUB.x}
              y1={HUB.y + HUB.r}
              x2={sg.centerX}
              y2={SUBGRAPH_TOP - 2}
              stroke={sg.colors.stroke}
              strokeWidth={2}
              strokeOpacity={0.55}
              markerEnd="url(#arch-arrow)"
            />
          ))}

          {/* cross-links between specific nodes */}
          {CROSS_EDGES.map((edge) => {
            const from = NODE_POSITIONS[edge.from];
            const to = NODE_POSITIONS[edge.to];
            if (!from || !to) return null;
            const cx = edge.control?.x ?? (from.x + to.x) / 2;
            const cy = edge.control?.y ?? (from.y + to.y) / 2;
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                className="arch-cross-edge"
                d={`M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                strokeOpacity={0.7}
                markerEnd="url(#arch-arrow)"
              />
            );
          })}

          {/* hub */}
          <g className="arch-hub">
            <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="var(--accent)" />
            <text x={HUB.x} y={HUB.y + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill="#ffffff">
              Vanda
            </text>
          </g>

          {/* subgraph clusters */}
          {SUBGRAPHS.map((sg) => (
            <g key={sg.key} className="arch-subgraph">
              <rect
                x={sg.left}
                y={SUBGRAPH_TOP}
                width={COL_WIDTH}
                height={sg.height}
                rx={14}
                fill="var(--glass-bg)"
                stroke="var(--glass-border)"
                strokeWidth={1.25}
                strokeDasharray="5 4"
              />
              <text
                x={sg.centerX}
                y={SUBGRAPH_TOP + 23}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill={sg.colors.stroke}
              >
                {t(`categories.${sg.key}`)}
              </text>

              {sg.nodes.map((node) => (
                <g key={node.id} className="arch-item">
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx={8}
                    fill={sg.colors.fill}
                    stroke={sg.colors.stroke}
                    strokeWidth={1.25}
                  />
                  <text
                    x={node.centerX}
                    y={node.centerY + 4}
                    textAnchor="middle"
                    fontSize={11.5}
                    fontWeight={600}
                    fill={sg.colors.text}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
