/**
 * Live Production RFQ Protections Verification
 * Safely tests server-side validation, error handling, payload size limits,
 * honeypot traps, and malformed inputs WITHOUT triggering live emails.
 */

const PRODUCTION_URL = "https://kodtechnical.vercel.app";

async function runLiveRfqAudit() {
  console.log("=== KOD TECHNICAL SERVICES — LIVE RFQ PROTECTION AUDIT ===");
  console.log(`Target: ${PRODUCTION_URL}/api/rfq\n`);

  let passed = 0;
  let total = 0;

  function record(name, condition, details = "") {
    total++;
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} — ${details}`);
    }
  }

  // 1. Missing required fields
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    record(
      "1. Missing required fields rejected with HTTP 422",
      res.status === 422 && data.error === "validation_failed" && data.errors?.fullName && data.errors?.workEmail,
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    record("1. Missing required fields rejected with HTTP 422", false, err.message);
  }

  // 2. Invalid email format
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Verification",
        companyName: "Audit Corp",
        workEmail: "invalid-email-no-at",
        phoneNumber: "+2348031234567",
        serviceRequired: "precision-alignment",
        description: "Test description for audit verification purposes.",
      }),
    });
    const data = await res.json();
    record(
      "2. Invalid email rejected with HTTP 422",
      res.status === 422 && data.errors?.workEmail,
      `Status: ${res.status}, Errors: ${JSON.stringify(data.errors)}`
    );
  } catch (err) {
    record("2. Invalid email rejected with HTTP 422", false, err.message);
  }

  // 3. Invalid phone format
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Verification",
        companyName: "Audit Corp",
        workEmail: "test@auditcorp.com",
        phoneNumber: "123",
        serviceRequired: "precision-alignment",
        description: "Test description for audit verification purposes.",
      }),
    });
    const data = await res.json();
    record(
      "3. Invalid phone number rejected with HTTP 422",
      res.status === 422 && data.errors?.phoneNumber,
      `Status: ${res.status}, Errors: ${JSON.stringify(data.errors)}`
    );
  } catch (err) {
    record("3. Invalid phone number rejected with HTTP 422", false, err.message);
  }

  // 4. Invalid service selection
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Verification",
        companyName: "Audit Corp",
        workEmail: "test@auditcorp.com",
        phoneNumber: "+2348031234567",
        serviceRequired: "non-existent-service-slug-xyz",
        description: "Test description for audit verification purposes.",
      }),
    });
    const data = await res.json();
    record(
      "4. Invalid service selection rejected with HTTP 422",
      res.status === 422 && data.errors?.serviceRequired,
      `Status: ${res.status}, Errors: ${JSON.stringify(data.errors)}`
    );
  } catch (err) {
    record("4. Invalid service selection rejected with HTTP 422", false, err.message);
  }

  // 5. Honeypot trap rejection
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Verification",
        companyName: "Audit Corp",
        workEmail: "test@auditcorp.com",
        phoneNumber: "+2348031234567",
        serviceRequired: "precision-alignment",
        description: "Test description for audit verification purposes.",
        website_url_check: "https://spam-bot.com",
      }),
    });
    const data = await res.json();
    record(
      "5. Honeypot filled field rejected with HTTP 400 submission_rejected",
      res.status === 400 && data.error === "submission_rejected",
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    record("5. Honeypot filled field rejected", false, err.message);
  }

  // 6. Bot speed trap rejection (< 2000ms timestamp)
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Verification",
        companyName: "Audit Corp",
        workEmail: "test@auditcorp.com",
        phoneNumber: "+2348031234567",
        serviceRequired: "precision-alignment",
        description: "Test description for audit verification purposes.",
        submissionTimestamp: Date.now() - 500, // only 500ms elapsed
      }),
    });
    const data = await res.json();
    record(
      "6. Bot speed trap (<2s submission) rejected with HTTP 400 submission_rejected",
      res.status === 400 && data.error === "submission_rejected",
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    record("6. Bot speed trap rejected", false, err.message);
  }

  // 7. Request payload size protection (>64 KB)
  try {
    const largeNotes = "X".repeat(70 * 1024); // 70 KB
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": String(largeNotes.length),
      },
      body: JSON.stringify({ notes: largeNotes }),
    });
    const data = await res.json();
    record(
      "7. Oversized payload (>64 KB) rejected with HTTP 413 payload_too_large",
      res.status === 413 && data.error === "payload_too_large",
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    record("7. Oversized payload rejected", false, err.message);
  }

  // 8. Unsupported Content-Type rejection
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "plain text payload",
    });
    const data = await res.json();
    record(
      "8. Non-JSON Content-Type rejected with HTTP 415 unsupported_media_type",
      res.status === 415 && data.error === "unsupported_media_type",
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    record("8. Unsupported Content-Type rejected", false, err.message);
  }

  // 9. Malformed JSON rejection
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/rfq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ unquoted_key: invalid_json, }",
    });
    const data = await res.json();
    record(
      "9. Malformed JSON rejected with HTTP 400 malformed_json",
      res.status === 400 && data.error === "malformed_json",
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    record("9. Malformed JSON rejected", false, err.message);
  }

  console.log(`\nLive RFQ Protection Tests: ${passed}/${total} passed.`);
}

runLiveRfqAudit();

