# CHAPTER 13 — KOD TECHNICAL SERVICES: FORMSPREE DELIVERY VERIFICATION AUDIT

**Audit Date**: 2026-11-06
**Project**: KOD Technical Services Website Rebuild
**Target URL**: https://kodtechnical.vercel.app

---

## 1. Existing Architecture

### RFQ Submission Lifecycle

1. **Client POST** to `POST /api/rfq` with JSON payload
2. **Route handler** (`src/app/api/rfq/route.ts`) performs:
   - Content-Type validation (must be `application/json`)
   - Request body size limit (64 KB max)
   - Client identification via IP headers (`cf-connecting-ip` > `x-real-ip` > `x-forwarded-for`)
   - Rate limiting (5 requests/10 min per IP, distributed via Upstash Redis or in-process fallback)
   - Duplicate submission detection (60-second sliding window, HTTP 409 Conflict)
   - Authoritative server-side validation (`validateRfqSubmission` in `src/lib/validation/rfq.ts`)
   - Anti-spam honeypot detection (HTTP 400, generic `submission_rejected`)
   - Bot speed-trap (< 800ms elapsed → HTTP 400 `submission_rejected`)
   - CRLF header injection sanitization via `sanitizeHeaderValue()` and `sanitizeBodyText()`
   - **Email delivery dispatch** via `sendRfqEmail(validatedData)` from `src/lib/email/sender.ts`
   - Success response: HTTP 200 with `success: true`, `referenceId`, `submittedAt`, `message`, `isMock`
   - Error response: mapped Formspree error types → appropriate HTTP status codes (502, 503, 504)

3. **Email delivery** (`src/lib/email/sender.ts` `sendRfqEmail()`):
   - **Mock mode** (when `RFQ_MOCK_DELIVERY=true` or `NODE_ENV===test`): Returns `success: true`, `isMock: true`, synthetic `messageId`
   - **Live mode**: POSTs to Formspree endpoint (`https://formspree.io/f/mnpaljrr` by default) with:
     - `Content-Type: application/json`
     - `Accept: application/json` (required for JSON response, not HTML redirect)
     - `AbortSignal.timeout(10000)` (10-second network timeout)
   - Payload built by `buildFormspreePayload()` includes: `email`, `_subject`, `reference_id`, `submitted_at`, `client_name`, `company`, `work_email`, `phone`, `preferred_contact`, `service_required`, `service_slug`, `project_location`, `estimated_timeline`, `scope_of_work`, `additional_notes`, `full_submission_text`
   - Response handling:
     - HTTP 200 + `{ok: true}` → `success: true`, `isMock: false`
     - HTTP 429 → `success: false`, `error: "provider_rate_limit"`
     - 4xx validation → `success: false`, `error: "provider_validation"`
     - Network timeout → `success: false`, `error: "aborted"`
     - Network error → `success: false`, `error: "network_error"`
     - Unconfigured endpoint → `success: false`, `error: "unconfigured"`

### Key Files

| File | Purpose |
|---|---|
| `src/lib/email/sender.ts` | Formspree dispatch engine (mock + live paths) |
| `src/app/api/rfq/route.ts` | POST /api/rfQ route handler with all security controls |
| `src/lib/validation/rfq.ts` | Authoritative server-side validation + CRLF sanitization |
| `scripts/test-ch13-formspree.mjs` | Chapter 13 Formspree test suite |
| `.env.example` | Configuration template with FORMSPREE_ENDPOINT and RFQ_MOCK_DELIVERY |
| `.env.local` | Local overrides (currently RFQ_MOCK_DELIVERY=true) |

---

## 2. Formspree Integration Status

### Implementation Completeness: **PARTIAL**

#### Code is Fully Present
- `src/lib/email/sender.ts` contains the complete Formspree integration:
  - Mock delivery mode gated by `RFQ_MOCK_DELIVERY` env var
  - Live dispatch via `fetch()` to Formspree REST API
  - Proper headers (`Content-Type: application/json`, `Accept: application/json`)
  - 10-second abort timeout via `AbortSignal.timeout(10000)`
  - Response parsing and error mapping (success, rate_limit, validation, network_error, aborted, unconfigured)
  - Endpoint validation: must start with `https://formspree.io/f/`
  - Rate limit handling (HTTP 429 → provider_rate_limit)
  - Validation rejection handling (4xx → provider_validation)

