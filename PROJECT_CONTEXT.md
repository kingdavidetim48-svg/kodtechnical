# Project Context — KOD Technical Services Website Rebuild

## 1. Project Overview & Objectives
- **Client**: KOD Technical Services
- **Industry**: Oil & Gas Servicing, Rotating Equipment Engineering, Industrial Procurement
- **Headquarters**: #41 Stellian Road, Off Elelenwo, Port-Harcourt, Rivers State, Nigeria
- **Existing Site**: https://kodtechnical.com (WordPress + Blocksy Charity template)
- **Problem Statement**: The current website undermines the company's credibility. It was deployed over an uncleaned charity starter template containing "Donate Now", Latin dummy copy, children's life charity programs, fake volunteer staff, broken `tel:` / `mailto:` links, empty client lists, and a dead Google Docs link for client job history.
- **Objective**: Execute a complete, enterprise-grade redesign and rebuild into a modern, cinematic, high-performance, responsive industrial engineering web application.
- **Target Launch Date**: October 31, 2026 (Absolute Deadline: November 1, 2026).

---

## 2. Technical Stack & Architectural Decisions (Chapter 3 — CONFIRMED)

### Architecture Decision: Next.js 15 App Router + Tailwind CSS + TypeScript

**Decision recorded**: 2026-10-29

**Rationale**:
The project directory already contained a properly scaffolded Next.js 15 application with TypeScript, Tailwind CSS, and all required design-system tokens. Chapter 3 confirmed, validated, extended, and verified this foundation rather than replacing it.

The chosen stack is the correct fit for this project because:

1. **Next.js 15 (App Router)**: Static site generation for all marketing pages (zero server cost at launch), streaming SSR available for dynamic routes (quotation forms, future API endpoints), built-in image optimization for heavy industrial photography in Chapter 9, and native TypeScript support.
2. **TypeScript (strict mode)**: Enforces correctness across a 12-chapter build with multiple contributors and a hard deadline. `strict: true` catches interface mismatches early.
3. **Tailwind CSS v3**: Utility-first with a custom industrial token theme that directly mirrors `DESIGN_SYSTEM.md`. Every color, spacing value, shadow, and radius is mapped as a Tailwind extension. No second visual system was introduced.
4. **`clsx` + `tailwind-merge`**: Clean conditional class composition without runtime CSS-in-JS overhead.
5. **Lucide React**: Tree-shaken SVG icon library; zero build-time registration required.
6. **`next/font/google`**: Google Fonts (Syne, Inter, JetBrains Mono) self-hosted via Next.js font optimization — no external font requests, no layout shift, GDPR-friendly.

**Deliberately excluded**:
- No database, CMS, or authentication infrastructure (not required for a company marketing site).
- No Framer Motion or React Three Fiber at this stage (reserved for Chapters 7–9).
- No React Hook Form / Zod at this stage (reserved for Chapter 8 — quotation forms).
- No Resend / SMTP credentials configured (reserved for Chapter 8 after client provides credentials).

---

### Framework: Next.js 15 (React 19, App Router)
- **Language**: TypeScript (strict type checking, no careless `any`)
- **Styling**: Tailwind CSS v3 with custom industrial token theme
- **Animations (future)**: Framer Motion — Chapter 7
- **3D Hero (future)**: React Three Fiber — Chapter 7
- **Icons**: Lucide React
- **Forms (future)**: React Hook Form + Zod — Chapter 8
- **Email (future)**: Resend / SMTP via Server Actions — Chapter 8
- **SEO**: Dynamic OpenGraph, Twitter Cards, JSON-LD — Chapter 10

---

## 3. Approved Visual Identity & Design System (Chapter 2)
- **Aesthetic Direction**: Heavy Industrial Precision & Telemetry Contrast. Dark oceanic navy canvas (`#050814`, `#0A1128`, `#101C3D`) balanced with high-contrast Technical White (`#F8FAFC`), Muted Platinum (`#CBD5E1`), and Safety Amber (`#F59E0B` / `#D97706`).
- **Typography Scale**:
  - Primary Display / Headings: `Syne` (Bold, geometric mechanical presence)
  - Body & Form Controls: `Inter` (Optimized readability and tabular numbers)
  - Technical Badges & Telemetry: `JetBrains Mono` (Equipment standards API 610, ISO tolerances, metrics)
- **Component System**: Implemented in `src/components/ui/` and `src/components/layout/`
- **Isolated Design Preview**: `design-system-preview.html` remains available for standalone review.

---

## 4. Directory Structure (Chapter 3 — Established)

