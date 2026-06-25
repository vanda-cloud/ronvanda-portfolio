# 📚 Changelog

All notable changes to **Ron Vanda Portfolio** are documented here.

---

## 🚀 3.0.0 (25-Jun-2026)
[![Author](https://img.shields.io/badge/Author-Ron%20Vanda-green?style=flat-round&logo=github)](https://github.com/vanda-cloud)
![Start Date](https://img.shields.io/badge/Start%20Date-20%20Jun%202026-lightgrey?style=flat-round&logo=readme)
![Release Date](https://img.shields.io/badge/Release%20Date-25%20Jun%202026-blue?style=flat-round&logo=rocket)
![Version](https://img.shields.io/badge/Version-3.0.0-brightgreen?style=flat-round&logo=semanticrelease)

### 🌱 New Feature

#### Core & Infrastructure
- feat(scaffold): initialize Next.js 16 App Router project with TypeScript and Tailwind v4 CSS-first config
- feat(background): neural network particle background — 48 floating nodes, signal pulses along edges every 350–1000ms (up to 16 active), floating hex labels on signal arrival; dark/light aware via `globalFade`
- feat(cursor): magic wand cursor effect — fixed canvas at z-index 9999 with `pointer-events-none`, wand-tip gold/violet radial glow, 3–5 star/dot sparkles per `mousemove` with physics (upward velocity, gravity, rotation, fade)
- feat(i18n): implement 4-language support (English, Khmer, Japanese, Chinese) via `next-intl` with cookie-based locale detection — no URL prefix, no page reload
- feat(theme): dark / light / system theme switcher via `next-themes` with Radix UI dropdown
- feat(fonts): self-host Roboto (Latin) and Kantumruy Pro (Khmer) via `next/font/google`
- feat(smooth-scroll): integrate Lenis smooth scroll synced to GSAP ScrollTrigger via ticker
- feat(pwa): Progressive Web App setup — `src/app/manifest.ts`, `public/sw.js`, `PwaRegister` client component, and `scripts/generate-icons.mjs` icon generation script using `sharp`

#### Layout
- feat(navbar): floating glass-pill navbar with scrollspy active section tracking, gradient underline on hover/active, hamburger mobile menu with 11-item expandable dropdown, scroll-reactive background
- feat(footer): standalone `<footer>` component with animated heart Lottie (animation-heart.json), firework sparkling effect on click (3-phase: 55 ground burst + 6 rockets × 22 hearts + 20 falling hearts), and "Ron Vanda" linked to GitHub
- feat(footer): version badge `v3.0.0` with release date pill in footer
- feat(footer): release notes modal — auto-shows once on first visit (localStorage tracks seen version), GSAP entrance/exit animation, shake-on-backdrop-click (no dismiss outside), closeable via ✕ button or "Got it"

#### Sections
- feat(hero): liquid glass hero section — greeting, gradient name, typing role animation (accent color), comprehensive tagline across 4 locales, CTA buttons, GSAP parallax robot, liquid blob background
- feat(hero): integrate Spline 3D robot scene (`@splinetool/react-spline`) with transparent background and Spotlight effect
- feat(hero): hero-wide Spline robot mouse tracking — dispatches `PointerEvent("pointermove")` to Spline canvas on section `mousemove` so the robot follows the cursor from anywhere on the hero
- feat(hero): 10% glass backdrop behind Spline robot via a separate `pointer-events-none` absolute div — preserves Spline interactivity
- feat(hero): scroll-down indicator with `ChevronDown` bounce animation scrolling to `#about`
- feat(about): new About Me section between Hero and Skills — 3D tilt stat cards (count-up animation, GSAP spotlight glow), bio paragraph, and LinkedIn Profile button
- feat(skills): 9 skill cards grid with GSAP stagger scroll-reveal (`clearProps` fix for backdrop-filter blur)
- feat(skills): tech stack badges section using shields.io badges organized in 4 categories (Platform, Tech Stack, Deployment, Project Management) with Lucide icons on category pills
- feat(skills): custom SVG skill architecture diagram — 9 domains (Desktop, Web, Mobile, Backend, Automation Workflows, Database, Tools, DevOps, DevSecOps), hub-and-spoke layout with individual colored node boxes, dashed subgraph containers, bezier cross-link curves with bypass routing, GSAP stagger reveal
- feat(experience): vertical timeline with scrubbed GSAP progress line, scrollspy dot activation (cumulative keep behavior)
- feat(experience): sticky programmer Lottie (programmer.json) alongside timeline in 2-col layout — slides in from left on scroll
- feat(experience): per-item tech tag pills for all 8 experience entries
- feat(experience): promoted badge for e4 — emerald `TrendingUp` badge "Promoted · Dec 2014"
- feat(projects): featured projects section with glass-panel cards and tilt-in stagger animation
- feat(projects): add VnC POS — multi-tenant full-stack POS (NestJS, Next.js, Flutter, GraphQL, PostgreSQL, Redis)
- feat(projects): add VnC PMS — petroleum station management system (Flutter, ASP.NET Core, SignalR, Firebird, Windows Service)
- feat(contact): contact section with social icons (Facebook, Telegram, LinkedIn, Instagram, GitHub), bouncy GSAP icon pop-in, programming Lottie animation (programming-computer.json)
- feat(scroll-to-top): scroll-to-top button with Lottie animation (scroll-up.json), appears after 300px scroll

### 🧩 Improvement
- refactor(i18n): drop `[locale]` route segment entirely — plain `app/layout.tsx` with `Accept-Language` header + cookie fallback
- feat(hero): expand hero tagline and metadata description across all 4 locales to cover full skill breadth — Flutter mobile, Next.js & ASP.NET Core web, .NET desktop, NestJS backend, PostgreSQL/Redis/DynamoDB, Docker/AWS DevOps, CI/CD automation, DevSecOps pipeline
- feat(hero): update typing roles to 5 items — Full-Stack Engineering, Mobile, Web, and Desktop Development, DevOps & DevSecOps, Cloud Architecture, Technical Leadership
- feat(skills): add section header icons — `Zap` (Skills), `Briefcase` (Experience), `FolderCode` (Projects), `MessageCircle` (Contact)
- feat(skills): replace Collaboration card with DevSecOps card (`ShieldCheck` icon); move Git & GitHub into Project Management card
- feat(skills): add Internal Vulnerability Assessment, Web Application Penetration Test, Mobile Application Penetration Test to DevSecOps architecture group
- feat(skills): expand all 9 skill card descriptions across all 4 locales
- feat(hero): change typing animation text color from `muted-foreground` to `accent`
- feat(navbar): add "about" nav item; Khmer language font-size bump via `html[lang="km"]` CSS selectors
- feat(footer): firework heart effect — spread to screen center with 3-phase burst, 60 hearts → 207 hearts per click with 10-color palette
- feat(footer): translate footer text (Made with / by / All rights reserved) across all 4 locales
- feat(footer): release notes modal — backdrop click shows GSAP shake animation instead of closing
- feat(experience): e4 period updated to "Jun — Dec 2014" with desc noting 6-month promotion
- feat(projects): unique tech tags per project card; update subtitle to "Enterprise systems I've designed, built, and shipped."

### 🧪 Bug Fix
- fix(middleware): rename conflicting `middleware.ts` to `.bak` to resolve locale detection double-routing issue
- fix(pwa): restrict service worker registration to production only — prevents HMR request interception hanging dev server
- fix(contact): restore missing `Lottie` import after footer refactor caused `ReferenceError: Lottie is not defined`
- fix(gsap): add `clearProps: "transform,opacity"` to all scroll-reveal tweens — fixes glass-panel `backdrop-filter` blur recompute bug in Chrome/Safari
- fix(skills): use high-arc routing (ARC_Y=140) for cross-link bezier edges A→G, E→I, E→J to clear intervening columns after Mobile column insertion
- fix(skills): add bypass curve for J→I and F→H edges to avoid node overlap after Database reorder
- fix(skills): fix Canva badge logo — was `logo=figma`, corrected to `logo=canva`
- fix(light-mode): `--glass-border` was `rgba(255,255,255,0.6)` — invisible white border on light background; changed to `rgba(79,82,232,0.16)` (indigo tint)
- fix(light-mode): improve `--background`, `--foreground`, `--muted-foreground`, `--accent`, `--glass-bg`, `--glass-strong`, `--glass-shadow` for better light mode contrast
- fix(contact): widen `IconComponent` type to `() => any` to resolve `ForwardRefExoticComponent` assignment error
- fix(hero): use `PointerEvent("pointermove")` instead of `MouseEvent("mousemove")` — Spline only responds to pointer events

### 🛡️ Security
- feat(devsecops): document full DevSecOps coverage in skill architecture — Secret Scanning, SAST, Dockerfile Lint, IaC Scan, SCA, License Compliance, Image Scan, SBOM, IVA, WAPT, MAPT
- feat(pwa): service worker cache-first strategy with version-keyed cache and stale cache cleanup on activate

### 📖 Documentation
- doc(changelog): add `CHANGELOG.md` for v3.0.0 initial release
- chore(i18n): add `footer` translation namespace to all 4 locale files (en/km/ja/zh)
- chore(i18n): add comprehensive hero tagline, metadata title/description across all 4 locales
- chore(package): add `generate:icons` script — `node scripts/generate-icons.mjs` to derive all PWA icon sizes from `public/icon-source.png`



## 🚀 2.0.0 (2024)
> Previous version — static HTML/CSS personal site hosted at [ronvanda.com](https://www.ronvanda.com)



## 🚀 1.0.0 (2023)
> First version — initial personal portfolio.
