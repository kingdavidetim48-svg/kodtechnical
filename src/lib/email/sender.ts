/**
 * Server-Side Email Delivery Engine
 * Dispatches verified RFQ packages to KOD Technical Services via Resend REST API
 * (or mock provider for testing/development).
 */

import { ValidatedRfqData } from "@/lib/validation/rfq";
import { generateRfqHtml, generateRfqPlainText } from "@/lib/email/templates/rfq-notification";
import { COMPANY_INFO } from "@/lib/constants";

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: "unconfigured" | "provider_error" | "network_error" | "aborted";
  errorMessage?: string;
  isMock?: boolean;
}

/**
 * Dispatches an RFQ notification to KOD Technical Services.
 */
export async function sendRfqEmail(data: ValidatedRfqData): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const isMockMode =
    process.env.RFQ_MOCK_DELIVERY === "true" ||
    process.env.NODE_ENV === "test";

  const recipientEmail =
    process.env.RFQ_RECIPIENT_EMAIL ||
    process.env.NOTIFICATION_RECIPIENT ||
    COMPANY_INFO.primaryEmail;

  // Sending domain must be verified on Resend (e.g. quotes@kodtechnical.com or notifications@kodtechnical.com)
  // For sandbox testing, Resend allows onboarding@resend.dev
  const senderEmail =
    process.env.RFQ_SENDER_EMAIL ||
    "KOD Engineering Desk <quotes@kodtechnical.com>";

  // 1. Mock Delivery Mode (for testing or explicit mock flag)
  if (isMockMode) {
    const mockMessageId = `mock_msg_${data.referenceId.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    return {
      success: true,
      messageId: mockMessageId,
      isMock: true,
    };
  }

  // 2. Unconfigured State in Development vs Production
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      // In local dev without key, log structured operational note
      console.warn(
        `[RFQ-EMAIL-DEV] RESEND_API_KEY not configured. Logged RFQ ${data.referenceId} locally. Set RFQ_MOCK_DELIVERY=true to simulate successful delivery, or supply a real RESEND_API_KEY.`
      );
      // Return success:false to prevent the UI from claiming delivery occurred
      return {
        success: false,
        error: "unconfigured",
        errorMessage:
          "Email delivery is not configured for this development server. Your enquiry has been logged locally. Use direct contact channels to reach KOD Technical Services.",
      };
    }

    // In production, do NOT falsely claim delivery
    console.error(
      `[RFQ-EMAIL-ERROR] RESEND_API_KEY is not configured. Unable to deliver ${data.referenceId}.`
    );
    return {
      success: false,
      error: "unconfigured",
      errorMessage:
        "The server email delivery service has not been configured. Direct telephone, WhatsApp, or manual email channels remain operational.",
    };
  }

  // 3. Live Dispatch via Resend REST API
  try {
    const subject = `[${data.referenceId}] New RFQ: ${data.serviceTitle} — ${data.companyName}`;
    const htmlBody = generateRfqHtml(data);
    const textBody = generateRfqPlainText(data);

    const payload = {
      from: senderEmail,
      to: [recipientEmail],
      reply_to: data.workEmail,
      subject,
      html: htmlBody,
      text: textBody,
      tags: [
        { name: "category", value: "rfq_lead" },
        { name: "discipline", value: data.serviceRequired },
        { name: "reference_id", value: data.referenceId },
      ],
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000), // 8-second network timeout
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      const statusCode = response.status;
      // Sanitize log: log status and code without printing authorization headers
      console.error(
        `[RFQ-RESEND-FAILURE] Status: ${statusCode}, Resend error:`,
        errorJson
      );

      return {
        success: false,
        error: "provider_error",
        errorMessage: `Delivery provider rejected the transmission (Status ${statusCode}).`,
      };
    }

    const responseData = (await response.json()) as { id?: string };
    return {
      success: true,
      messageId: responseData.id || `resend_${Date.now()}`,
      isMock: false,
    };
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    console.error(
      `[RFQ-NETWORK-ERROR] ${isTimeout ? "Network timeout" : "Connection error"}:`,
      err instanceof Error ? err.message : "Unknown error"
    );

    return {
      success: false,
      error: isTimeout ? "aborted" : "network_error",
      errorMessage: isTimeout
        ? "The email delivery service timed out. Please contact our desk directly."
        : "A network error occurred while communicating with the email delivery service.",
    };
  }
}