```
warriman/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design-system CSS custom properties + Tailwind layers
│   │   ├── layout.tsx           # Root layout: fonts, metadata, Header, Footer
│   │   ├── page.tsx             # Foundation page (Chapter 3 proof)
│   │   └── not-found.tsx        # 404 handling
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx       # Sticky navigation: logo, nav links, hotline pill, quote CTA
│   │   │   └── footer.tsx       # 4-column footer: brand, services, contacts, legal bar
│   │   └── ui/
│   │       ├── badge.tsx        # Technical equipment tags (amber/cyan/green/neutral)
│   │       ├── button.tsx       # 4-variant button (primary/secondary/ghost/outline)
│   │       ├── container.tsx    # Responsive content container (default/narrow/prose/full)
│   │       └── section-heading.tsx  # Kicker + H2 + subtitle with aria-labelledby support
│   └── lib/
│       ├── constants.ts         # COMPANY_INFO, NAVIGATION_LINKS, ENGINEERING_SERVICES (11 services)
│       └── utils.ts             # cn() — clsx + tailwind-merge
├── design-system-preview.html   # Standalone HTML design system preview (Chapter 2)
├── eslint.config.mjs            # ESLint flat config (next/core-web-vitals + next/typescript)
├── tailwind.config.ts           # Extended Tailwind theme: all design tokens, spacing, radii
├── tsconfig.json                # TypeScript strict mode, @/* path alias
├── next.config.ts               # reactStrictMode, poweredByHeader: false, avif/webp images
├── postcss.config.mjs           # Tailwind + autoprefixer
├── .env.example                 # Safe env variable template (no real credentials)
├── .gitignore                   # Standard Next.js ignore list
├── package.json                 # Dependencies and scripts
└── PROJECT_CONTEXT.md / DESIGN_SYSTEM.md / IMPLEMENTATION_STATUS.md / TESTING.md / CHANGELOG.md
```

---

## 5. Information Architecture & Route Map
- `/` — **Homepage**: Industrial 3D hero, core value proposition, rotating equipment showcase, statistics, interactive service grid, company overview teaser, client proof, quote CTA, verified contact links.
- `/about` — **About Us**: Company history, C.O.R.E values (Commitment, Operational Excellence, Reliability, Excellence), mission, vision, Port-Harcourt facility & machine shop overview, leadership and engineering standards.
- `/services` — **Services Overview**: Comprehensive categorized grid of all 11 core technical disciplines.
- `/services/[slug]` — **Individual Service Pages**: 11 slugs defined in `ENGINEERING_SERVICES` constant.
- `/projects` — **Projects & Case Studies**: Verified track record, rotating equipment overhauls, rig-site interventions, categorized filtering.
- `/contact` — **Contact & Facility**: Interactive inquiry form, verified phone numbers, direct email, physical location map, emergency hotline, service inquiry routing.
- `/quote` — **Request a Quotation**: Multi-step technical quotation builder.

---

## 6. Key Constraints & Non-Negotiables
1. **Zero Fake Content**: No fabricated client testimonials, fake team personas, or invented certifications. Clearly distinguish verified facts from pending items.
2. **Operational Contacts**: Phone and WhatsApp links must dial actual Port-Harcourt numbers: `+234(0)8037270249` and `+234(0)8071771174`. Emails must link to `info@kodtechnical.com`.
3. **Real Deliverability**: Contact and quote submissions must execute real server-side validation and deliver to the verified endpoint. No fake successful submissions.
4. **Accessibility & Performance**: Target Lighthouse score ≥ 90 across Performance, Accessibility, Best Practices, and SEO. Respect `prefers-reduced-motion`.
5. **No Broken Links**: Every link, button, and anchor must have a designated, functional destination.

---

## 7. Development Commands Reference
- **Run design system preview**: Open `design-system-preview.html` in browser or `python -m http.server 3000`
- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev` → http://localhost:3000
- **Type checking**: `npm run type-check` (alias: `npx tsc --noEmit`)
- **Linting**: `npm run lint`
- **Production build**: `npm run build`
- **Start production server**: `npm run start` (after `npm run build`)

---

## 8. Environment Variables
Copy `.env.example` to `.env.local` and populate before Chapter 8 (forms & email):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAIL_PROVIDER=SMTP
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@kodtechnical.com
SMTP_PASS=<provided by client>
NOTIFICATION_RECIPIENT=info@kodtechnical.com
FORM_SECRET_SALT=<generate a secure random string>
```

**Never commit `.env.local` to Git.** The `.gitignore` already excludes it.

---

## 9. Pending Client Deliverables (Blockers for Later Chapters)
1. **High-Resolution Logo Master**: Vector file (.svg, .ai, or high-res transparent PNG) from CEO.
2. **Client Roster & Permissions**: 4–8 authentic enterprise clients for the "Our Clients" section.
3. **Downloadable Company Profile PDF**: Authentic capability statement / company brochure.
4. **On-Site Photography**: High-resolution photos of the Port Harcourt facility, machine shop, and field technicians.
5. **Form Submission Credentials**: Preferred transactional email credentials (Resend API key or SMTP) for Chapter 8.
