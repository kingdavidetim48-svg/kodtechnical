# Chapter 8 Completion Report: Production RFQ System & Lead Generation

**Project:** KOD Technical Services Website Rebuild  
**Workspace Directory:** `C:\Users\LOYAL\Desktop\WEB\warriman`  
**Execution Date:** November 2, 2026  
**Status:** **COMPLETED** (Verified across all quality gates, HTTP test suite, and viewports)  

---

## 1. Architecture Chosen

To replace the client-side `mailto:` approach with a secure, production-grade Request for Quotation (RFQ) mechanism, a stateless, server-side API architecture was implemented within the Next.js App Router:

1. **Route Handler (`POST /api/rfq`):**
   - Implemented as an authoritative server-side endpoint accepting JSON payloads up to 64 KB.
   - Enforces rate limiting, anti-spam honeypot detection, bot speed traps, and strict schema validation before processing.
   - Emits standardized HTTP status codes (200 OK, 400 Bad Request, 413 Payload Too Large, 422 Unprocessable Entity, 429 Too Many Requests, 503 Service Unavailable).
2. **Transactional Email Engine (Resend REST API):**
   - Utilizes native `fetch` with `AbortSignal.timeout(8000)` to dispatch notifications directly to the Resend REST API (`https://api.resend.com/emails`).
   - Requires **zero external npm dependencies**, keeping the client bundle completely unbloated.
   - Sets `Reply-To` automatically to the validated customer email, allowing KOD engineers to reply with a single click.
   - Operates in mock/dev simulation mode when keys are unconfigured, while returning an honest HTTP 503 in production rather than falsely reporting successful delivery.
3. **Pluggable Distributed Rate Limiting Engine:**
   - Architecture supporting distributed Upstash Redis REST (`UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`) for serverless edge and multi-region deployments.
   - Uses an in-process sliding window counter (5 requests / 10 minutes per IP) for local development and CI testing, returning RFC-standard `Retry-After`, `X-RateLimit-Limit`, and `X-RateLimit-Remaining` headers.
4. **Resilient Lead Capture (Zero-Lead-Loss Fallback):**
   - If an automated email provider failure, configuration omission, or network timeout occurs, user inputs are retained in the form state.
   - The user is presented with immediate one-click fallback channels:
     1. Pre-formatted direct email (`mailto:info@kodtechnical.com`) populated with all technical specifications and tag data.
     2. Primary phone line dialer (`tel:+2348037270249`).
     3. WhatsApp dispatch to the technical duty line (`wa.me/2348037270249`).

---

## 2. Files Created and Modified

### Created Files
- `src/app/api/rfq/route.ts` — Production REST API route handler (`POST /api/rfq`) with input validation, rate limiting, and structured JSON responses.
- `src/lib/validation/rfq.ts` — Authoritative server-side schema validation, CRLF header sanitization, international telephone verification, and service discipline whitelisting.
- `src/lib/security/rate-limit.ts` — Dual-mode rate limiting engine (Upstash Redis REST for production; sliding window fallback for dev/testing).
- `src/lib/email/sender.ts` — Server-side email delivery engine integrating Resend REST API with timeout protection and test mocking.
- `src/lib/email/templates/rfq-notification.ts` — Branded industrial HTML and clean Plaintext templates with West Africa Time (WAT) timestamps and unique reference ID generation.
- `scripts/test-rfq-api.mjs` — Automated HTTP test suite exercising 17 endpoint test cases.
- `scripts/verify-rfq-ui.mjs` — Automated Headless Chrome script capturing screenshots across 5 viewports.
- `chapter-8-completion-report.md` — This comprehensive milestone completion report.

### Modified Files
- `src/components/contact/contact-enquiry-form.tsx` — Upgraded into a full Request for Quotation interface with required and optional fields, client validation, loading states, reference ID display, and zero-lead-loss fallback actions.
- `.env.example` — Documented all required and optional environment variables for production email delivery and distributed rate limiting.
- `IMPLEMENTATION_STATUS.md` — Updated to mark Chapter 8 completed and document deliverables.
- `TESTING.md` — Appended Chapter 8 quality gate verification logs and HTTP test results.
- `CHANGELOG.md` — Documented all Chapter 8 code changes and features.

---

## 3. Email Provider Integration Details

