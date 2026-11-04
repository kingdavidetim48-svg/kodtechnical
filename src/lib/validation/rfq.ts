/**
 * Server-side RFQ Validation & Sanitization Schema
 * Strictly validates incoming Request for Quotation submissions.
 * Prevents email header injection and enforces engineering service constraints.
 */

import { ENGINEERING_SERVICES } from "@/lib/constants";

export interface RfqSubmissionInput {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  serviceRequired: string;
  description: string;
  projectLocation?: string;
  preferredContactMethod?: "email" | "phone" | "whatsapp";
  estimatedTimeline?: "immediate" | "within-month" | "1-3-months" | "scheduled-turnaround" | "exploratory";
  additionalNotes?: string;
  honeypot?: string;
  submissionTimestamp?: number;
}

export interface ValidatedRfqData {
  referenceId: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  serviceRequired: string;
  serviceTitle: string;
  description: string;
  projectLocation: string;
  preferredContactMethod: "email" | "phone" | "whatsapp";
  estimatedTimeline: string;
  additionalNotes: string;
  submittedAtIso: string;
  submittedAtWat: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: ValidatedRfqData;
  isSpam?: boolean;
}

// RFC-compliant safe email regex without catastrophic backtracking
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// International telephone regex (permits +, spaces, hyphens, parentheses, 7 to 20 digits)
const PHONE_REGEX = /^[+0-9\s\-()]{7,20}$/;

/**
 * Strips carriage return and line feed characters to neutralize CRLF email header injection attacks.
 */
export function sanitizeHeaderValue(value: string | undefined): string {
  if (!value) return "";
  return value.replace(/[\r\n\t]/g, " ").trim();
}

/**
 * Normalizes multi-line body text (normalizes newlines, limits maximum length).
 */
export function sanitizeBodyText(value: string | undefined, maxLength: number): string {
  if (!value) return "";
  const normalized = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return normalized.slice(0, maxLength).trim();
}

/**
 * Generates an engineering reference identifier: KOD-RFQ-YYYYMMDD-[4-HEX]
 */
export function generateRfqReferenceId(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
  return `KOD-RFQ-${year}${month}${day}-${randomHex}`;
}

/**
 * Authoritative server-side validation of RFQ submissions.
 */
