/**
 * Chapter 14 — Live RFQ Delivery Activation Readiness Test Suite
 *
 * Comprehensive audit and regression test verifying:
 * 1. Runtime code integrity & zero Resend footprint
 * 2. Formspree payload and header specifications
 * 3. HTTP security, input validation, and boundary enforcement
 * 4. Anti-spam honeypot, speed-trap, and duplicate prevention
 * 5. Safe mock delivery mode behavior (isMock: true)
 * 6. Information leakage prevention & error safety
 *
 * Target: http://localhost:3005/api/rfq (or TEST_BASE_URL)
 */

import fs from "fs";
import path from "path";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3005";

let passedCount = 0;
let failedCount = 0;
const results = [];

function assert(condition, testName, detail = "") {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedCount++;
    results.push({ status: "PASS", test: testName });
  } else {
    console.error(`  [FAIL] ${testName}${detail ? ": " + detail : ""}`);
    failedCount++;
    results.push({ status: "FAIL", test: testName, detail });
  }
}

// IP address generator for test isolation
const RUN_ID = Math.floor(Math.random() * 200) + 1;
function testIp(section, index) {
  return `10.${RUN_ID}.${section}.${index}`;
}

// Canonical valid RFQ payload (elapsed time > 5s passes bot speed trap)
const validPayload = {
  fullName: "Engr. Nnamdi Okon",
  companyName: "TotalEnergies E&P Nigeria",
  workEmail: "nnamdi.okon@partner.totalenergies.com",
  phoneNumber: "+234 803 123 4567",
  serviceRequired: "precision-alignment",
  description: "Multi-stage boiler feed water pump shaft runout and thermal growth laser alignment required before commissioning.",
  projectLocation: "Obite Gas Plant, Rivers State",
  preferredContactMethod: "email",
  estimatedTimeline: "immediate",
  additionalNotes: "Sulzer MSD 4-stage pump coupled to 450kW Siemens electric driver.",
  submissionTimestamp: Date.now() - 6000,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: Architectural & Runtime Code Integrity Audits
// ─────────────────────────────────────────────────────────────────────────────
function runCodeAudits() {
  console.log("\n── SECTION 1: Architectural & Runtime Code Integrity Audits ──────────────\n");

  const senderSource = fs.readFileSync(path.resolve("src/lib/email/sender.ts"), "utf-8");
  const routeSource = fs.readFileSync(path.resolve("src/app/api/rfq/route.ts"), "utf-8");
  const packageJson = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf-8"));

  // 1.01: Package.json has zero resend dependencies
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const hasResendPkg = Object.keys(deps).some((k) => k.toLowerCase().includes("resend"));
  assert(!hasResendPkg, "1.01 — package.json has zero Resend dependencies");

  // 1.02: sender.ts has zero Resend references
  assert(!senderSource.toLowerCase().includes("resend"), "1.02 — src/lib/email/sender.ts has zero Resend references");

  // 1.03: route.ts has zero Resend references
  assert(!routeSource.toLowerCase().includes("resend"), "1.03 — src/app/api/rfq/route.ts has zero Resend references");

  // 1.04: Default Formspree endpoint is configured to official form
  assert(
    senderSource.includes('https://formspree.io/f/mnpaljrr'),
    "1.04 — Formspree endpoint defaults to https://formspree.io/f/mnpaljrr"
  );

  // 1.05: FORMSPREE_ENDPOINT environment variable support
  assert(
    senderSource.includes("process.env.FORMSPREE_ENDPOINT"),
    "1.05 — Supports FORMSPREE_ENDPOINT environment variable override"
  );

  // 1.06: Endpoint URL guard verifies Formspree prefix
  assert(
    senderSource.includes('.startsWith("https://formspree.io/f/")'),
    "1.06 — Validates endpoint prefix (https://formspree.io/f/)"
  );

  // 1.07: Content-Type: application/json header set on fetch
  assert(
    senderSource.includes('"Content-Type": "application/json"'),
    "1.07 — Sets Content-Type: application/json for Formspree"
  );

  // 1.08: Accept: application/json header set on fetch (prevents HTML redirect)
  assert(
    senderSource.includes('Accept: "application/json"'),
    "1.08 — Sets Accept: application/json to enforce JSON response"
  );

  // 1.09: AbortSignal 10-second timeout ceiling
  assert(
    senderSource.includes("AbortSignal.timeout(10000)"),
    "1.09 — AbortSignal timeout ceiling set to 10,000ms"
  );

  // 1.10: Safe mock delivery gating via RFQ_MOCK_DELIVERY
  assert(
    senderSource.includes('process.env.RFQ_MOCK_DELIVERY === "true"'),
    "1.10 — Safe mock mode explicitly gated behind RFQ_MOCK_DELIVERY === 'true'"
  );

  // 1.11: Reply-To automatically configured via email field
  assert(
    senderSource.includes("email: data.workEmail"),
    "1.11 — Passes customer email as 'email' field for automatic Reply-To mapping"
  );

  // 1.12: Subject line formatted with client name
  assert(
    senderSource.includes('_subject: `New KOD Technical Services RFQ — ${data.fullName}`'),
    "1.12 — Formspree _subject correctly formatted with client name"
  );

  // 1.13: Provider error code mapping in route handler
  assert(
    routeSource.includes('dispatchResult.error === "unconfigured"') &&
    routeSource.includes('dispatchResult.error === "provider_rate_limit"') &&
    routeSource.includes('dispatchResult.error === "provider_validation"') &&
    routeSource.includes('dispatchResult.error === "aborted"'),
    "1.13 — Route handler maps Formspree provider error codes to HTTP status codes"
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: HTTP Security, Boundary & Anti-Abuse Defenses
// ─────────────────────────────────────────────────────────────────────────────
async function runHttpSecurityTests() {
  console.log("\n── SECTION 2: HTTP Security, Boundary & Anti-Abuse Defenses ─────────────\n");

  // 2.01: Non-JSON Content-Type rejection
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "text/plain", "X-Forwarded-For": testIp(2, 1) },
      body: "plain text payload",
    });
    const data = await res.json();
    assert(res.status === 400 && data.error === "invalid_content_type", "2.01 — Rejects non-JSON Content-Type (HTTP 400)");
  } catch (e) {
    assert(false, "2.01 — Content-Type validation", e.message);
  }

  // 2.02: Malformed JSON rejection
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 2) },
      body: "{ unquoted_key: 123 ",
    });
    const data = await res.json();
    assert(res.status === 400 && data.error === "malformed_json", "2.02 — Rejects malformed JSON (HTTP 400)");
  } catch (e) {
    assert(false, "2.02 — Malformed JSON", e.message);
  }

  // 2.03: Missing required fields
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 3) },
      body: JSON.stringify({ fullName: "", companyName: "", workEmail: "bad" }),
    });
    const data = await res.json();
    assert(
      res.status === 422 &&
      data.error === "validation_failed" &&
      Boolean(data.errors?.fullName) &&
      Boolean(data.errors?.companyName) &&
      Boolean(data.errors?.workEmail) &&
      Boolean(data.errors?.phoneNumber) &&
      Boolean(data.errors?.serviceRequired) &&
      Boolean(data.errors?.description),
      "2.03 — Missing required fields flagged with HTTP 422 validation_failed"
    );
  } catch (e) {
    assert(false, "2.03 — Missing required fields", e.message);
  }

  // 2.04: Invalid email format
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 4) },
      body: JSON.stringify({ ...validPayload, workEmail: "plain-address-without-at" }),
    });
    const data = await res.json();
    assert(res.status === 422 && Boolean(data.errors?.workEmail), "2.04 — Invalid email format returns HTTP 422");
  } catch (e) {
    assert(false, "2.04 — Invalid email format", e.message);
  }

  // 2.05: Invalid phone number
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 5) },
      body: JSON.stringify({ ...validPayload, phoneNumber: "123" }), // too short (<7 chars)
    });
    const data = await res.json();
    assert(res.status === 422 && Boolean(data.errors?.phoneNumber), "2.05 — Invalid phone format returns HTTP 422");
  } catch (e) {
    assert(false, "2.05 — Invalid phone format", e.message);
  }

  // 2.06: Unrecognized engineering service
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 6) },
      body: JSON.stringify({ ...validPayload, serviceRequired: "charity-donation-services" }),
    });
    const data = await res.json();
    assert(res.status === 422 && Boolean(data.errors?.serviceRequired), "2.06 — Unrecognized service slug returns HTTP 422");
  } catch (e) {
    assert(false, "2.06 — Unrecognized service", e.message);
  }

  // 2.07: Honeypot anti-spam defense
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 7) },
      body: JSON.stringify({ ...validPayload, honeypot: "automated-bot-content" }),
    });
    const data = await res.json();
    assert(res.status === 400 && data.error === "submission_rejected", "2.07 — Honeypot submission rejected with HTTP 400");
  } catch (e) {
    assert(false, "2.07 — Honeypot trap", e.message);
  }

  // 2.08: Bot speed trap (<800ms)
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 8) },
      body: JSON.stringify({ ...validPayload, submissionTimestamp: Date.now() - 350 }),
    });
    const data = await res.json();
    assert(res.status === 400 && data.error === "submission_rejected", "2.08 — Bot speed trap (<800ms) rejected with HTTP 400");
  } catch (e) {
    assert(false, "2.08 — Bot speed trap", e.message);
  }

  // 2.09: Oversized payload (>64 KB)
  try {
    const bigPayload = { ...validPayload, description: "K".repeat(70 * 1024) };
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(2, 9) },
      body: JSON.stringify(bigPayload),
    });
    const data = await res.json();
    assert(res.status === 413 && data.error === "payload_too_large", "2.09 — Oversized payload (>64 KB) rejected with HTTP 413");
  } catch (e) {
    assert(false, "2.09 — Oversized payload", e.message);
  }

  // 2.10: Duplicate submission prevention (60s sliding window)
  try {
    const dedupeIp = testIp(2, 10);
    const dedupePayload = {
      ...validPayload,
      workEmail: "dedupe.ch14@chevron.com",
      submissionTimestamp: Date.now() - 7000,
    };
    const first = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": dedupeIp },
      body: JSON.stringify(dedupePayload),
    });
    const firstData = await first.json();

    await new Promise((r) => setTimeout(r, 200));

    const second = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": dedupeIp },
      body: JSON.stringify(dedupePayload),
    });
    const secondData = await second.json();

    assert(
      first.status === 200 && firstData.success === true &&
      second.status === 409 && secondData.error === "duplicate_submission",
      "2.10 — Duplicate submission within 60s rejected with HTTP 409 Conflict"
    );
  } catch (e) {
    assert(false, "2.10 — Duplicate submission prevention", e.message);
  }

  // 2.11: Rate limiting enforcement (5 requests per 10 minutes)
  try {
    const burstIp = testIp(2, 99);
    let hitRateLimit = false;
    let retryAfterHeader = null;

    for (let i = 0; i < 7; i++) {
      const res = await fetch(`${BASE_URL}/api/rfq`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Forwarded-For": burstIp },
        body: JSON.stringify({
          ...validPayload,
          workEmail: `burst.ch14.${i}@testcorp.com`,
          submissionTimestamp: Date.now() - 8000,
        }),
      });
      if (res.status === 429) {
        hitRateLimit = true;
        retryAfterHeader = res.headers.get("Retry-After");
        break;
      }
    }
    assert(hitRateLimit && Boolean(retryAfterHeader), "2.11 — Rate limit enforced with HTTP 429 and Retry-After header");
  } catch (e) {
    assert(false, "2.11 — Rate limiting enforcement", e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: Mock Delivery Behavior & Deliverability Telemetry
// ─────────────────────────────────────────────────────────────────────────────
async function runMockDeliveryTests() {
  console.log("\n── SECTION 3: Mock Delivery Behavior & Deliverability Telemetry ──────────\n");

  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(3, 1) },
      body: JSON.stringify(validPayload),
    });
    const data = await res.json();

    // 3.01: Status 200 OK
    assert(res.status === 200, "3.01 — Valid RFQ returns HTTP 200 OK");

    // 3.02: Success flag is true
    assert(data.success === true, "3.02 — Response contains success: true");

    // 3.03: Reference ID format
    const refRegex = /^KOD-RFQ-\d{8}-[A-F0-9]{4}$/;
    assert(
      refRegex.test(data.referenceId),
      `3.03 — Reference ID conforms to KOD-RFQ-YYYYMMDD-[4-HEX]: ${data.referenceId}`
    );

    // 3.04: submittedAt timestamp format
    assert(
      data.submittedAt?.includes("WAT / Lagos"),
      `3.04 — submittedAt formatted in West Africa Time (WAT / Lagos): ${data.submittedAt}`
    );

    // 3.05: Mock delivery posture
    assert(
      data.isMock === true,
      "3.05 — isMock is explicitly true (mock safety verified active)"
    );

    // 3.06: Human-readable acknowledgment message
    assert(
      typeof data.message === "string" && data.message.includes(data.referenceId),
      "3.06 — Response includes human-readable acknowledgment with reference ID"
    );

    // 3.07: Rate limit headers present on valid response
    const rlLimit = res.headers.get("X-RateLimit-Limit");
    const rlRemaining = res.headers.get("X-RateLimit-Remaining");
    assert(
      Boolean(rlLimit) && Boolean(rlRemaining),
      `3.07 — X-RateLimit headers present on success (Limit: ${rlLimit}, Remaining: ${rlRemaining})`
    );
  } catch (e) {
    assert(false, "3.01 — Mock delivery tests", e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: Information Security & Leak Prevention Audits
// ─────────────────────────────────────────────────────────────────────────────
async function runSecurityAuditTests() {
  console.log("\n── SECTION 4: Information Security & Leak Prevention Audits ──────────────\n");

  // 4.01: No stack traces or internal exception details leaked in errors
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(4, 1) },
      body: JSON.stringify({ fullName: "A" }),
    });
    const text = await res.text();
    const hasStackTrace =
      /\bat\s+\w+\s*\(/.test(text) ||
      text.includes("    at ") ||
      /Error:\s*\n/.test(text);
    assert(!hasStackTrace, "4.01 — Zero stack traces or file paths leaked in error responses");
  } catch (e) {
    assert(false, "4.01 — Stack trace leak check", e.message);
  }

  // 4.02: Honeypot response does not disclose detection mechanics
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(4, 2) },
      body: JSON.stringify({ ...validPayload, honeypot: "bot-data" }),
    });
    const data = await res.json();
    assert(
      data.error === "submission_rejected" &&
      !JSON.stringify(data).toLowerCase().includes("honeypot") &&
      !JSON.stringify(data).toLowerCase().includes("spam"),
      "4.02 — Honeypot response does not leak internal anti-spam mechanics"
    );
  } catch (e) {
    assert(false, "4.02 — Honeypot disclosure check", e.message);
  }

  // 4.03: Formspree endpoint URL not exposed in public response
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(4, 3) },
      body: JSON.stringify({
        ...validPayload,
        workEmail: "noleak.ch14@testcorp.com",
        submissionTimestamp: Date.now() - 10000,
      }),
    });
    const text = await res.text();
    assert(!text.includes("formspree.io"), "4.03 — Formspree endpoint URL not exposed in API response body");
  } catch (e) {
    assert(false, "4.03 — Formspree endpoint leak check", e.message);
  }

  // 4.04: Fallback contact details provided cleanly
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": testIp(4, 4) },
      body: JSON.stringify({ ...validPayload, workEmail: "bad-email-format" }),
    });
    const data = await res.json();
    assert(res.status === 422 && typeof data === "object", "4.04 — Error responses are structured JSON");
  } catch (e) {
    assert(false, "4.04 — Structured error check", e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Runner
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════════════════════════════════════════╗");
  console.log("║   CHAPTER 14 — LIVE RFQ DELIVERY ACTIVATION READINESS TEST SUITE         ║");
  console.log(`║   Target Endpoint: ${BASE_URL}/api/rfq`.padEnd(75) + "║");
  console.log("║   Mode: Controlled Local Production Server (Mock Mode Active)            ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════╝");

  runCodeAudits();
  await runHttpSecurityTests();
  await runMockDeliveryTests();
  await runSecurityAuditTests();

  const total = passedCount + failedCount;
  console.log("\n╔══════════════════════════════════════════════════════════════════════════╗");
  console.log(
    `║   FINAL RESULTS: ${total} assertions | PASSED: ${passedCount} | FAILED: ${failedCount}`.padEnd(75) + "║"
  );
  console.log("╚══════════════════════════════════════════════════════════════════════════╝\n");

  if (failedCount > 0) {
    console.error("Test suite failed. Please resolve the failing assertions above.");
    process.exit(1);
  } else {
    console.log("All Chapter 14 readiness checks passed cleanly. System is ready for live activation.\n");
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