- **Chosen Provider:** Resend (https://resend.com)
- **Integration Mechanism:** Native REST API (`POST https://api.resend.com/emails`)
- **Payload Structure:**
  - `from`: Verified sender address (e.g. `KOD Engineering Desk <quotes@kodtechnical.com>`)
  - `to`: Configured recipient inbox (`RFQ_RECIPIENT_EMAIL` / default: `info@kodtechnical.com`)
  - `reply_to`: Customer's validated email address
  - `subject`: `[KOD-RFQ-YYYYMMDD-XXXX] New RFQ: <Discipline> — <Company>`
  - `html`: High-contrast industrial HTML email with KOD brand header, client parameters, operational parameters, and technical scope.
  - `text`: Structured Plaintext fallback.
  - `tags`: Indexed tags for email categorization (`rfq_lead`, discipline slug, reference ID).
- **Error Handling:** 8-second network timeout via `AbortSignal.timeout(8000)`. Provider errors log HTTP status and error code without exposing API keys or authorization headers.

---

## 4. Required Environment Variables

All variables are documented in [`.env.example`](file:///c:/Users/LOYAL/Desktop/WEB\warriman\.env.example):

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `RESEND_API_KEY` | **Yes (Prod)** | `re_123456789_abcdef...` | Server-side authentication key for Resend REST API |
| `RFQ_SENDER_EMAIL` | **Yes (Prod)** | `"KOD Engineering Desk <quotes@kodtechnical.com>"` | Verified sender address matching the DNS-verified domain on Resend |
| `RFQ_RECIPIENT_EMAIL` | No | `info@kodtechnical.com` | Destination inbox where quotation notifications are delivered |
| `RFQ_MOCK_DELIVERY` | No | `false` | When set to `true`, simulates delivery without invoking external APIs |
| `UPSTASH_REDIS_REST_URL` | Optional | `https://your-db.upstash.io` | Upstash Redis REST endpoint for distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | `Axxxxxxxxxxxxxxx...` | Upstash Redis Bearer token for pipeline REST calls |

---

## 5. Security Controls Implemented

1. **Authoritative Server-Side Validation:** All fields are checked on the server regardless of client state. Missing fields return HTTP 422 with a structured field-to-error dictionary.
2. **Catalog Whitelisting:** The requested engineering discipline is validated against the 11 verified services in `ENGINEERING_SERVICES` from `src/lib/constants.ts`. Unrecognized inputs are rejected.
3. **CRLF Header Injection Neutralization:** Strips carriage returns (`\r`), newlines (`\n`), and tabs (`\t`) from customer names, emails, company names, phone numbers, and location strings before using them in email headers or subject lines.
4. **Anti-Spam Honeypot:** Hidden field `website_hp` (hidden visually and from screen readers via `aria-hidden="true"` and `tabIndex={-1}`). Submissions containing a value in this field are flagged as spam and rejected with HTTP 400.
5. **Bot Speed-Trap Timing:** The client records a mount timestamp; submissions sent in less than 2.0 seconds are flagged as automated bot scripts and rejected.
6. **Rate Limiting:** Enforces a limit of 5 submissions per 10-minute window per IP. Excess requests receive HTTP 429 with standard `Retry-After: 600` headers.
7. **Payload Size Defense:** Rejects bodies exceeding 64 KB with HTTP 413 Payload Too Large.
8. **Credential Safety:** `RESEND_API_KEY` and Redis tokens are exclusively accessed in server-side modules (`src/lib/email/sender.ts`, `src/lib/security/rate-limit.ts`) and never exposed in client bundles.

---

## 6. Test Cases and Actual Results

The automated HTTP test suite (`scripts/test-rfq-api.mjs`) was executed against the running application:

| Test Case | Scenario / Payload | Expected | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Test 1** | Content-Type: `text/plain` | HTTP 400 | `400 invalid_content_type` | **PASSED** |
| **Test 2** | Malformed JSON string | HTTP 400 | `400 malformed_json` | **PASSED** |
| **Test 3** | Empty payload / missing fields | HTTP 422 | `422 validation_failed` with `fullName`, `workEmail` errors | **PASSED** |
| **Test 4** | `serviceRequired: "fake-service"` | HTTP 422 | `422 validation_failed` with `serviceRequired` error | **PASSED** |
| **Test 5** | `honeypot: "spam-bot-trap"` | HTTP 400 | `400 submission_rejected` | **PASSED** |
| **Test 6** | `submissionTimestamp: Date.now() - 400` | HTTP 400 | `400 submission_rejected` (bot speed trap) | **PASSED** |
| **Test 7** | Valid RFQ specification | HTTP 200 | `200 OK`, assigned `KOD-RFQ-20261102-51F0`, WAT timestamp | **PASSED** |
| **Test 8** | Rate limiting burst (6 rapid requests) | HTTP 429 | `429 rate_limit_exceeded`, `Retry-After: 600s` | **PASSED** |

**Summary:** 17/17 test assertions passed with zero failures.

---

## 7. Responsive Viewport Visual Verification

Headless Chrome visual captures were generated in `test-screenshots/`:
- `test-screenshots/contact-rfq-360px.png` (360×800) — Clean single-column layout, padding intact, radio buttons stacked properly.
- `test-screenshots/contact-rfq-390px.png` (390×844) — Standard mobile width, clear contrast, readable labels.
- `test-screenshots/contact-rfq-768px.png` (768×1024) — Tablet view, 2-column input grid, accessible focus states.
- `test-screenshots/contact-rfq-1024px.png` (1024×768) — Side-by-side layout: direct contact channels on left (5 cols), RFQ form on right (7 cols).
- `test-screenshots/contact-rfq-1440px.png` (1440×900) — High-resolution desktop view, precision HUD brackets rendered, balanced typography.

---

## 8. Quality Gates Summary

| Quality Gate | Command | Result | Status |
| :--- | :--- | :--- | :--- |
| **TypeScript Strict Check** | `npm run type-check` | Exit 0 — zero type errors | **PASSED** |
| **ESLint Cleanliness** | `npm run lint` | Exit 0 — `✔ No ESLint warnings or errors` | **PASSED** |
| **Next.js Production Build** | `npm run build` | Exit 0 — 22 routes compiled (21 static + 1 dynamic API) | **PASSED** |
| **End-to-End API Test Suite** | `node scripts/test-rfq-api.mjs` | Exit 0 — 17/17 tests passing | **PASSED** |
| **Responsive Viewports** | `node scripts/verify-rfq-ui.mjs` | Exit 0 — 5 viewports cleanly rendered | **PASSED** |

---

## 9. Production Configuration Requirements & Outstanding Items

To activate live email transmission when deploying to production:
1. **Resend Account Provisioning:** The client/CEO must register at [resend.com](https://resend.com) and add their sending domain (`kodtechnical.com`).
2. **DNS Records:** Add SPF, DKIM, and DMARC TXT records provided by Resend to KOD's domain registrar (e.g., cPanel/Cloudflare).
3. **Environment Secrets:** Set `RESEND_API_KEY` and `RFQ_SENDER_EMAIL` in the production host environment (e.g. Vercel, Railway, or VPS).
4. **Distributed Cache (Optional):** If deploying across multiple serverless regions, supply `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from a free Upstash Redis database to coordinate rate limiting globally.

---

## 10. Chapter 8.1 Security Audit Addendum

Following an independent security audit of the Chapter 8 RFQ system, 8 vulnerability findings (VUL-01 through VUL-08) were verified and mitigated:

1. **VUL-01 (Medium):** Client IP extraction prioritized `X-Forwarded-For`, allowing header spoofing. Mitigated in `src/lib/security/rate-limit.ts` by adopting a priority hierarchy (`cf-connecting-ip` -> `x-real-ip` -> `x-forwarded-for`).
2. **VUL-02 (Medium):** No server-side duplicate protection existed. Mitigated in `src/app/api/rfq/route.ts` with 60-second sliding-window fingerprint cache returning HTTP 409 Conflict.
3. **VUL-03 (Medium):** Missing API key in dev mode simulated delivery with `success: true`. Mitigated in `src/lib/email/sender.ts` by returning `success: false, error: "unconfigured"`, with mock mode strictly gated behind `RFQ_MOCK_DELIVERY=true`.
4. **VUL-04 (Low):** 2000ms speed trap rejected fast browser autofill. Threshold calibrated to 800ms in `src/lib/validation/rfq.ts`.
5. **VUL-05 (Info):** Redundant `Content-Length` header check replaced by authoritative `textBody.length` check on parsed body in `src/app/api/rfq/route.ts`.
6. **VUL-06 (Info):** Non-cryptographic reference ID confirmed acceptable for human tracking identifiers.
7. **VUL-07 (Medium):** Documented that in-process rate limiting is single-instance only; multi-instance serverless deployments require Upstash Redis.
8. **VUL-08 (Low):** Form success view now distinguishes live provider acceptance (`isMock === false`, green banner) from pending mock simulation (`isMock === true`, amber banner).

See `chapter-8.1-security-audit-report.md` for full technical audit details.

---

**Next Milestone:** Chapter 9 (awaiting user directive).

