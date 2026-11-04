/**
 * Production RFQ Submission Endpoint
 * Route: POST /api/rfq
 *
 * Security controls:
 * - Content-type enforcement
 * - Request body size limit (64 KB)
 * - Per-IP rate limiting (distributed or in-process)
 * - Server-side schema validation
 * - Anti-spam honeypot
 * - Bot speed-trap timing
 * - Short-window duplicate submission detection
 * - CRLF header injection sanitization
 * - Structured error responses (no stack trace leakage)
 */

import { NextResponse } from "next/server";
import { validateRfqSubmission } from "@/lib/validation/rfq";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/rate-limit";
import { sendRfqEmail } from "@/lib/email/sender";
import { COMPANY_INFO } from "@/lib/constants";

// Maximum allowable request body size (64 KB)
const MAX_REQUEST_BYTES = 64 * 1024;

/**
 * Short-window duplicate submission detection.
 *
 * Prevents the same client from submitting the exact same payload within
 * a 60-second window.
 *
 * DISTRIBUTED MODE: When UPSTASH_REDIS_REST_URL is configured, uses atomic
 * Redis SET NX EX 60 to enforce cluster-wide idempotency across serverless instances.
 *
 * FALLBACK MODE: Uses an in-process Map for local development and single-instance
 * servers. Note that the in-process fallback does NOT share state across multiple
 * serverless instances.
 */
const recentSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 60_000; // 60 seconds

function isDuplicateInProcess(clientId: string, hash: number): boolean {
  const now = Date.now();
  if (recentSubmissions.size > 200) {
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > DUPLICATE_WINDOW_MS) {
        recentSubmissions.delete(key);
      }
    }
  }

  const fingerprint = `${clientId}:${hash}`;
  const lastSubmission = recentSubmissions.get(fingerprint);

  if (lastSubmission && now - lastSubmission < DUPLICATE_WINDOW_MS) {
    return true;
  }

  recentSubmissions.set(fingerprint, now);
  return false;
}

async function isDuplicateSubmission(clientId: string, bodyText: string): Promise<boolean> {
  const hash = simpleHash(bodyText);
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      // Redis atomic SET NX with 60 second expiry
      const dedupeKey = `rfq_dedupe:${clientId}:${hash}`;
      const response = await fetch(
        `${upstashUrl}/set/${encodeURIComponent(dedupeKey)}/1?ex=60&nx=true`,
        {
          headers: { Authorization: `Bearer ${upstashToken}` },
          signal: AbortSignal.timeout(2000),
        }
      );
      if (response.ok) {
        const data = (await response.json()) as { result: string | null };
        // If SET NX returns null, the key already exists -> duplicate!
        if (data.result === null) {
          return true;
        }
        return false;
      }
    } catch {
      // Fall through to in-process store on network/Upstash error
    }
  }

  return isDuplicateInProcess(clientId, hash);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash;
}