export function validateRfqSubmission(
  raw: unknown,
  currentTimeMs: number = Date.now()
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!raw || typeof raw !== "object") {
    return {
      isValid: false,
      errors: { _form: "Invalid request payload. Expected a JSON object." },
    };
  }

  const input = raw as Partial<RfqSubmissionInput>;

  // 1. Anti-spam honeypot detection
  if (input.honeypot && String(input.honeypot).trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      errors: { _form: "Submission flagged by automated spam defense." },
    };
  }

  // 2. Minimum form completion time check (bot speed trap: < 0.8 seconds)
  //    Threshold set to 800ms to accommodate legitimate browser autofill.
  //    Genuine humans using autofill typically still need ~1-2s to review and click.
  if (input.submissionTimestamp && typeof input.submissionTimestamp === "number") {
    const elapsed = currentTimeMs - input.submissionTimestamp;
    if (elapsed >= 0 && elapsed < 800) {
      return {
        isValid: false,
        isSpam: true,
        errors: { _form: "Submission flagged as automated (completed unnaturally fast)." },
      };
    }
  }

  // 3. Full Name
  const fullNameRaw = sanitizeHeaderValue(input.fullName);
  if (!fullNameRaw) {
    errors.fullName = "Full name is required.";
  } else if (fullNameRaw.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  } else if (fullNameRaw.length > 80) {
    errors.fullName = "Full name must not exceed 80 characters.";
  }

  // 4. Company Name
  const companyNameRaw = sanitizeHeaderValue(input.companyName);
  if (!companyNameRaw) {
    errors.companyName = "Company or organization name is required.";
  } else if (companyNameRaw.length < 2) {
    errors.companyName = "Company name must be at least 2 characters.";
  } else if (companyNameRaw.length > 100) {
    errors.companyName = "Company name must not exceed 100 characters.";
  }

  // 5. Work Email
  const workEmailRaw = sanitizeHeaderValue(input.workEmail).toLowerCase();
  if (!workEmailRaw) {
    errors.workEmail = "Business email address is required.";
  } else if (workEmailRaw.length > 120) {
    errors.workEmail = "Email address must not exceed 120 characters.";
  } else if (!EMAIL_REGEX.test(workEmailRaw)) {
    errors.workEmail = "Please provide a valid corporate or operational email address.";
  }

  // 6. Phone Number
  const phoneNumberRaw = sanitizeHeaderValue(input.phoneNumber);
  if (!phoneNumberRaw) {
    errors.phoneNumber = "Contact telephone number is required.";
  } else if (!PHONE_REGEX.test(phoneNumberRaw)) {
    errors.phoneNumber = "Please provide a valid phone number (7–20 digits/symbols).";
  }

  // 7. Service Required (must match one of the 11 verified engineering services)
  const serviceRequiredRaw = sanitizeHeaderValue(input.serviceRequired);
  const matchedService = ENGINEERING_SERVICES.find(
    (s) => s.slug === serviceRequiredRaw || s.title.toLowerCase() === serviceRequiredRaw.toLowerCase()
  );

  if (!serviceRequiredRaw) {
    errors.serviceRequired = "Please select the primary engineering service required.";
  } else if (!matchedService) {
    errors.serviceRequired = "Selected service is not recognized in KOD's engineering catalog.";
  }

  // 8. Description / Scope of Work
  const descriptionRaw = sanitizeBodyText(input.description, 4000);
  if (!descriptionRaw) {
    errors.description = "Project description or scope of work is required.";
  } else if (descriptionRaw.length < 15) {
    errors.description = "Please provide at least 15 characters detailing the machinery or service requirement.";
  } else if (descriptionRaw.length > 3500) {
    errors.description = "Description exceeds the 3,500 character limit.";
  }

  // 9. Optional: Project Location
  const projectLocationRaw = sanitizeHeaderValue(input.projectLocation);
  if (projectLocationRaw && projectLocationRaw.length > 120) {
    errors.projectLocation = "Project location must not exceed 120 characters.";
  }

  // 10. Optional: Preferred Contact Method
  let preferredContactMethod: "email" | "phone" | "whatsapp" = "email";
  if (input.preferredContactMethod) {
    if (["email", "phone", "whatsapp"].includes(input.preferredContactMethod)) {
      preferredContactMethod = input.preferredContactMethod;
    } else {
      errors.preferredContactMethod = "Preferred contact method must be email, phone, or whatsapp.";
    }
  }

  // 11. Optional: Estimated Timeline
  const validTimelines: Record<string, string> = {
    immediate: "Immediate Mobilization (Critical Down)",
    "within-month": "Within 30 Days",
    "1-3-months": "1 to 3 Months",
    "scheduled-turnaround": "Scheduled Turnaround / Shutdown",
    exploratory: "Planning / Budgetary Exploration",
  };
  const timelineKey = input.estimatedTimeline || "within-month";
  const estimatedTimelineLabel = validTimelines[timelineKey] || "Within 30 Days";

  // 12. Optional: Additional Notes
  const additionalNotesRaw = sanitizeBodyText(input.additionalNotes, 1500);

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  const now = new Date();
  const submittedAtIso = now.toISOString();
  // Format in West Africa Time (UTC+1, Nigeria)
  const submittedAtWat = now.toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    isValid: true,
    errors: {},
    data: {
      referenceId: generateRfqReferenceId(),
      fullName: fullNameRaw,
      companyName: companyNameRaw,
      workEmail: workEmailRaw,
      phoneNumber: phoneNumberRaw,
      serviceRequired: matchedService!.slug,
      serviceTitle: matchedService!.title,
      description: descriptionRaw,
      projectLocation: projectLocationRaw || "Not Specified (Field / Facility)",
      preferredContactMethod,
      estimatedTimeline: estimatedTimelineLabel,
      additionalNotes: additionalNotesRaw || "None provided",
      submittedAtIso,
      submittedAtWat: `${submittedAtWat} (WAT / Lagos)`,
    },
  };
}
