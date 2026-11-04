# Chapter 10 Audit Plan: Full Production Readiness, Functional QA & Security Audit

**Target:** KOD Technical Services Website Rebuild  
**Workspace:** `C:\Users\LOYAL\Desktop\WEB\warriman`  
**Execution Date:** November 3, 2026  
**Auditor:** Senior Full-Stack, Security & Technical SEO Auditor  

---

## 1. Scope and Objectives
The objective of Chapter 10 is to independently establish whether the KOD Technical Services website is genuinely ready for deployment. This requires moving beyond high-level documentation and verifying real code, real runtime behavior, edge vulnerabilities, functional usability, and configuration boundaries.

---

## 2. Audit Matrix & Planned Actions

### Phase A: Chapter 9 Claims Verification & Discrepancy Reconciliation
1. **Route Inventory Reconciliation:**
   - Audit the exact mathematical breakdown of:
     - 18 indexable content pages (`sitemap.xml`)
     - 21 static application endpoints
     - 22 functional routes (including dynamic `POST /api/rfq`)
     - 24 build artifacts in `next build`
2. **Metadata & Entity Verification:**
   - Verify unique `<title>`, `<meta name="description">`, and `<link rel="canonical">` across all 18 pages.
   - Verify `src/components/seo/json-ld.tsx` to confirm no telephone numbers or emails are mistakenly mapped into geographic coordinate structures (`geo`).
   - Validate Open Graph image (`public/images/brand/og-image.jpg`) loading, dimensions, and visual fidelity.
   - Verify `robots.txt` and ensure `not-found.tsx` has `robots: { index: false }`.

### Phase B: Full Functional Testing Across 5 Viewports
1. **Interactive Navigation:**
   - Desktop header navigation and active indicator styling.
   - Mobile navigation drawer open/close, backdrop blur, Escape key listener.
   - Footer links, telephone links (`tel:`), email links (`mailto:`), WhatsApp action (`wa.me`).
   - Google Maps link verification with verified Port Harcourt address.
2. **Responsive Verification Matrix:**
   - 360px (Small Mobile: Galaxy S8)
   - 390px (Standard Mobile: iPhone 12/13/14)
   - 768px (Tablet Portrait: iPad Mini)
   - 1024px (Tablet Landscape / Small Laptop)
   - 1440px (High-Resolution Desktop)

### Phase C: RFQ Security & Reliability Deep-Dive (16 Test Scenarios)
1. **Stream Bounding Before Memory Parsing:**
   - Enhance `POST /api/rfq` to check `Content-Length` header upfront and stream-bound request body with hard 64 KB cap using `ReadableStream` reader before buffering.
2. **Pre-Stream Rate Limiting:**
   - Move client IP rate limit check to the very beginning of the route handler to drop abusive clients before consuming request streams or memory.
3. **True Distributed Idempotency Support:**
   - Enhance duplicate detection in `POST /api/rfq`: when Upstash Redis is configured, issue atomic `SET NX EX 60` for cluster-wide idempotency; fallback to in-process memory cache only for dev/testing.
4. **Execution of 16 Specific Security Tests:**
   - Valid submission, missing required fields, invalid emails/phones, invalid service slug, payload > 64 KB, wrong Content-Type, malformed JSON, XSS in body, CRLF injection in headers, honeypot, rapid burst, duplicate submissions, rate limiting 429, missing credentials, timeout handling, and unconfigured environment fallback.

### Phase D: Accessibility & Usability Verification
- Semantic elements, form labels, `aria-invalid`, `aria-describedby`, keyboard tab navigation, visible focus rings, touch targets >= 44px, and `prefers-reduced-motion` compliance.

### Phase E: Business Content & Integrity Audit
- Verify absence of fake testimonials, unapproved client logos (quarantine intact), unverified certifications, or 24/7 service claims. Verify NDA disclaimer on Projects page.

### Phase F: Final Quality Gates & Verdict
- Run `npm run type-check`, `npm run lint`, `npm run build`.
- Issue unambiguous verdict (`READY WITH CONDITIONS`) detailing exact client dependencies.

