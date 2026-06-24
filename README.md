<a name="___top"></a>
<div align="center">

<!-- Welcome Typing Animation -->
# [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=23&weight=500&pause=1000&center=true&vCenter=true&width=600&lines=WELCOME+TO+RON+VANDA+PORTFOLIO;FULL-STACK+ENGINEER+%7C+DEVOPS+%7C+DEVSECOPS;FLUTTER+%7C+NEXT.JS+%7C+ASP.NET+CORE+%7C+.NET)](#)

<!-- Profile Photo -->
<img src="public/icon-source.png" width="160px" alt="Ron Vanda" style="border-radius: 50%; border: 3px solid #818cf8;" />
<h1 align="center">🧑‍💻 Ron Vanda — Portfolio v3.1.0</h1>

<!-- Author -->
<a href="https://github.com/vanda-cloud" target="_blank">
  <img src="https://img.shields.io/badge/Author-Ron%20Vanda-green?style=flat-round&logo=github" alt="Ron Vanda" />
</a>
<!-- Next.js Version -->
<a href="https://nextjs.org/" target="_blank">
  <img src="https://img.shields.io/badge/Next.js-v16-black?style=flat-round&logo=nextdotjs&logoColor=white" alt="Next.js" />
</a>
<!-- Vercel -->
<a href="https://vercel.com/" target="_blank">
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-round&logo=vercel&logoColor=white" alt="Vercel" />
</a>
<!-- PWA -->
<a href="./src/app/manifest.ts" target="_blank">
  <img src="https://img.shields.io/badge/PWA-Enabled-brightgreen?style=flat-round&logo=pwa&logoColor=white" alt="PWA" />
</a>
<!-- i18n -->
<a href="./messages/" target="_blank">
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20KM%20%7C%20JA%20%7C%20ZH-blue?style=flat-round&logo=googletranslate&logoColor=white" alt="i18n" />
</a>
<!-- Changelog -->
<a href="./CHANGELOG.md" target="_blank">
  <img src="https://img.shields.io/badge/Changelog-v3.1.0-orange?style=flat-round&logo=git" alt="Changelog" />
</a><br/>

<!-- Tech Stack -->
<img src="https://img.shields.io/badge/Tech%20Stack-gray?style=flat-round&logo=stackshare&logoColor=white" alt="Tech Stack" />
<a href="https://nextjs.org/" target="_blank">
  <img src="https://img.shields.io/badge/-Next.js-02569B?style=flat-round&logo=nextdotjs&logoColor=white" alt="Next.js" />
</a>
<a href="https://flutter.dev/" target="_blank">
  <img src="https://img.shields.io/badge/-Flutter-02569B?style=flat-round&logo=flutter&logoColor=white" alt="Flutter" />
</a>
<a href="https://dotnet.microsoft.com/" target="_blank">
  <img src="https://img.shields.io/badge/-.NET-02569B?style=flat-round&logo=dotnet&logoColor=white" alt=".NET" />
</a>
<a href="https://nestjs.com/" target="_blank">
  <img src="https://img.shields.io/badge/-NestJS-02569B?style=flat-round&logo=nestjs&logoColor=white" alt="NestJS" />
</a>
<a href="https://www.docker.com/" target="_blank">
  <img src="https://img.shields.io/badge/-Docker-02569B?style=flat-round&logo=docker&logoColor=white" alt="Docker" />
</a>
<a href="https://aws.amazon.com/" target="_blank">
  <img src="https://img.shields.io/badge/-AWS-02569B?style=flat-round&logo=icloud&logoColor=white" alt="AWS" />
</a>
<a href="https://www.postgresql.org/" target="_blank">
  <img src="https://img.shields.io/badge/-PostgreSQL-02569B?style=flat-round&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</a>
<a href="https://redis.io/" target="_blank">
  <img src="https://img.shields.io/badge/-Redis-02569B?style=flat-round&logo=redis&logoColor=white" alt="Redis" />
</a>

</div>

<h1></h1>

<!-- Quick Access -->
### Quick Access
- <a href="#Overview">Overview</a>
- <a href="#Tech-Stack">Tech Stack</a>
- <a href="#Project-Structure">Project Structure</a>
- <a href="#Features">Features</a>
- <a href="#Localization">Localization</a>
- <a href="#PWA">Progressive Web App</a>
- <a href="#DevSecOps">DevSecOps</a>
- <a href="#Getting-Started">Getting Started</a>

