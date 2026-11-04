/**
 * Automated HTTP End-to-End Test Suite for POST /api/rfq
 * Tests the live Next.js route handler over HTTP with isolated test IPs.
 */

const BASE_URL = "http://localhost:3000";

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

async function runApiTests() {
  console.log("=== CHAPTER 8: RFQ HTTP ENDPOINT TEST SUITE ===\n");

  const validPayload = {
    fullName: "Engr. Patrick Briggs",
    companyName: "Chevron Nigeria Limited",
    workEmail: "pbriggs@chevron.com",
    phoneNumber: "+234 803 777 9999",
    serviceRequired: "precision-alignment",
    description: "Laser shaft alignment needed for 350kW multi-stage pump after casing replacement.",
    projectLocation: "Escravos Terminal",
    preferredContactMethod: "phone",
    estimatedTimeline: "immediate",
    additionalNotes: "Sulzer MSD 4-stage pump",
    submissionTimestamp: Date.now() - 6000,
  };

  // Test 1: Content-Type Validation (missing application/json)
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "X-Forwarded-For": "192.168.10.1",
      },
      body: "plain text",
    });
    assert(res.status === 400, "Rejects non-JSON Content-Type (HTTP 400)");
  } catch (e) {
    assert(false, "Rejects non-JSON Content-Type", e.message);
  }

  // Test 2: Malformed JSON
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.2",
      },
      body: "{ not valid json ",
    });
    assert(res.status === 400, "Rejects malformed JSON body (HTTP 400)");
  } catch (e) {
    assert(false, "Rejects malformed JSON body", e.message);
  }

  // Test 3: Missing Required Fields (Validation failure)
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.3",
      },
      body: JSON.stringify({
        fullName: "",
        workEmail: "invalid-email",
      }),
    });
    const data = await res.json();
    assert(res.status === 422, "Rejects missing required fields (HTTP 422)");
    assert(Boolean(data.errors?.fullName), "Validation response contains fullName error");
    assert(Boolean(data.errors?.workEmail), "Validation response contains workEmail error");
  } catch (e) {
    assert(false, "Rejects missing required fields", e.message);
  }

  // Test 4: Invalid Service Selection
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.4",
      },
      body: JSON.stringify({
        ...validPayload,
        serviceRequired: "unsupported-fake-service",
      }),
    });
    const data = await res.json();
    assert(res.status === 422, "Rejects unverified service discipline (HTTP 422)");
    assert(Boolean(data.errors?.serviceRequired), "Validation reports serviceRequired error");
  } catch (e) {
    assert(false, "Rejects unverified service discipline", e.message);
  }

  // Test 5: Anti-Spam Honeypot Rejection
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.5",
      },
      body: JSON.stringify({
        ...validPayload,
        honeypot: "spam-bot-trap-value",
      }),
    });
    const data = await res.json();
    assert(res.status === 400, "Rejects honeypot spam submission (HTTP 400)");
    assert(data.error === "submission_rejected", "Returns sanitized spam rejection error");
  } catch (e) {
    assert(false, "Rejects honeypot spam submission", e.message);
  }

  // Test 6: Bot Speed Trap Rejection (< 800ms completion — VUL-04 fix, threshold reduced from 2000ms)
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.6",
      },
      body: JSON.stringify({
        ...validPayload,
        submissionTimestamp: Date.now() - 400, // 400ms — well below 800ms threshold
      }),
    });
    const data = await res.json();
    assert(res.status === 400, "Rejects bot speed-trap submission under 800ms (HTTP 400)");
    assert(data.error === "submission_rejected", "Returns sanitized speed trap rejection error");
  } catch (e) {
    assert(false, "Rejects bot speed-trap submission", e.message);
  }

  // Test 7: Valid RFQ Submission
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.7",
      },
      body: JSON.stringify(validPayload),
    });
    const data = await res.json();
    assert(res.status === 200, "Accepts valid RFQ submission (HTTP 200)", `Got status ${res.status}: ${JSON.stringify(data)}`);
    assert(data.success === true, "Response returns success: true");
    assert(data.referenceId?.startsWith("KOD-RFQ-"), `Assigned valid reference ID: ${data.referenceId}`);
    assert(Boolean(data.submittedAt), `Returns formatted timestamp: ${data.submittedAt}`);
  } catch (e) {
    assert(false, "Accepts valid RFQ submission", e.message);
  }

  // Test 8: Rate Limiting Enforcement (Exceed limit of 5 submissions from one IP)
  try {
    console.log("Testing rate limiting burst on dedicated IP 198.51.100.99...");
    let blockedStatus = null;
    let retryAfterHeader = null;

    // Send rapid burst of 6 submissions
    for (let i = 0; i < 6; i++) {
      const res = await fetch(`${BASE_URL}/api/rfq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "198.51.100.99",
        },
        body: JSON.stringify({
          ...validPayload,
          workEmail: `burst${i}@chevron.com`,
          submissionTimestamp: Date.now() - 5000,
        }),
      });

      if (res.status === 429) {
        blockedStatus = res.status;
        retryAfterHeader = res.headers.get("Retry-After");
        break;
      }
    }

    assert(blockedStatus === 429, "Enforces rate limit with HTTP 429 Too Many Requests");
    assert(Boolean(retryAfterHeader), `Provides Retry-After header: ${retryAfterHeader}s`);
  } catch (e) {
    assert(false, "Enforces rate limit", e.message);
  }

  // Test 9: Duplicate Submission Prevention (VUL-02 fix — server-side idempotency)
  // Submit the same identical payload twice within 60s from the same IP.
  // Second request must return HTTP 409 Conflict.
  try {
    const dedupeIp = "192.168.10.9";
    const dedupePayload = {
      ...validPayload,
      workEmail: "dedupe.test@testcorp.com",
      fullName: "Engr. Dedupe Test",
      submissionTimestamp: Date.now() - 7000,
    };

    const firstRes = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": dedupeIp,
      },
      body: JSON.stringify(dedupePayload),
    });
    const firstData = await firstRes.json();

    // Wait a moment then send identical payload again
    await new Promise((r) => setTimeout(r, 300));

    const secondRes = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": dedupeIp,
      },
      body: JSON.stringify(dedupePayload),
    });
    const secondData = await secondRes.json();

    assert(firstRes.status === 200 && firstData.success === true, `First duplicate test submission accepted (HTTP 200) — got ${firstRes.status}: ${JSON.stringify(firstData)}`);
    assert(secondRes.status === 409, `Duplicate submission correctly rejected (HTTP 409 Conflict) — got ${secondRes.status}: ${JSON.stringify(secondData)}`);
    assert(secondData.error === "duplicate_submission", `409 response carries 'duplicate_submission' error code — got: ${secondData.error}`);
  } catch (e) {
    assert(false, "Duplicate submission prevention test", e.message);
  }

  // Test 10: isMock flag in 200 response (server running in mock mode via RFQ_MOCK_DELIVERY=true)
  try {
    const res = await fetch(`${BASE_URL}/api/rfq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "192.168.10.10",
      },
      body: JSON.stringify({
        ...validPayload,
        workEmail: "ismocheck@testcorp.com",
        submissionTimestamp: Date.now() - 8000,
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "isMock check submission accepted (HTTP 200)");
    // In this dev env RFQ_MOCK_DELIVERY=true, so isMock should be true
    assert(typeof data.isMock === "boolean", `isMock field is present and boolean — got: ${JSON.stringify(data.isMock)}`);
    assert(data.isMock === true, "isMock:true returned when server is in mock delivery mode (RFQ_MOCK_DELIVERY=true)");
  } catch (e) {
    assert(false, "isMock flag verification test", e.message);
  }

  console.log(`\n======================================================`);
  console.log(`HTTP TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log(`======================================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runApiTests().catch((err) => {
  console.error("HTTP Test execution failed:", err);
  process.exit(1);
});
