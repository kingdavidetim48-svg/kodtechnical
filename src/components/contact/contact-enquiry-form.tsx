"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ENGINEERING_SERVICES, COMPANY_INFO } from "@/lib/constants";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Loader2,
  RotateCcw,
} from "lucide-react";

interface FormState {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  serviceRequired: string;
  description: string;
  projectLocation: string;
  preferredContactMethod: "email" | "phone" | "whatsapp";
  estimatedTimeline: "immediate" | "within-month" | "1-3-months" | "scheduled-turnaround" | "exploratory";
  additionalNotes: string;
  honeypot: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  workEmail?: string;
  phoneNumber?: string;
  serviceRequired?: string;
  description?: string;
  projectLocation?: string;
  _form?: string;
}

interface SubmissionSuccess {
  referenceId: string;
  submittedAt: string;
  message: string;
  serviceTitle: string;
  isMock: boolean;
}

export function ContactEnquiryForm() {
  const [formData, setFormData] = React.useState<FormState>({
    fullName: "",
    companyName: "",
    workEmail: "",
    phoneNumber: "",
    serviceRequired: "",
    description: "",
    projectLocation: "",
    preferredContactMethod: "email",
    estimatedTimeline: "within-month",
    additionalNotes: "",
    honeypot: "",
  });

  const [mountTime, setMountTime] = React.useState<number>(0);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionSuccess, setSubmissionSuccess] = React.useState<SubmissionSuccess | null>(null);
  const [submissionError, setSubmissionError] = React.useState<{
    title: string;
    message: string;
    canFallbackToDirect: boolean;
  } | null>(null);

  // Set mount timestamp for bot timing trap
  React.useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const validateClientSide = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters.";
    }

    if (!formData.companyName.trim()) {
      errs.companyName = "Company or organization name is required.";
    }

    if (!formData.workEmail.trim()) {
      errs.workEmail = "Work email address is required.";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
        formData.workEmail.trim()
      )
    ) {
      errs.workEmail = "Please enter a valid corporate email address.";
    }

    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = "Contact telephone number is required.";
    } else if (!/^[+0-9\s\-()]{7,20}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = "Please enter a valid telephone number (7 to 20 digits).";
    }

    if (!formData.serviceRequired) {
      errs.serviceRequired = "Please select the primary engineering service required.";
    }

    if (!formData.description.trim()) {
      errs.description = "Please describe the equipment, machinery symptoms, or scope of work.";
    } else if (formData.description.trim().length < 15) {
      errs.description = "Description must be at least 15 characters to explain your requirements.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, _form: undefined }));
    }
    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      // Fake delay for bots
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionSuccess({
          referenceId: "KOD-RFQ-ACCEPTED",
          submittedAt: new Date().toLocaleTimeString(),
          message: "Enquiry submitted.",
          serviceTitle: "General Engineering",
          isMock: true,
        });
      }, 500);
      return;
    }

    if (!validateClientSide()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submissionTimestamp: mountTime,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        const matched = ENGINEERING_SERVICES.find((s) => s.slug === formData.serviceRequired);
        setSubmissionSuccess({
          referenceId: result.referenceId || "KOD-RFQ-ACK",
          submittedAt: result.submittedAt || new Date().toLocaleString(),
          message: result.message || "Your RFQ package has been received.",
          serviceTitle: matched ? matched.title : formData.serviceRequired,
          isMock: result.isMock === true,
        });
      } else if (response.status === 422 && result.errors) {
        // Authoritative server validation errors
        setErrors(result.errors);
        setSubmissionError({
          title: "Specification Errors Detected",
          message: "Please correct the highlighted fields and resubmit your RFQ package.",
          canFallbackToDirect: false,
        });
      } else if (response.status === 429) {
        setSubmissionError({
          title: "Rate Limit Exceeded",
          message: result.message || "Too many quote requests from this network. Please wait before retrying.",
          canFallbackToDirect: true,
        });
      } else if (response.status === 409) {
        setSubmissionError({
          title: "Duplicate Submission Detected",
          message: result.message || "This enquiry appears to be a duplicate of a recent submission. If you intended to send a new request, please modify your details and try again.",
          canFallbackToDirect: false,
        });
      } else {
        // 503 unconfigured or 502 delivery error
        setSubmissionError({
          title: "Automated Dispatch Unavailable",
          message:
            result.message ||
            "Our automated quotation delivery service is temporarily unavailable. Your inputs have been preserved below so you can transmit directly via telephone, email, or WhatsApp.",
          canFallbackToDirect: true,
        });
      }
    } catch {
      setSubmissionError({
        title: "Network Communication Error",
        message:
          "Unable to reach the KOD quotation endpoint. Please check your network connection or transmit directly using the verified contact buttons below.",
        canFallbackToDirect: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      workEmail: "",
      phoneNumber: "",
      serviceRequired: "",
      description: "",
      projectLocation: "",
      preferredContactMethod: "email",
      estimatedTimeline: "within-month",
      additionalNotes: "",
      honeypot: "",
    });
    setMountTime(Date.now());
    setErrors({});
    setSubmissionSuccess(null);
    setSubmissionError(null);
  };

  // Pre-formatted direct mailto fallback link preserving all entered customer data
  const fallbackSubject = encodeURIComponent(
    `[Direct RFQ] ${formData.serviceRequired || "General Inquiry"} — ${formData.companyName || "Client"}`
  );
  const fallbackBody = encodeURIComponent(
    `FULL NAME: ${formData.fullName}\n` +
    `COMPANY: ${formData.companyName}\n` +
    `PHONE: ${formData.phoneNumber}\n` +
    `EMAIL: ${formData.workEmail}\n` +
    `SERVICE DISCIPLINE: ${formData.serviceRequired}\n` +
    `PROJECT LOCATION: ${formData.projectLocation || "Not Specified"}\n` +
    `ESTIMATED TIMELINE: ${formData.estimatedTimeline}\n` +
    `PREFERRED CONTACT: ${formData.preferredContactMethod.toUpperCase()}\n\n` +
    `TECHNICAL SCOPE / MACHINERY REQUIREMENT:\n${formData.description}\n\n` +
    `ADDITIONAL NOTES:\n${formData.additionalNotes || "None"}\n\n` +
    `-----------------------------------------\n` +
    `Direct dispatch via KOD Technical Services web interface.`
  );
  const fallbackMailto = `mailto:${COMPANY_INFO.primaryEmail}?subject=${fallbackSubject}&body=${fallbackBody}`;

  return (
    <div className="p-6 sm:p-8 rounded-sm bg-navy-surface border border-white/10 shadow-industrial-lg relative">
      {/* Precision corner brackets */}
      <span className="hud-bracket-tl" aria-hidden="true" />
      <span className="hud-bracket-tr" aria-hidden="true" />
      <span className="hud-bracket-bl" aria-hidden="true" />
      <span className="hud-bracket-br" aria-hidden="true" />

      {/* Form Header */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
            ENGINEERING SPECIFICATION DESK
          </span>
          <span className="font-mono text-[10px] text-industrial-silver uppercase tracking-wider">
            PORT HARCOURT • RFQ PORTAL
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-industrial-white">
          Request for Quotation (RFQ)
        </h3>
        <p className="text-xs sm:text-sm text-industrial-silver leading-relaxed">
          Provide your equipment parameters and operational scope below. All requests are routed directly to our rotating machinery engineering team for technical assessment.
        </p>
      </div>

      {/* ── SUCCESS VIEW ── */}
      {submissionSuccess ? (
        <div className="flex flex-col gap-6 py-2 animate-fade-in">
          {submissionSuccess.isMock ? (
            /* Mock / unconfigured mode — amber warning banner */
            <div className="p-5 rounded-sm bg-amber-primary/10 border border-amber-primary/30 flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs font-bold uppercase text-amber-primary">
                  Enquiry Logged — Delivery Pending Configuration
                </span>
                <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your Request for Quotation for{" "}
                  <strong>{submissionSuccess.serviceTitle}</strong> has been received. Email dispatch is currently
                  pending final configuration — our team will follow up through direct channels.
                </p>
              </div>
            </div>
          ) : (
            /* Live delivery confirmed by provider — green success banner */
            <div className="p-5 rounded-sm bg-telemetry-green/10 border border-telemetry-green/30 flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-telemetry-green shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs font-bold uppercase text-telemetry-green">
                  RFQ Successfully Transmitted
                </span>
                <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your Request for Quotation for{" "}
                  <strong>{submissionSuccess.serviceTitle}</strong> has been logged by our Port Harcourt operations desk.
                </p>
              </div>
            </div>
          )}

          {/* Reference Card */}
          <div className="p-5 rounded-sm bg-navy-base border border-white/10 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] uppercase text-industrial-silver">
                  Assigned Reference ID
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-amber-primary">
                  {submissionSuccess.referenceId}
                </span>
              </div>
              <div className="flex flex-col sm:text-right">
                <span className="font-mono text-[11px] uppercase text-industrial-silver">
                  Logged Timestamp
                </span>
                <span className="font-mono text-xs text-industrial-white">
                  {submissionSuccess.submittedAt}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-bold uppercase text-industrial-white">
                Engineering Review Protocol
              </span>
              <ul className="text-xs text-industrial-silver leading-relaxed flex flex-col gap-1.5 list-disc pl-4">
                <li>
                  Our machinery engineers will review the operating parameters, equipment tags, and service scope.
                </li>
                <li>
                  We will contact you via your preferred channel (<strong>{formData.preferredContactMethod.toUpperCase()}</strong> at{" "}
                  <strong>{formData.preferredContactMethod === "email" ? formData.workEmail : formData.phoneNumber}</strong>).
                </li>
                <li>
                  If immediate mobilization or emergency technical callout is required, you may reference this RFQ ID by dialing our direct hotlines.
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-navy-surface border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase hover:bg-navy-elevated transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-telemetry-green" aria-hidden="true" />
                <span>Call Desk With Reference ID</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-transparent border border-white/10 text-industrial-silver font-mono text-xs font-bold uppercase hover:text-industrial-white hover:border-white/20 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Submit Another RFQ</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── INTERACTIVE RFQ FORM ── */
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Honeypot field (hidden from sighted users and screen readers) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website_hp">Do not fill this field</label>
            <input
              type="text"
              id="website_hp"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          {/* Submission Error Banner */}
          {submissionError && (
            <div className="p-4 rounded-sm bg-telemetry-red/10 border border-telemetry-red/30 flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-telemetry-red shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs font-bold uppercase text-telemetry-red">
                    {submissionError.title}
                  </span>
                  <p className="text-xs text-industrial-platinum leading-relaxed">
                    {submissionError.message}
                  </p>
                </div>
              </div>

              {submissionError.canFallbackToDirect && (
                <div className="pt-2 border-t border-telemetry-red/20 flex flex-col sm:flex-row gap-2">
                  <a
                    href={fallbackMailto}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-amber-primary text-navy-void font-mono text-xs font-bold uppercase hover:bg-amber-hover transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Dispatch via Pre-filled Email</span>
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-navy-base border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase hover:bg-navy-surface transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-telemetry-green" aria-hidden="true" />
                    <span>Call Desk Direct</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 1. Client Identity & Organization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-xs font-mono font-semibold text-industrial-platinum">
                Full Name <span className="text-amber-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                disabled={isSubmitting}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Engr. Emmanuel Davies"
                className={`w-full h-11 px-3.5 rounded-sm bg-navy-base border text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors disabled:opacity-50 ${errors.fullName ? "border-telemetry-red" : "border-white/10 hover:border-white/20"
                  }`}
                aria-invalid={errors.fullName ? "true" : undefined}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
              {errors.fullName && (
                <span id="fullName-error" className="text-[11px] font-mono text-telemetry-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{errors.fullName}</span>
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="companyName" className="text-xs font-mono font-semibold text-industrial-platinum">
                Company / Organization <span className="text-amber-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                disabled={isSubmitting}
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Niger Delta Operating Co."
                className={`w-full h-11 px-3.5 rounded-sm bg-navy-base border text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors disabled:opacity-50 ${errors.companyName ? "border-telemetry-red" : "border-white/10 hover:border-white/20"
                  }`}
                aria-invalid={errors.companyName ? "true" : undefined}
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
              />
              {errors.companyName && (
                <span id="companyName-error" className="text-[11px] font-mono text-telemetry-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{errors.companyName}</span>
                </span>
              )}
            </div>
          </div>

          {/* 2. Work Email & Contact Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="workEmail" className="text-xs font-mono font-semibold text-industrial-platinum">
                Business Work Email <span className="text-amber-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="workEmail"
                name="workEmail"
                required
                disabled={isSubmitting}
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="e.g. edavies@energycorp.ng"
                className={`w-full h-11 px-3.5 rounded-sm bg-navy-base border text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors disabled:opacity-50 ${errors.workEmail ? "border-telemetry-red" : "border-white/10 hover:border-white/20"
                  }`}
                aria-invalid={errors.workEmail ? "true" : undefined}
                aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
              />
              {errors.workEmail && (
                <span id="workEmail-error" className="text-[11px] font-mono text-telemetry-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{errors.workEmail}</span>
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phoneNumber" className="text-xs font-mono font-semibold text-industrial-platinum">
                Contact Phone / WhatsApp <span className="text-amber-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                disabled={isSubmitting}
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +234 803 000 0000"
                className={`w-full h-11 px-3.5 rounded-sm bg-navy-base border text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors disabled:opacity-50 ${errors.phoneNumber ? "border-telemetry-red" : "border-white/10 hover:border-white/20"
                  }`}
                aria-invalid={errors.phoneNumber ? "true" : undefined}
                aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
              />
              {errors.phoneNumber && (
                <span id="phoneNumber-error" className="text-[11px] font-mono text-telemetry-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{errors.phoneNumber}</span>
                </span>
              )}
            </div>
          </div>

          {/* 3. Service Discipline & Project Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="serviceRequired" className="text-xs font-mono font-semibold text-industrial-platinum">
                Primary Service Discipline <span className="text-amber-primary" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <select
                  id="serviceRequired"
                  name="serviceRequired"
                  required
                  disabled={isSubmitting}
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className={`w-full h-11 px-3.5 rounded-sm bg-navy-base border text-sm text-industrial-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors appearance-none disabled:opacity-50 ${errors.serviceRequired ? "border-telemetry-red" : "border-white/10 hover:border-white/20"
                    }`}
                  aria-invalid={errors.serviceRequired ? "true" : undefined}
                  aria-describedby={errors.serviceRequired ? "serviceRequired-error" : undefined}
                >
                  <option value="" disabled className="bg-navy-void text-industrial-silver">
                    -- Select Engineering Discipline --
                  </option>
                  {ENGINEERING_SERVICES.map((service) => (
                    <option key={service.id} value={service.slug} className="bg-navy-void text-industrial-white">
                      {service.title} ({service.category})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-industrial-silver">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              {errors.serviceRequired && (
                <span id="serviceRequired-error" className="text-[11px] font-mono text-telemetry-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{errors.serviceRequired}</span>
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="projectLocation" className="text-xs font-mono font-semibold text-industrial-platinum">
                Project / Field Location <span className="text-industrial-silver font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="projectLocation"
                name="projectLocation"
                disabled={isSubmitting}
                value={formData.projectLocation}
                onChange={handleChange}
                placeholder="e.g. Onne, Bonny Island, Escravos, PH Shop"
                className="w-full h-11 px-3.5 rounded-sm bg-navy-base border border-white/10 hover:border-white/20 text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          {/* 4. Timeline & Preferred Contact Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="estimatedTimeline" className="text-xs font-mono font-semibold text-industrial-platinum">
                Estimated Project Timeline
              </label>
              <div className="relative">
                <select
                  id="estimatedTimeline"
                  name="estimatedTimeline"
                  disabled={isSubmitting}
                  value={formData.estimatedTimeline}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-sm bg-navy-base border border-white/10 hover:border-white/20 text-sm text-industrial-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors appearance-none disabled:opacity-50"
                >
                  <option value="immediate" className="bg-navy-void text-industrial-white">
                    Immediate Mobilization (Critical Down)
                  </option>
                  <option value="within-month" className="bg-navy-void text-industrial-white">
                    Within 30 Days
                  </option>
                  <option value="1-3-months" className="bg-navy-void text-industrial-white">
                    1 to 3 Months
                  </option>
                  <option value="scheduled-turnaround" className="bg-navy-void text-industrial-white">
                    Scheduled Turnaround / Shutdown
                  </option>
                  <option value="exploratory" className="bg-navy-void text-industrial-white">
                    Planning / Budgetary Exploration
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-industrial-silver">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold text-industrial-platinum">
                Preferred Response Channel
              </label>
              <div className="grid grid-cols-3 gap-2 h-11">
                {(["email", "phone", "whatsapp"] as const).map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-center gap-1.5 px-2 rounded-sm border cursor-pointer transition-colors text-xs font-mono uppercase ${formData.preferredContactMethod === method
                        ? "bg-amber-primary/10 border-amber-primary text-amber-primary font-bold"
                        : "bg-navy-base border-white/10 text-industrial-silver hover:border-white/20"
                      }`}
                  >
                    <input
                      type="radio"
                      name="preferredContactMethod"
                      value={method}
                      checked={formData.preferredContactMethod === method}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Machinery Description & Scope of Work */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="description" className="text-xs font-mono font-semibold text-industrial-platinum">
                Equipment Description &amp; Scope of Work <span className="text-amber-primary" aria-hidden="true">*</span>
              </label>
              <span className="text-[10px] font-mono text-industrial-silver">
                {formData.description.length} / 3500 chars
              </span>
            </div>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              disabled={isSubmitting}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail your rotating machinery symptoms (e.g. high vibration, mechanical seal leakage, shaft runout, impeller erosion) or required procurement parts and specifications..."
              className={`w-full p-3.5 rounded-sm bg-navy-base border text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors resize-y min-h-[110px] disabled:opacity-50 ${errors.description ? "border-telemetry-red" : "border-white/10 hover:border-white/20"
                }`}
              aria-invalid={errors.description ? "true" : undefined}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            {errors.description && (
              <span id="description-error" className="text-[11px] font-mono text-telemetry-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>{errors.description}</span>
              </span>
            )}
          </div>

          {/* 6. Additional Notes / Equipment Tags (Optional) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="additionalNotes" className="text-xs font-mono font-semibold text-industrial-platinum">
              Equipment Tag Numbers, Make/Model, or Specifications <span className="text-industrial-silver font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              disabled={isSubmitting}
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="e.g. Pump Tag: P-102A, Sulzer MSD 4-stage, 355kW WEG Motor"
              className="w-full h-11 px-3.5 rounded-sm bg-navy-base border border-white/10 hover:border-white/20 text-sm text-industrial-white placeholder:text-industrial-silver/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary transition-colors disabled:opacity-50"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-industrial-silver font-mono">
              <span className="text-amber-primary font-bold">*</span> Mandatory fields for engineering evaluation
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[220px]"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-navy-void" aria-hidden="true" />
                  <span>Transmitting RFQ...</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span>Submit Request for Quotation</span>
                  <Send className="w-4 h-4" aria-hidden="true" />
                </span>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