export async function POST(request: Request) {
  // 1. Client identification & rate limiting (PRE-STREAM: Drop abusive clients before consuming body memory)
  const clientId = getClientIdentifier(request);
  const rateLimit = await checkRateLimit(clientId, 5, 600); // 5 requests per 10 minutes

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        error: "rate_limit_exceeded",
        message: `Too many quote requests. Please wait ${rateLimit.retryAfter} seconds before retrying.`,
        retryAfter: rateLimit.retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.reset),
        },
      }
    );
  }

  // 2. Content-Type check
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      {
        success: false,
        error: "invalid_content_type",
        message: "Expected application/json content type.",
      },
      { status: 400 }
    );
  }

  // 3. Upfront Content-Length header check (reject oversized payloads before reading stream)
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const declaredBytes = parseInt(contentLengthHeader, 10);
    if (!isNaN(declaredBytes) && declaredBytes > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: "payload_too_large",
          message: "Request payload exceeds the 64 KB limit.",
        },
        { status: 413 }
      );
    }
  }

  // 4. Stream-bounded request body read (aborts immediately if stream exceeds 64 KB)
  let textBody: string;
  try {
    if (request.body && typeof request.body.getReader === "function") {
      const reader = request.body.getReader();
      const chunks: Uint8Array[] = [];
      let totalBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.byteLength;
        if (totalBytes > MAX_REQUEST_BYTES) {
          await reader.cancel();
          return NextResponse.json(
            {
              success: false,
              error: "payload_too_large",
              message: "Request payload exceeds the 64 KB limit.",
            },
            { status: 413 }
          );
        }
        chunks.push(value);
      }

      const fullBuffer = new Uint8Array(totalBytes);
      let offset = 0;
      for (const chunk of chunks) {
        fullBuffer.set(chunk, offset);
        offset += chunk.byteLength;
      }
      textBody = new TextDecoder().decode(fullBuffer);
    } else {
      textBody = await request.text();
      if (textBody.length > MAX_REQUEST_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: "payload_too_large",
            message: "Request payload exceeds the 64 KB limit.",
          },
          { status: 413 }
        );
      }
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "read_error",
        message: "Failed to read request body.",
      },
      { status: 400 }
    );
  }

  // 5. Parse JSON payload safely
  let rawBody: unknown;
  try {
    rawBody = JSON.parse(textBody);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "malformed_json",
        message: "Malformed JSON payload provided.",
      },
      { status: 400 }
    );
  }

  // 6. Server-side duplicate submission detection (cluster-wide via Redis, or in-process fallback)
  if (await isDuplicateSubmission(clientId, textBody)) {
    return NextResponse.json(
      {
        success: false,
        error: "duplicate_submission",
        message:
          "This enquiry appears to be a duplicate of a recent submission. If you intended to submit a new request, please modify your details and try again.",
      },
      { status: 409 }
    );
  }

  // 7. Authoritative server-side validation


  const validation = validateRfqSubmission(rawBody);

  // Bot speed trap or honeypot detection — return generic rejection
  if (validation.isSpam) {
    return NextResponse.json(
      {
        success: false,
        error: "submission_rejected",
        message: "Enquiry could not be processed at this time.",
      },
      { status: 400 }
    );
  }

  if (!validation.isValid || !validation.data) {
    return NextResponse.json(
      {
        success: false,
        error: "validation_failed",
        errors: validation.errors,
      },
      { status: 422 }
    );
  }

  const validatedData = validation.data;

  // 7. Server-side email delivery dispatch
  const dispatchResult = await sendRfqEmail(validatedData);

  if (!dispatchResult.success) {
    // Graceful error response with fallback contact channels
    return NextResponse.json(
      {
        success: false,
        error: dispatchResult.error || "delivery_failed",
        message:
          dispatchResult.errorMessage ||
          "Automated quotation transmission could not be completed at this time.",
        referenceId: validatedData.referenceId,
        fallback: {
          primaryPhone: COMPANY_INFO.primaryPhone,
          primaryPhoneRaw: COMPANY_INFO.primaryPhoneRaw,
          primaryEmail: COMPANY_INFO.primaryEmail,
          whatsappUrl: COMPANY_INFO.whatsappUrl,
        },
      },
      {
        status: dispatchResult.error === "unconfigured" ? 503 : 502,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  }

  // 8. Successful delivery confirmation
  //    NOTE: success:true means the email provider ACCEPTED the request.
  //    This confirms provider acceptance, NOT confirmed inbox delivery.
  //    Actual inbox delivery depends on DNS, SPF, DKIM and recipient server.
  return NextResponse.json(
    {
      success: true,
      referenceId: validatedData.referenceId,
      submittedAt: validatedData.submittedAtWat,
      message: `Your Request for Quotation (${validatedData.referenceId}) has been received by our engineering desk for review.`,
      isMock: dispatchResult.isMock ?? false,
    },
    {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(rateLimit.limit),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    }
  );
}