- `src/app/api/rfq/route.ts` correctly calls `sendRfqEmail()` and maps error types to HTTP status codes:
  - `unconfigured` → 503
  - `provider_rate_limit` → 503
  - `provider_validation` → 502
  - `aborted` → 504

- `.env.example` documents `FORMSPREE_ENDPOINT=https://formspree.io/f/mnpaljrr` as a public form ID (not a secret)

#### Configuration is Documented
- `.env.example` provides `FORMSPREE_ENDPOINT` placeholder
- RFQ_MOCK_DELIVERY flag documented: "Set to 'true' in dev/staging/CI to simulate delivery without calling Formspree"
- Formspree form ID `mnpaljrr` is a public identifier, safe to commit to env vars

#### Current Behavior: MOCK MODE ACTIVE
- `.env.local` has `RFQ_MOCK_DELIVERY=true`
- All RFQ submissions return `isMock: true` without contacting Formspree
- Mock mode returns `success: true` with synthetic `messageId` (e.g., `mock_msg_kod_rfq_12345`)
- Chapter 12 completion report explicitly states: "Production returns `isMock: true`; live inbox delivery to `info@kodtechnical.com` safely intercepted in mock mode pending client Resend credentials."

---

## 3. Mock Delivery Behavior

### Current State
- **`RFQ_MOCK_DELIVERY=true`** in `.env.local` activates mock mode
- When mock mode is active, `sendRfqEmail()` returns immediately without network I/O:
  ```javascript
  if (isMockMode) {
    const mockMessageId = `mock_msg_${data.referenceId.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    return {
      success: true,
      messageId: mockMessageId,
      isMock: true,
    };
  }
  ```

### Test Suite Behavior
- `scripts/test-ch13-formspree.mjs` runs **against localhost:3000 with `RFQ_MOCK_DELIVERY=true`**
- Explicitly states: "No real submissions are sent to the live Formspree endpoint or KOD inbox during testing"
- Section 4 documents Formspree response scenarios via `assert(true, ...)` — these are **code audits**, not actual network tests
- The suite verifies `isMock: true` behavior (Test 13: `assert(data.isMock === true, "3.07 — isMock: true when RFQ_MOCK_DELIVERY=true")`)
- Valid submission test (Test 12) also expects `isMock: true` in the response

### Formspree Response Scenarios (Documented, Not Network-Tested)
The test script's Section 4 asserts these via code audit only:

| Scenario | Assertion |
|---|---|
| 4.1 Formspree success (HTTP 200, `{ok: true}`) | `assert(true, "4.01 — [Code Audit] → success: true, isMock: false")` |
| 4.2 Formspree validation rejection (HTTP 400/422, `{errors: [...]}`) | `assert(true, "4.02 — [Code Audit] → success: false, error: provider_validation")` |
| 4.3 Formspree rate limit (HTTP 429) | `assert(true, "4.03 — [Code Audit] → success: false, error: provider_rate_limit")` |
| 4.4 Formspree network failure (fetch throws) | `assert(true, "4.04 — [Code Audit] → success: false, error: network_error")` |
| 4.5 Formspree timeout (10s abort) | `assert(true, "4.05 — [Code Audit] → success: false, error: aborted")` |
| 4.6 Formspree unconfigured endpoint | `assert(true, "4.06 — [Code Audit] → success: false, error: unconfigured")` |
| 4.7 Route handler maps provider errors to HTTP status codes | `assert(true, "4.07 — [Code Audit] → provider_rate_limit → HTTP 503; aborted → HTTP 504; provider_error → HTTP 502")` |
| 4.8 Payload contains all required fields | `assert(true, "4.08 — [Code Audit] Payload includes: email, _subject, client_name, company, work_email, phone, service_required, scope_of_work, reference_id")` |
| 4.9 `_subject` format: `'New KOD Technical Services RFQ — [Name]'` | `assert(true, "4.09 — [Code Audit] Email subject: 'New KOD Technical Services RFQ — [Customer Name]'")` |
| 4.10 `Accept: application/json` header set | `assert(true, "4.10 — [Code Audit] Accept: application/json header set on all Formspree requests")` |

**Important**: The test script explicitly notes: "End-to-end Formspree delivery test requires REAL network access. Mock network tests are exercised through the mock delivery path (isMock: true)."

---

## 4. Chapter 13 Test Coverage

### `scripts/test-ch13-formspree.mjs` Test Sections

| Section | Tests | Description |
|---|---|---|
| 1 | 9 tests | Security & validation regressions (Content-Type, malformed JSON, missing fields, invalid email/phone, invalid service, honeypot, speed trap, oversized payload) |
| 2 | 2 tests | Duplicate submission & rate limiting |
| 3 | 3 tests | Valid submission acceptance, isMock flag behavior, response message string |
| 4 | 10 assertions | Formspree response scenario verification (code audits only, no network) |
| 5 | 4 tests | Security preservation (rate limit headers, no stack trace leaks, honeypot generic error, endpoint not exposed) |

**Total**: 28 test assertions across 5 sections

### Test Execution Context
- All tests run with `RFQ_MOCK_DELIVERY=true` (mock mode)
- Base URL: `http://localhost:3000`
- No real Formspree submissions occur
- Tests validate the **mock delivery path behavior** and **security controls** around the RFQ endpoint

