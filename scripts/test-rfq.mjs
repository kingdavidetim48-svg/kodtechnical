/**
 * Comprehensive Automated Test Suite for Chapter 8 RFQ System
 * Tests validation schema, security defenses, rate limiter, email formatting, and API endpoint.
 */

import { validateRfqSubmission, sanitizeHeaderValue, sanitizeBodyText } from "../src/lib/validation/rfq.js";
import { checkRateLimit, getClientIdentifier } from "../src/lib/security/rate-limit.js";
import { generateRfqHtml, generateRfqPlainText } from "../src/lib/email/templates/rfq-notification.js";
import { sendRfqEmail } from "../src/lib/email/sender.js";

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName, detail = "") {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`[FAIL] ${testName}: ${detail}`);
    failedCount++;
  }
}

async function runTests() {
  console.log("=== CHAPTER 8: RFQ SYSTEM TEST SUITE ===\n");

  // ─────────────────────────────────────────────────────────────
  // 1. VALIDATION TESTS
  // ─────────────────────────────────────────────────────────────
  console.log("--- 1. Validation & Schema Enforcement ---");

  // 1.1 Valid complete submission
  const validPayload = {
    fullName: "Engr. Nnamdi Okon",
    companyName: "TotalEnergies E&P Nigeria",
    workEmail: "nnamdi.okon@partner.totalenergies.com",
    phoneNumber: "+234 803 123 4567",
    serviceRequired: "precision-alignment",
    description: "Multi-stage boiler feed water pump shaft runout and thermal growth laser alignment required before commissioning.",
    projectLocation: "Obite Gas Plant, Rivers State",
    preferredContactMethod: "phone",
    estimatedTimeline: "immediate",
    additionalNotes: "Sulzer MSD 4-stage pump coupled to 450kW Siemens electric driver.",
    submissionTimestamp: Date.now() - 5000, // 5 seconds ago
  };

  const validResult = validateRfqSubmission(validPayload);
  assert(validResult.isValid === true, "Valid submission accepted", JSON.stringify(validResult.errors));
  assert(validResult.data?.referenceId.startsWith("KOD-RFQ-"), "Reference ID generated with KOD-RFQ prefix");
  assert(validResult.data?.serviceTitle === "Laser & Precision Alignment", "Matched service title correctly");
  assert(validResult.data?.submittedAtWat.includes("WAT"), "Submission timestamp formatted in West Africa Time");

  // 1.2 Missing required fields
  const missingFieldsResult = validateRfqSubmission({});
  assert(missingFieldsResult.isValid === false, "Empty payload rejected");
  assert(Boolean(missingFieldsResult.errors.fullName), "Missing fullName flagged");
  assert(Boolean(missingFieldsResult.errors.companyName), "Missing companyName flagged");
  assert(Boolean(missingFieldsResult.errors.workEmail), "Missing workEmail flagged");
  assert(Boolean(missingFieldsResult.errors.phoneNumber), "Missing phoneNumber flagged");
  assert(Boolean(missingFieldsResult.errors.serviceRequired), "Missing serviceRequired flagged");
  assert(Boolean(missingFieldsResult.errors.description), "Missing description flagged");

  // 1.3 Invalid email formats
  const badEmails = ["plainaddress", "@missingusername.com", "missingdot@domain", "user@.com", "user@domain..com"];
  for (const badEmail of badEmails) {
    const res = validateRfqSubmission({ ...validPayload, workEmail: badEmail });
    assert(res.isValid === false && Boolean(res.errors.workEmail), `Invalid email rejected: "${badEmail}"`);
  }

  // 1.4 Invalid phone numbers
  const badPhones = ["123", "abc", "++234", "call-me-now"];
  for (const badPhone of badPhones) {
    const res = validateRfqSubmission({ ...validPayload, phoneNumber: badPhone });
    assert(res.isValid === false && Boolean(res.errors.phoneNumber), `Invalid phone rejected: "${badPhone}"`);
  }

  // 1.5 Short and excessively long descriptions
  const shortDesc = validateRfqSubmission({ ...validPayload, description: "fix my pump" });
  assert(shortDesc.isValid === false && Boolean(shortDesc.errors.description), "Description under 15 characters rejected");

  const longDesc = validateRfqSubmission({ ...validPayload, description: "X".repeat(3600) });
  assert(longDesc.isValid === false && Boolean(longDesc.errors.description), "Description exceeding 3,500 characters rejected");

  // 1.6 Invalid service selection
  const invalidService = validateRfqSubmission({ ...validPayload, serviceRequired: "fake-service-that-does-not-exist" });
  assert(invalidService.isValid === false && Boolean(invalidService.errors.serviceRequired), "Unrecognized engineering service rejected");

  // 1.7 Malformed payload type
  const malformed = validateRfqSubmission("string instead of object");
  assert(malformed.isValid === false && Boolean(malformed.errors._form), "Non-object payload cleanly rejected");

  // ─────────────────────────────────────────────────────────────
  // 2. SECURITY & ANTI-SPAM TESTS
  // ─────────────────────────────────────────────────────────────
  console.log("\n--- 2. Security & Anti-Spam Defenses ---");

  // 2.1 Honeypot detection
  const honeypotSubmission = validateRfqSubmission({ ...validPayload, honeypot: "https://spam-link.ru" });
  assert(honeypotSubmission.isValid === false && honeypotSubmission.isSpam === true, "Honeypot field triggers spam flag");

  // 2.2 Bot speed trap (< 800ms completion) — threshold reduced from 2000ms (VUL-04 fix)
  const botSpeedSubmission = validateRfqSubmission({ ...validPayload, submissionTimestamp: Date.now() - 400 }); // 400ms
  assert(botSpeedSubmission.isValid === false && botSpeedSubmission.isSpam === true, "Submission under 800ms triggers bot speed trap");

  // 2.2a Speed trap boundary — 800ms exactly (should be rejected)
  const exactBoundaryBot = validateRfqSubmission({ ...validPayload, submissionTimestamp: Date.now() - 799 });
  assert(exactBoundaryBot.isValid === false && exactBoundaryBot.isSpam === true, "Submission at 799ms rejected (just below 800ms threshold)");

  // 2.2b Legitimate autofill speed — just above threshold (should be accepted)
  const autofillSubmission = validateRfqSubmission({ ...validPayload, submissionTimestamp: Date.now() - 850 });
  assert(autofillSubmission.isValid === true, "Submission at ~850ms accepted (above 800ms autofill threshold)");

  // 2.3 CRLF Email Header Injection prevention
  const dangerousName = "Attacker\r\nBcc: victim@target.com\r\nSubject: Injected";
  const sanitizedName = sanitizeHeaderValue(dangerousName);
  assert(!sanitizedName.includes("\r") && !sanitizedName.includes("\n"), "CRLF stripped from header values");
  assert(sanitizedName === "Attacker  Bcc: victim@target.com  Subject: Injected", "CRLF converted safely to spaces");

  const dangerousEmail = "legit@company.com\r\nCc: spy@hacker.io";
  const injectionValidation = validateRfqSubmission({ ...validPayload, workEmail: dangerousEmail });
  assert(!injectionValidation.data?.workEmail.includes("\r") && !injectionValidation.data?.workEmail.includes("\n"), "Validated email cannot contain CRLF");

  // 2.4 Rate Limiter test (in-process fallback)
  const testIp = `test-ip-${Date.now()}`;
  let allowed = 0;
  for (let i = 0; i < 7; i++) {
    const rl = await checkRateLimit(testIp, 5, 60); // 5 allowed
    if (rl.success) allowed++;
  }
  assert(allowed === 5, `Rate limiter strictly allows exactly 5 requests (allowed: ${allowed})`);
  const blockedCheck = await checkRateLimit(testIp, 5, 60);
  assert(blockedCheck.success === false && blockedCheck.retryAfter > 0, "6th request blocked with positive retryAfter");

  // ─────────────────────────────────────────────────────────────
  // 3. EMAIL TEMPLATE & RENDERING TESTS
  // ─────────────────────────────────────────────────────────────
  console.log("\n--- 3. Email Template & Sanitization ---");

  const testData = validResult.data;
  const htmlOutput = generateRfqHtml(testData);
  const plainTextOutput = generateRfqPlainText(testData);

  assert(htmlOutput.includes(testData.referenceId), "HTML template contains assigned Reference ID");
  assert(htmlOutput.includes("KOD TECHNICAL SERVICES"), "HTML template contains brand header");
  assert(htmlOutput.includes(testData.fullName), "HTML template contains customer full name");
  assert(htmlOutput.includes(testData.companyName), "HTML template contains company name");
  assert(htmlOutput.includes(testData.serviceTitle), "HTML template contains service discipline");
  assert(htmlOutput.includes("Reply Directly to"), "HTML template includes direct reply action");

  assert(plainTextOutput.includes(testData.referenceId), "Plaintext template contains Reference ID");
  assert(plainTextOutput.includes(testData.description), "Plaintext template contains scope of work");

  // Test XSS escaping inside HTML template
  const xssData = {
    ...testData,
    fullName: "John <script>alert('xss')</script>",
    description: "Testing <img src=x onerror=alert(1)> & special characters \"quotes\"",
  };
  const xssHtml = generateRfqHtml(xssData);
  assert(!xssHtml.includes("<script>"), "HTML template safely escapes <script> tags");
  assert(xssHtml.includes("&lt;script&gt;"), "Escaped <script> rendered as HTML entity");
  assert(!xssHtml.includes("<img src=x"), "HTML template safely escapes <img> tags");

  // ─────────────────────────────────────────────────────────────
  // 4. EMAIL DISPATCH & ENVIRONMENT BEHAVIOR
  // ─────────────────────────────────────────────────────────────
  console.log("\n--- 4. Email Dispatch Engine ---");

  // 4.1 Mock delivery mode (RFQ_MOCK_DELIVERY=true)
  process.env.RFQ_MOCK_DELIVERY = "true";
  delete process.env.RESEND_API_KEY;
  const mockDispatch = await sendRfqEmail(testData);
  assert(mockDispatch.success === true, "Mock delivery successfully accepts valid RFQ data");
  assert(mockDispatch.isMock === true, "Mock delivery correctly flagged isMock: true");
  assert(Boolean(mockDispatch.messageId), "Mock delivery returns mock messageId");

  // 4.2 Production unconfigured mode (no key, no mock flag) → fail with error (VUL-03 fix)
  process.env.RFQ_MOCK_DELIVERY = "false";
  const prevEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  delete process.env.RESEND_API_KEY;

  const unconfiguredDispatch = await sendRfqEmail(testData);
  assert(unconfiguredDispatch.success === false, "In production without API key, dispatch correctly returns success: false (VUL-03)");
  assert(unconfiguredDispatch.error === "unconfigured", "Error code is 'unconfigured' (VUL-03)");
  assert(Boolean(unconfiguredDispatch.errorMessage), "Transparent error message provided without swallowing error");

  // Restore env for subsequent tests
  process.env.NODE_ENV = prevEnv;
  process.env.RFQ_MOCK_DELIVERY = "true";

  // ─────────────────────────────────────────────────────────────
  // 5. CHAPTER 8.1 AUDIT — IP HEADER TRUST ORDER (VUL-01)
  // ─────────────────────────────────────────────────────────────
  console.log("\n--- 5. Chapter 8.1 Audit: IP Header Trust Order (VUL-01) ---");

  // Helper: build a minimal Request-compatible object with specific headers
  function mockRequest(headers) {
    return { headers: { get: (key) => headers[key.toLowerCase()] ?? null } };
  }

  // 5.1 cf-connecting-ip takes priority over x-forwarded-for (Cloudflare deployment)
  const cfReq = mockRequest({
    "cf-connecting-ip": "10.0.0.1",
    "x-forwarded-for": "192.168.0.1",
    "x-real-ip": "172.16.0.1",
  });
  assert(getClientIdentifier(cfReq) === "10.0.0.1", "cf-connecting-ip takes priority over x-forwarded-for (VUL-01 fix)");

  // 5.2 x-real-ip used when cf-connecting-ip absent (Vercel deployment)
  const vercelReq = mockRequest({
    "x-real-ip": "203.0.113.45",
    "x-forwarded-for": "192.168.99.1",
  });
  assert(getClientIdentifier(vercelReq) === "203.0.113.45", "x-real-ip takes priority over x-forwarded-for (Vercel path)");

  // 5.3 x-forwarded-for used as last resort when no platform headers present
  const proxyReq = mockRequest({
    "x-forwarded-for": "203.0.113.10, 10.0.0.2",
  });
  const xffResult = getClientIdentifier(proxyReq);
  assert(xffResult === "203.0.113.10", "x-forwarded-for first IP used as last resort (expected '203.0.113.10')");

  // 5.4 Falls back to 127.0.0.1 when no headers present
  const noHeadersReq = mockRequest({});
  assert(getClientIdentifier(noHeadersReq) === "127.0.0.1", "Falls back to 127.0.0.1 when no identifying headers present");

  // ─────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────
  console.log(`\n======================================================`);
  console.log(`TOTAL TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log(`======================================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
