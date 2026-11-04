/**
 * Industrial RFQ Email Notification Templates
 * Generates secure, brand-aligned HTML and Plain-text templates for KOD Technical Services.
 */

import { ValidatedRfqData } from "@/lib/validation/rfq";
import { COMPANY_INFO } from "@/lib/constants";

/**
 * Escapes HTML characters to prevent XSS / markup injection in email clients.
 */
function escapeHtml(text: string | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generates the clean plain-text version of the RFQ email.
 */
export function generateRfqPlainText(data: ValidatedRfqData): string {
  return `======================================================================
KOD TECHNICAL SERVICES — NEW REQUEST FOR QUOTATION (RFQ)
======================================================================

REFERENCE ID: ${data.referenceId}
SUBMITTED AT: ${data.submittedAtWat} [UTC: ${data.submittedAtIso}]
SERVICE:      ${data.serviceTitle} [${data.serviceRequired}]

----------------------------------------------------------------------
1. CLIENT & CONTACT SPECIFICATIONS
----------------------------------------------------------------------
Full Name:                ${data.fullName}
Company / Organization:   ${data.companyName}
Work Email:               ${data.workEmail}
Telephone Number:         ${data.phoneNumber}
Preferred Contact Method: ${data.preferredContactMethod.toUpperCase()}

----------------------------------------------------------------------
2. OPERATIONAL & PROJECT PARAMETERS
----------------------------------------------------------------------
Discipline:               ${data.serviceTitle}
Project / Field Location: ${data.projectLocation}
Estimated Timeline:       ${data.estimatedTimeline}

----------------------------------------------------------------------
3. TECHNICAL SCOPE / MACHINERY REQUIREMENT
----------------------------------------------------------------------
${data.description}

----------------------------------------------------------------------
4. ADDITIONAL SPECIFICATIONS / NOTES
----------------------------------------------------------------------
${data.additionalNotes}

======================================================================
This inquiry was submitted through the official KOD Technical Services
web portal. Reply directly to this email to contact ${data.fullName}
at ${data.workEmail}.

KOD Technical Services
${COMPANY_INFO.headquarters}
Telephone: ${COMPANY_INFO.primaryPhone} | ${COMPANY_INFO.alternatePhone}
Email: ${COMPANY_INFO.primaryEmail}
======================================================================
`;
}

/**
 * Generates the high-contrast industrial HTML email template.
 */
export function generateRfqHtml(data: ValidatedRfqData): string {
  const safeFullName = escapeHtml(data.fullName);
  const safeCompanyName = escapeHtml(data.companyName);
  const safeEmail = escapeHtml(data.workEmail);
  const safePhone = escapeHtml(data.phoneNumber);
  const safeService = escapeHtml(data.serviceTitle);
  const safeLocation = escapeHtml(data.projectLocation);
  const safeTimeline = escapeHtml(data.estimatedTimeline);
  const safeContactMethod = escapeHtml(data.preferredContactMethod.toUpperCase());
  const safeRefId = escapeHtml(data.referenceId);
  const safeTimestamp = escapeHtml(data.submittedAtWat);
  const safeDescription = escapeHtml(data.description).replace(/\n/g, "<br />");
  const safeNotes = escapeHtml(data.additionalNotes).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New RFQ: ${safeRefId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050814; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #CBD5E1;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050814; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 640px; background-color: #0A1128; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px; overflow: hidden; text-align: left;">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="padding: 24px 28px; background-color: #03060F; border-bottom: 2px solid #F59E0B;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #F59E0B; letter-spacing: 1.5px; text-transform: uppercase;">
                      KOD TECHNICAL SERVICES • ENGINEERING DESK
                    </div>
                    <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin-top: 4px; letter-spacing: -0.3px;">
                      Request for Quotation (RFQ)
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="display: inline-block; padding: 4px 10px; background-color: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 3px; font-family: monospace; font-size: 11px; font-weight: bold; color: #F59E0B;">
                      ${safeRefId}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- METADATA STRIP -->
          <tr>
            <td style="padding: 14px 28px; background-color: #0E1726; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-family: monospace; font-size: 12px; color: #94A3B8;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>Received: <strong style="color: #F8FAFC;">${safeTimestamp}</strong></td>
                  <td align="right">Discipline: <strong style="color: #06B6D4;">${safeService}</strong></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLIENT SPECIFICATIONS -->
          <tr>
            <td style="padding: 24px 28px;">
              <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                1. Client &amp; Organizational Profile
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="6" style="background-color: #050814; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; font-size: 13px;">
                <tr>
                  <td width="36%" style="color: #94A3B8; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Client Name:</td>
                  <td style="color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${safeFullName}</td>
                </tr>
                <tr>
                  <td style="color: #94A3B8; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Organization:</td>
                  <td style="color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${safeCompanyName}</td>
                </tr>
                <tr>
                  <td style="color: #94A3B8; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Work Email:</td>
                  <td style="color: #F59E0B; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <a href="mailto:${safeEmail}" style="color: #F59E0B; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #94A3B8; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Contact Phone:</td>
                  <td style="color: #FFFFFF; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <a href="tel:${safePhone}" style="color: #FFFFFF; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #94A3B8; font-family: monospace;">Preferred Channel:</td>
                  <td style="color: #10B981; font-weight: bold; font-family: monospace;">${safeContactMethod}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- OPERATIONAL PARAMETERS -->
          <tr>
            <td style="padding: 0 28px 20px 28px;">
              <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                2. Operational Parameters
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="6" style="background-color: #050814; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; font-size: 13px;">
                <tr>
                  <td width="36%" style="color: #94A3B8; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Primary Discipline:</td>
                  <td style="color: #06B6D4; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${safeService}</td>
                </tr>
                <tr>
                  <td style="color: #94A3B8; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Project Location:</td>
                  <td style="color: #FFFFFF; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${safeLocation}</td>
                </tr>
                <tr>
                  <td style="color: #94A3B8; font-family: monospace;">Estimated Timeline:</td>
                  <td style="color: #FFFFFF;">${safeTimeline}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SCOPE OF WORK / DESCRIPTION -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                3. Technical Scope &amp; Machinery Description
              </div>
              <div style="padding: 16px; background-color: #050814; border-left: 3px solid #F59E0B; border-radius: 0 4px 4px 0; color: #F8FAFC; font-size: 14px; line-height: 1.6;">
                ${safeDescription}
              </div>
            </td>
          </tr>

          <!-- ADDITIONAL NOTES -->
          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                4. Additional Notes / Tag Data
              </div>
              <div style="padding: 12px 16px; background-color: #050814; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; color: #CBD5E1; font-size: 13px; line-height: 1.5;">
                ${safeNotes}
              </div>
            </td>
          </tr>

          <!-- CTA ACTIONS -->
          <tr>
            <td align="center" style="padding: 0 28px 28px 28px;">
              <a href="mailto:${safeEmail}?subject=Re:%20[${safeRefId}]%20KOD%20Technical%20Services%20Quotation%20Follow-up" style="display: inline-block; padding: 12px 24px; background-color: #F59E0B; color: #050814; font-family: monospace; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">
                Reply Directly to ${safeFullName}
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding: 20px 28px; background-color: #03060F; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748B; line-height: 1.5;">
              <div>KOD Technical Services • Rotating Equipment &amp; Oilfield Engineering</div>
              <div>${escapeHtml(COMPANY_INFO.headquarters)}</div>
              <div>Hotlines: ${COMPANY_INFO.primaryPhone} | ${COMPANY_INFO.alternatePhone}</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