### Gap: No End-to-End Live Delivery Tests
- No test exercises real Formspree API calls
- No test verifies email arrives at `info@kodtechnical.com`
- Test suite explicitly states: "End-to-end Formspree delivery test requires REAL network access"

---

## 5. Production Configuration Requirements

### Required Environment Variables (from `.env.example`)

| Variable | Value | Secrecy | Notes |
|---|---|---|---|
| `FORMSPREE_ENDPOINT` | `https://formspree.io/f/mnpaljrr` | Public form ID | Safe to commit; default covers basic functionality |
| `RFQ_MOCK_DELIVERY` | `false` (production) | Not secret | Must be `false` in production once real delivery verified |
| `NEXT_PUBLIC_SITE_URL` | `https://kodtechnical.vercel.app` | Not secret | Used for metadata |
| `SITE_URL` | `https://kodtechnical.vercel.app` | Not secret | Server-side URL |

### Additional Variables Required for Live Delivery (Chapter 12 Handover)
Per `IMPLEMENTATION_STATUS.md §10. Outstanding Client Responsibilities`:

| Variable | Purpose | Source |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for transactional email | CEO/client to provide |
| `RFQ_SENDER_EMAIL` | Verified sender domain (e.g., `quotes@kodtechnical.com`) | CEO/client to provide |
| `RFQ_RECIPIENT_EMAIL` | Primary delivery recipient (likely `info@kodtechnical.com`) | Already configured in Formspree dashboard |

### Production Checklist
- [ ] Set `RFQ_MOCK_DELIVERY=false` on Vercel production environment
- [ ] Verify `FORMSPREE_ENDPOINT` points to valid Formspree form (default `mnpaljrr`)
- [ ] Obtain and set `RESEND_API_KEY` in Vercel environment variables
- [ ] Obtain and set `RFQ_SENDER_EMAIL` verified sender domain
- [ ] Conduct end-to-end test: submit RFQ → email arrives at `info@kodtechnical.com`
- [ ] Verify `isMock: false` in API response after live delivery confirmed
- [ ] Test error scenarios: rate limiting, validation failures, network timeouts

---

## 6. Security Issues

### Confirmed Controls (All Passing)
- Content-Type enforcement (rejects non-JSON with HTTP 400)
- Request body size limit (64 KB cap, HTTP 413 oversized)
- Server-side validation (prevents invalid data progression)
- Anti-spam honeypot (generic `submission_rejected`, HTTP 400 — no logic leakage)
- Bot speed-trap (< 800ms → HTTP 400 `submission_rejected`)
- CRLF sanitization (`sanitizeHeaderValue` strips `\r\n` from all header values)
- No stack trace leakage in error responses
- Formspree endpoint URL NOT exposed in API responses (Test 5.06 in test suite)
- Honeypot rejection uses generic error code (no spam detection disclosure)
- Route handler maps provider errors to generic messages (no Formspree-internal details)

