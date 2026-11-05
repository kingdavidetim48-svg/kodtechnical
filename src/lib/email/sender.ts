/**
 * Server-Side Email Delivery Engine — Formspree Integration
 *
 * Dispatches verified RFQ packages to KOD Technical Services via Formspree.
 * Formspree forwards the submission to the configured notification recipient
 * (info@kodtechnical.com) set via the Formspree dashboard.
 *
 * Integration notes:
 * - POST to https://formspree.io/f/mnpaljrr (or FORMSPREE_ENDPOINT env var)
 * - Content-Type: application/json
 * - Accept: application/json  (required to get JSON back, not HTML redirect)
 * - Formspree returns { ok: true, next: "..." } on success (HTTP 200)
 * - Formspree returns { errors: [...] } on validation failure (HTTP 4xx)
 * - Formspree enforces its own rate limit: 20 submissions / minute per form
 *
 * Security:
 * - The Formspree endpoint URL is not a secret (it is a public form ID).
 *   It is stored in an env var for configurability, not for secrecy.
 * - The customer's email is passed as the `email` field so Formspree
 *   automatically sets Reply-To. It is NOT exposed as a custom From address.
 * - No auth tokens or private credentials are used for Formspree submission.
 * - All existing server-side security controls in route.ts remain active.
 */

import { ValidatedRfqData } from "@/lib/validation/rfq";
import { generateRfqPlainText } from "@/lib/email/templates/rfq-notification";

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: "unconfigured" | "provider_error" | "network_error" | "aborted" | "provider_rate_limit" | "provider_validation";
  errorMessage?: string;
  isMock?: boolean;
}

/**
 * The Formspree endpoint. This is a public form ID, not a secret API key.
 * Configure FORMSPREE_ENDPOINT in your environment to override the default.
 * Default: https://formspree.io/f/mnpaljrr
 */
function getFormspreeEndpoint(): string {
  return (
    process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mnpaljrr"
  );
}

/**
 * Builds a structured Formspree payload from validated RFQ data.
 *
 * Keys become form field labels in the Formspree notification email.
 * The special `email` key causes Formspree to set Reply-To automatically.
 * The special `_subject` key sets the notification email subject line.
 */
function buildFormspreePayload(data: ValidatedRfqData): Record<string, string> {
  return {
    // Formspree special fields
    email: data.workEmail,
    _subject: `New KOD Technical Services RFQ — ${data.fullName}`,
    // Tracking
    reference_id: data.referenceId,
    submitted_at: data.submittedAtWat,
    // Client information
    client_name: data.fullName,
    company: data.companyName,
    work_email: data.workEmail,
    phone: data.phoneNumber,
    preferred_contact: data.preferredContactMethod.toUpperCase(),
    // Service details
    service_required: data.serviceTitle,
    service_slug: data.serviceRequired,
    project_location: data.projectLocation,
    estimated_timeline: data.estimatedTimeline,
    // Scope
    scope_of_work: data.description,
    additional_notes: data.additionalNotes,
    // Plain-text summary (full structured text version)
    full_submission_text: generateRfqPlainText(data),
  };
}

/**
 * Dispatches an RFQ notification to KOD Technical Services via Formspree.
 *
 * Formspree forwards this to the configured recipient (info@kodtechnical.com)
 * set through the Formspree dashboard — not through code or environment vars.
 */
export async function sendRfqEmail(data: ValidatedRfqData): Promise<EmailDispatchResult> {
  const isMockMode =
    process.env.RFQ_MOCK_DELIVERY === "true" ||
    process.env.NODE_ENV === "test";

  // 1. Mock Delivery Mode (for local testing or explicit mock flag)
  if (isMockMode) {
    const mockMessageId = `mock_msg_${data.referenceId.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    return {
      success: true,
      messageId: mockMessageId,
      isMock: true,
    };
  }

  // 2. Live Dispatch via Formspree REST API
  const endpoint = getFormspreeEndpoint();

  // Guard: endpoint must look like a Formspree URL
  if (!endpoint.startsWith("https://formspree.io/f/")) {
    console.error(
      `[RFQ-FORMSPREE-ERROR] FORMSPREE_ENDPOINT does not appear to be a valid Formspree URL: ${endpoint}`
    );
    return {
      success: false,
      error: "unconfigured",
      errorMessage:
        "The Formspree endpoint is not correctly configured. Direct telephone, WhatsApp, or manual email channels remain operational.",
    };
  }

  try {
    const payload = buildFormspreePayload(data);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Required by Formspree to return JSON instead of an HTML redirect
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000), // 10-second network timeout
    });

    // Parse the JSON body (Formspree always returns JSON when Accept: application/json)
    let responseData: { ok?: boolean; next?: string; errors?: Array<{ field?: string; code?: string; message?: string }>; error?: string } = {};
    try {
      responseData = await response.json();
    } catch {
      // If we cannot parse the body, treat as a network-level error
      console.error(
        `[RFQ-FORMSPREE-ERROR] Failed to parse Formspree response body for ${data.referenceId}. HTTP ${response.status}`
      );
      return {
        success: false,
        error: "provider_error",
        errorMessage: `Formspree returned an unreadable response (HTTP ${response.status}).`,
      };
    }

    // 2a. Success: Formspree accepted the submission
    if (response.ok && responseData.ok === true) {
      console.info(
        `[RFQ-FORMSPREE] Submission accepted for ${data.referenceId} (${data.companyName}).`
      );
      return {
        success: true,
        messageId: `formspree_${data.referenceId}`,
        isMock: false,
      };
    }

    // 2b. Formspree rate limit (20 submissions per minute per form)
    if (response.status === 429) {
      console.warn(
        `[RFQ-FORMSPREE-RATELIMIT] Formspree rate limit reached for ${data.referenceId}.`
      );
      return {
        success: false,
        error: "provider_rate_limit",
        errorMessage:
          "The submission service is temporarily at capacity. Please contact us directly by phone, WhatsApp, or email.",
      };
    }

    // 2c. Formspree validation or configuration rejection (4xx)
    const formspreeErrors = responseData.errors
      ?.map((e) => `${e.field ?? "form"}: ${e.message ?? e.code ?? "unknown"}`)
      .join("; ");
    const formspreeErrorMessage = responseData.error || formspreeErrors || "Unknown error";

    console.error(
      `[RFQ-FORMSPREE-FAILURE] Formspree rejected submission ${data.referenceId}. HTTP ${response.status}: ${formspreeErrorMessage}`
    );

    return {
      success: false,
      error: response.status === 422 ? "provider_validation" : "provider_error",
      errorMessage: `Submission rejected by delivery service (Status ${response.status}). Please use direct contact channels.`,
    };
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    console.error(
      `[RFQ-NETWORK-ERROR] ${isTimeout ? "Network timeout" : "Connection error"} for ${data.referenceId}:`,
      err instanceof Error ? err.message : "Unknown error"
    );

    return {
      success: false,
      error: isTimeout ? "aborted" : "network_error",
      errorMessage: isTimeout
        ? "The email delivery service timed out. Please contact our engineering desk directly."
        : "A network error occurred while transmitting your enquiry. Please use direct contact channels.",
    };
  }
}