---

<!-- Overview -->
<a name="Overview"></a>
## 💡 [Overview &#9650;](#___top "click to go to top of document")

**Ron Vanda Portfolio v3.1.0** is a personal portfolio website built with **Next.js 16 App Router**, **Tailwind v4**, and **TypeScript**. It showcases full-stack engineering expertise across mobile, web, desktop, DevOps, and DevSecOps — delivered with Apple-inspired **Liquid Glass UI**, smooth scroll animations, a 3D robot hero, neural network particle background, magic wand cursor, and full PWA support.

The site supports **4 languages** (English, Khmer, Japanese, Chinese) via cookie-based locale switching with no URL prefix and no page reload.

Live: **[ronvanda.com](https://www.ronvanda.com)**

---

<!-- Tech Stack -->
<a name="Tech-Stack"></a>
## 🎯 [Tech Stack &#9650;](#___top "click to go to top of document")

| Next.js | TypeScript | Tailwind v4 | GSAP | Lenis | Spline | Lottie | next-intl | next-themes | Vercel |
| ------- | ---------- | ----------- | ---- | ----- | ------ | ------ | --------- | ----------- | ------ |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

<!-- Project Structure -->
<a name="Project-Structure"></a>
## 📂 [Project Structure &#9650;](#___top "click to go to top of document")

```bash
ronvanda-portfolio/               # Project root
├── .github/
│   └── workflows/                # GitHub Actions CI/CD
├── messages/                     # i18n locale files
│   ├── en.json                   # English
│   ├── km.json                   # Khmer
│   ├── ja.json                   # Japanese
│   └── zh.json                   # Chinese
├── public/
│   ├── icons/                    # PWA icon set (all sizes)
│   ├── icon-source.png           # Source icon (1024×1024)
│   └── sw.js                     # Service worker
├── scripts/
│   └── generate-icons.mjs        # PWA icon generator (sharp)
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + PWA meta
│   │   ├── page.tsx              # Main page composition
│   │   ├── manifest.ts           # Web app manifest
│   │   └── globals.css           # Tailwind v4 + CSS variables
│   ├── assets/
│   │   └── lottie/               # Lottie JSON animations
│   │       ├── animation-heart.json
│   │       ├── programmer.json
│   │       ├── programming-computer.json
│   │       └── scroll-up.json
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx        # Floating glass-pill navbar
│   │   │   └── footer.tsx        # Footer with heart firework
│   │   ├── providers/
│   │   │   ├── theme-provider.tsx
│   │   │   ├── smooth-scroll-provider.tsx
│   │   │   └── pwa-register.tsx
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx         # About Me — stat cards, bio, LinkedIn
│   │   │   ├── skills.tsx
│   │   │   ├── skill-architecture.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── projects.tsx
│   │   │   └── contact.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── brand-icons.tsx
│   │       ├── magic-cursor.tsx  # Magic wand sparkle cursor effect
│   │       ├── particle-background.tsx  # Neural network canvas background
│   │       ├── release-notes-modal.tsx
│   │       ├── scroll-to-top.tsx
│   │       ├── spline-scene.tsx
│   │       ├── spotlight.tsx
│   │       └── typing-text.tsx
│   ├── i18n/
│   │   └── request.ts            # next-intl server config
│   └── lib/
│       ├── gsap.ts               # GSAP + ScrollTrigger setup
│       └── utils.ts              # cn() helper
├── CHANGELOG.md
├── README.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

<!-- Features -->
<a name="Features"></a>
## 📌 [Features &#9650;](#___top "click to go to top of document")

| No. | Feature | Description |
| --- | ------- | ----------- |
| 1. | ✅ Liquid Glass UI | Apple-inspired glassmorphism with `backdrop-filter` blur and CSS variable theming |
| 2. | ✅ Dark / Light / System Theme | Three-way theme toggle via `next-themes` with Radix UI dropdown |
| 3. | ✅ 4-Language Support | English, Khmer, Japanese, Chinese — cookie-based, instant switch |
| 4. | ✅ 3D Robot Hero | Spline 3D scene with hero-wide mouse tracking and GSAP parallax scroll |
| 5. | ✅ Neural Network Background | Canvas particle background — 48 nodes, signal pulses, floating hex labels |
| 6. | ✅ Magic Wand Cursor | Star/dot sparkles with wand-tip glow following the cursor |
| 7. | ✅ About Me Section | 3D tilt stat cards with count-up animation, bio, and LinkedIn button |
| 8. | ✅ Skill Architecture Diagram | Custom SVG flowchart — 9 domains, hub-and-spoke, bezier cross-links |
| 9. | ✅ Smooth Scroll | Lenis smooth scroll synced to GSAP ScrollTrigger |
| 10. | ✅ Experience Timeline | Tech tags per entry, promoted badge, scrubbed progress line, scrollspy dots |
| 11. | ✅ Progressive Web App (PWA) | Installable on all platforms with service worker caching |
| 12. | ✅ Release Notes Modal | Auto-shows on first visit, GSAP shake on backdrop click |
| 13. | ✅ Heart Firework Effect | 3-phase GSAP firework — 207 hearts per click spanning full viewport |
| 14. | ✅ Scroll-to-Top | Lottie-animated scroll-to-top button |
| 15. | ✅ Typing Animation | Role cycling with blinking accent cursor |

---

<!-- Localization -->
<a name="Localization"></a>
## 🌐 [Localization &#9650;](#___top "click to go to top of document")

All UI text is managed via `next-intl` with no URL prefix. Locale is persisted in a cookie (`NEXT_LOCALE`) and detected on first visit from the `Accept-Language` header.

| Language | Code | File |
| -------- | ---- | ---- |
| English  | `en` | `messages/en.json` |
| Khmer    | `km` | `messages/km.json` |
| Japanese | `ja` | `messages/ja.json` |
| Chinese  | `zh` | `messages/zh.json` |

To add a new locale, add the language file under `messages/` and register the code in `src/i18n/request.ts`.

---

<!-- PWA -->
<a name="PWA"></a>
## 📱 [Progressive Web App &#9650;](#___top "click to go to top of document")

This site is fully installable as a PWA on all platforms.

### Generating Icons

Place your 1024×1024 source image at `public/icon-source.png`, then run:

```bash
npm run generate:icons
```

This generates all required sizes under `public/icons/` using `sharp`:

| File | Size | Purpose |
| ---- | ---- | ------- |
| `favicon-16.png` | 16×16 | Browser tab |
| `favicon-32.png` | 32×32 | Browser tab |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `icon-192.png` | 192×192 | Android / PWA |
| `icon-512.png` | 512×512 | PWA splash |
| `icon-192-maskable.png` | 192×192 | Android adaptive |
| `icon-512-maskable.png` | 512×512 | Android adaptive |
| `ms-tile-150.png` | 150×150 | Windows tile |

> ⚠️ The service worker only registers in **production** (`NODE_ENV=production`) to avoid interfering with Next.js HMR in development.

---

<!-- DevSecOps -->
<a name="DevSecOps"></a>
## 🔐 [DevSecOps &#9650;](#___top "click to go to top of document")

Security practices documented and applied in this project:

| Domain | Tools / Practices |
| ------ | ----------------- |
| Secret Scanning | Gitleaks |
| SAST | Semgrep |
| Dockerfile Lint | Hadolint |
| IaC Scan | Checkov |
| SCA | OWASP Dependency-Check |
| License Compliance | dotnet-project-licenses |
| Image Scan | Trivy |
| SBOM | Syft |
| IVA | Internal Vulnerability Assessment |
| WAPT | Web Application Penetration Test |
| MAPT | Mobile Application Penetration Test |

---

<!-- Getting Started -->
<a name="Getting-Started"></a>
## 🚀 [Getting Started &#9650;](#___top "click to go to top of document")

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vanda-cloud/ronvanda-portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ronvanda-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Generate PWA icons (requires `public/icon-source.png`):
   ```bash
   npm run generate:icons
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Useful Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |
| `npm run generate:icons` | Generate all PWA icon sizes from source |

<br/>
<h1></h1>
<div align="center">
  <img src="https://img.shields.io/badge/Updated_At-24_|_Jun_|_2026-blue?style=flat-round&logo=readme" alt="Updated" />
  <img src="https://img.shields.io/badge/Maintained%20by-Ron%20Vanda-blue?style=flat-round&logo=github" alt="Maintained by Ron Vanda" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-round&logo=opensourceinitiative&logoColor=white" alt="License" />
</div>