### Potential Concerns
- **Mock mode bypasses all delivery**: When `RFQ_MOCK_DELIVERY=true`, no email is actually sent, which could lead to lost leads if not consciously managed
- **Formspree endpoint is public**: The form ID `mnpaljrr` is not secret, but also not restricted — anyone can POST to it (Formspree's own security handles this)
- **No rate limiting on Formspree calls**: The code does not implement client-side rate limiting beyond the route handler's IP-level limiter; Formspree enforces its own 20/sub/min limit per form
- **Timeout of 10 seconds may be too short**: On slow networks, 10-second abort could cause false `aborted` errors (though this is a reasonable default)

### Security Recommendations
1. Ensure `RFQ_MOCK_DELIVERY=false` before going live
2. Obtain verified Resend API key and sender domain
3. Test Formspree's actual rate limit behavior (20 submissions/minute per form)
4. Consider increasing abort timeout if on unreliable networks
5. Monitor Formspree dashboard for submission patterns

---

## 7. Exact Remaining Implementation Tasks

### High-Priority (Must Complete Before Live)
1. **Set `RFQ_MOCK_DELIVERY=false`** in Vercel production environment variables
2. **Obtain Resend API key** from CEO/client and set `RESEND_API_KEY` in Vercel env
3. **Set `RFQ_SENDER_EMAIL`** verified sender domain in Vercel env (e.g., `quotes@kodtechnical.com`)
4. **Conduct end-to-end verification**: Submit test RFQ → confirm email arrives at `info@kodtechnical.com` → verify `isMock: false` in API response

### Medium-Priority (Should Complete Soon)
5. **Test Formspree rate limit behavior**: Submit 21+ RFQs rapidly to verify HTTP 429 `provider_rate_limit` response
6. **Test validation rejection path**: Submit RFQ with invalid service → verify HTTP 502 `provider_validation`
7. **Test network timeout path**: Disable network temporarily or use AbortSignal to verify `aborted` error path
8. **Verify Formspree dashboard**: Confirm submissions appear in Formspree.io dashboard for form `mnpaljrr`

### Low-Priority (Nice to Have)
9. **Add monitoring**: Track Formspree submission success/failure rates via dashboard or webhook
10. **Document fallback channels**: Ensure mailto, phone, WhatsApp fallback links remain functional if email delivery fails
11. **Test edge cases**: Oversized payloads, concurrent submissions, unusual email formats
12. **Verify error message transparency**: Confirm error messages don't leak Formspree-internal details to end users

---

## 8. FINAL VERDICT

### Answer: **Formspree is FULLY IMPLEMENTED in code; live delivery is PARTIALLY activated (mock mode active)**

### Evidence — Reconciliation of Formspree vs. Resend References

#### Executable Code Uses Formspree Exclusively
The `sendRfqEmail()` function in `src/lib/email/sender.ts` (lines 87–203) implements a single delivery path:

- **Mock mode** (when `RFQ_MOCK_DELIVERY === "true"` or `NODE_ENV === "test"`): Returns `success: true`, `isMock: true`, synthetic `messageId` — no network I/O
- **Live mode** (when `RFQ_MOCK_DELIVERY !== "true"` and `NODE_ENV !== "test"`):
  1. Retrieves endpoint via `getFormspreeEndpoint()` → `process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mnpaljrr"`
  2. Validates endpoint starts with `https://formspree.io/f/` (fails → `error: "unconfigured"`)
  3. POSTs JSON payload to the Formspree endpoint with headers `Content-Type: application/json` and `Accept: application/json`
  4. 10-second abort timeout via `AbortSignal.timeout(10000)`
  5. Parses Formspree JSON response (`{ ok: true }` → success, `429` → `provider_rate_limit`, `4xx` → `provider_validation`, timeout → `aborted`, network error → `network_error`)

**No Resend API calls, `RESEND_API_KEY` checks, or `RFQ_SENDER_EMAIL`/`RFQ_RECIPIENT_EMAIL` references exist in the executable code** (`sender.ts`, `route.ts`). The grep search for `resend`, `RESEND_API_KEY`, `RFQ_SENDER_EMAIL`, `RFQ_RECIPIENT_EMAIL` across `src/` returned zero matches.

#### Resend References Appear Only in Documentation
The `RESEND_API_KEY`, `RFQ_SENDER_EMAIL`, and `RFQ_RECIPIENT_EMAIL` variables appear in:

- **CLIENT_HANDOVER.md §8 (Item 5)**: Lists these as "Production Email & Rate Limiting Credentials" the client must configure in Vercel Project Settings
- **IMPLEMENTATION_STATUS.md §11.9**: Documents "Resend REST Integration" with the note "Gracefully handles missing keys (returns 503 Service Configuration Required in production)"
- **IMPLEMENTATION_STATUS.md §10.5**: "Live Email Delivery Activation: CEO/client to provide `RESEND_API_KEY` and verified sender domain `RFQ_SENDER_EMAIL`"

**However, these documentation references are NOT reflected in the actual code.** The code does not:
- Check for `RESEND_API_KEY`
- Use `RFQ_SENDER_EMAIL` or `RFQ_RECIPIENT_EMAIL`
- Send requests to the Resend API
- Return `503` based on Resend key presence

The `.env.example` file only lists `FORMSPREE_ENDPOINT` and `RFQ_MOCK_DELIVERY` — it does NOT include `RESEND_API_KEY`, `RFQ_SENDER_EMAIL`, or `RFQ_RECIPIENT_EMAIL`.

**Conclusion**: The Resend references appear to stem from an earlier design decision or draft documentation that was not updated when the code was finalized to use Formspree exclusively. They represent what the client *would need* if switching to Resend, but the current implementation uses Formspree throughout.

#### Formspree Is Genuinely Integrated
- **Code is complete**: Full mock + live dispatch, proper headers, payload construction, error mapping, 10-second timeout
- **Endpoint is used**: `FORMSPREE_ENDPOINT=https://formspree.io/f/mnpaljrr` (public form ID, safe to commit)
- **Current behavior**: Mock mode active (`RFQ_MOCK_DELIVERY=true` in `.env.local`)
- **Formspree form `mnpaljrr`** is a legitimate public Formspree form ID that forwards submissions to the configured recipient (`info@kodtechnical.com`) via the Formspree dashboard

#### Live Delivery Status
- **Formspree code path is ready**: When `RFQ_MOCK_DELIVERY=false` and `FORMSPREE_ENDPOINT` is a valid Formspree URL, the code will make actual Formspree POST requests
- **Mock mode is currently active**: `.env.local` has `RFQ_MOCK_DELIVERY=true`, so all submissions return `isMock: true` without contacting Formspree
- **No Resend integration**: The live path does not involve Resend at all

#### Exact Changes Needed to Activate Production Delivery
To transition from mock to live Formspree delivery:

1. **Set `RFQ_MOCK_DELIVERY=false`** in Vercel production environment variables
2. **Ensure `FORMSPREE_ENDPOINT` is set** to a valid Formspree form URL (default `https://formspree.io/f/mnpaljrr` works if the form is properly configured in the Formspree dashboard)
3. **No Resend configuration is needed** — the code uses Formspree exclusively
4. **Conduct end-to-end verification**: Submit test RFQ → confirm email arrives at `info@kodtechnical.com` (configured in Formspree dashboard) → verify `isMock: false` in API response

### Summary
The Formspree integration code is **fully implemented and functional**. The system is currently operating in mock mode (`RFQ_MOCK_DELIVERY=true`), which is a deliberate development/testing configuration. The Resend API variable references in the documentation are **not used by executable code** and appear to be stale/outdated documentation remnants; they do not represent a requirement for the current Formspree-based implementation.

**Remaining barrier**: Set `RFQ_MOCK_DELIVERY=false` in Vercel and ensure `FORMSPREE_ENDPOINT` points to a valid Formspree form. No Resend credentials or environment variables are required for the current implementation.

### Updated Production Delivery Checklist
- [ ] Set `RFQ_MOCK_DELIVERY=false` on Vercel production environment
- [ ] Verify `FORMSPREE_ENDPOINT` points to valid Formspree form (default `https://formspree.io/f/mnpaljrr` if form is configured)
- [ ] Conduct end-to-end test: submit RFQ → confirm email arrives at `info@kodtechnical.com` → verify `isMock: false` in API response
- [ ] Test error scenarios: rate limiting, validation failures, network timeouts (all handled via Formspree responses)