# KOD Technical Services — Client Handover Document
**Production Website URL:** [https://kodtechnical.vercel.app](https://kodtechnical.vercel.app)  
**Corporate Headquarters:** #41 Stellian Road, Off Elelenwo, Port-Harcourt, Rivers State, Nigeria  
**Handover Date:** November 5, 2026  
**Document Classification:** Official Client Documentation  

---

## 1. Executive Summary & Purpose

This Client Handover Document provides the executive leadership, engineering managers, and technical administrators of **KOD Technical Services** with an exhaustive guide to their newly developed, high-performance web platform.

The website has been engineered specifically for the Nigerian upstream, midstream, and industrial processing sectors. It replaces the legacy WordPress website with a custom Next.js 15 App Router architecture, eliminating all previous template defects, fake boilerplate text, broken phone numbers, and inoperable contact forms.

---

## 2. Production URL & Website Architecture

- **Live Production URL:** `https://kodtechnical.vercel.app`
- **Domain Strategy:** Currently hosted on high-availability Vercel global edge infrastructure. Can be pointed to a custom domain (e.g., `kodtechnical.com`) at any time by configuring DNS records (CNAME / ALIAS) without modifying application code.
- **Corporate Contact Preservation:**
  - Primary Corporate Email: `info@kodtechnical.com`
  - Quotation Routing Email: `quotes@kodtechnical.com`
  - Primary Telephone: `+234 (0) 803 727 0249`
  - Alternate Telephone: `+234 (0) 807 177 1174`
  - WhatsApp Direct Desk: Active on `+2348037270249`

---

## 3. Main Website Pages & Site Structure

The platform comprises **18 public content routes**, pre-rendered to high-performance static HTML for sub-second loading times across Nigerian mobile and satellite networks:

| Page / Route | Primary Function | Key Features & Content |
| :--- | :--- | :--- |
| **Homepage (`/`)** | Corporate Gateway & Positioning | Hero headline, verified Port Harcourt credentials, 11 discipline cards, technical capability metrics, emergency contact callout, client inquiry funnel. |
| **About Us (`/about`)** | History, Governance & Team | Company overview, Mission & Vision, Core Values (Integrity, Commitment, Excellence), Local Content compliance declaration, workshop credentials. |
| **Services Directory (`/services`)** | 11 Disciplines Master Overview | Filterable catalog by category (Rotating Machinery, Precision Maintenance, Industrial Supply) with direct quotation links. |
| **Projects & Experience (`/projects`)** | Case Studies & Qualifications | 6 detailed engineering qualification summaries (Turbine overhaul, dynamic balancing, laser alignment, pipeline pump maintenance, compressor overhaul, emergency turnaround). |
| **Contact & RFQ (`/contact`)** | Interactive Request for Quotation | Enterprise-grade RFQ submission portal, interactive service selector, dynamic reference number generator, physical workshop location details, Google Map directions, direct WhatsApp and telephone channels. |
| **Privacy Policy (`/privacy`)** | Data Protection & NDAs | Explicit industrial client confidentiality clause, NDAs protection statement, Nigeria Data Protection Act (NDPA) compliance notice. |
| **Terms of Service (`/terms`)** | Commercial & Engineering Terms | Formal quotation validity rules (30 days), technical scope boundary definitions, warranty terms, Rivers State, Nigeria jurisdiction clause. |
| **Sitemap (`/sitemap.xml`)** | Search Engine Indexing | Dynamic XML feed listing all 18 production URLs with daily/weekly change frequencies. |
| **Robots Directives (`/robots.txt`)** | Crawler Directives | Explicit crawler permissions for search bots while protecting `/api/` endpoints. |

---

## 4. The 11 Core Engineering Services

Each engineering discipline features its own dedicated detail route containing technical specifications, machinery scope, customer prerequisites, and direct RFQ buttons:

1. **Procurement Services (`/services/procurement-services`)**  
   Strategic sourcing of OEM rotating equipment spares, API 610 pump components, cartridge mechanical seals, high-pressure process valves, and industrial couplings.
2. **OEM Representation (`/services/oem-representation`)**  
   In-country technical and commercial liaison connecting international machinery manufacturers with Nigerian asset operators.
3. **General Maintenance (`/services/maintenance-and-repair`)**  
   Scheduled preventative upkeep, lubrication management, mechanical seal inspections, and emergency breakdown repairs.
4. **Laser & Precision Alignment (`/services/precision-alignment`)**  
   Calibrated optical and laser alignment of coupled shafts (motor-pump, turbine-generator, engine-compressor) to eliminate vibration and extend bearing life.
5. **Rotating Equipment Overhaul (`/services/equipment-overhaul`)**  
   Complete mechanical teardown, cleaning, NDT inspection, dynamic rotor balancing, clearance renewal, and reassembly to factory tolerances.
6. **Equipment Retrofitting (`/services/equipment-retrofitting`)**  
   Re-engineering legacy machinery: gland packing to mechanical seal conversions, impeller trimming for updated duty points, and metallurgy upgrades.
7. **Condition Monitoring (`/services/condition-monitoring`)**  
   Predictive diagnostics: periodic vibration analysis (ISO 10816 standards), spectrum analysis, and bearing thermography.
8. **Equipment Installation (`/services/equipment-installation`)**  
   Turnkey soleplate leveling, foundation anchoring, epoxy grouting, nozzle pipe-strain elimination, and cold shaft alignment.
9. **Pre-Commissioning (`/services/pre-commissioning`)**  
   Suction line flushing, uncoupled driver bump-tests (rotation verification), seal auxiliary plan testing, instrument loop checks, and QA/QC punchlist sign-off.
10. **Commissioning & Startup (`/services/commissioning`)**  
    Live startup supervision, hot alignment verification under operating thermal equilibrium, baseline vibration fingerprinting, and client acceptance.
11. **Ultra-Modern Machine Shop (`/services/ultra-modern-machine-shop`)**  
    Port Harcourt workshop facilities: heavy-duty lathe turning, shaft straightening, casing line-boring, wear ring fabrication, and hydrostatic pressure testing.

---

## 5. How the RFQ (Request for Quotation) System Works

### 5.1 Client Submission Workflow
1. **Interactive Form:** The client visits `/contact` or clicks any "Request a Quote" button across service pages.
2. **Service Auto-Selection:** If navigated from a service detail page, the dropdown pre-selects the relevant discipline.
3. **Client-Side Validation:** The form verifies name, company name, corporate email address, international phone format (`+234...`), and detailed scope description before submission.
4. **Automated Reference Code:** Upon submission, the engine assigns a unique, audit-compliant reference ID (e.g., `KOD-RFQ-20261105-B3E2`).
5. **Anti-Spam & Bot Traps:** Submissions undergo honeypot detection and speed-trap analysis (< 2.0s human threshold) to block malicious web scrapers.
6. **Confirmation Screen:** The client receives an instant visual confirmation modal displaying their unique Reference ID and expected response window (24–48 hours).

### 5.2 How KOD Technical Services Receives Enquiries
The quotation dispatch engine uses **Resend** (an enterprise transactional email infrastructure provider) to dispatch formatted lead packages:
- **Email Subject:** `[KOD-RFQ-YYYYMMDD-XXXX] New RFQ: <Service Title> — <Company Name>`
- **Email Body:** Structured HTML email containing:
  - Client full name, title, and organization
  - Verified work email (with direct 1-click Reply-To)
  - International telephone number (with direct `tel:` click-to-call)
  - Engineering discipline selected
  - Detailed equipment operating symptoms and scope
  - Project location and timeline
  - Timestamp (West Africa Time / Lagos)
- **Fallback Telephone & WhatsApp:** If serverless network connectivity is temporarily interrupted, the form gracefully displays KOD's direct Port Harcourt telephone lines (`+234 803 727 0249`, `+234 807 177 1174`) and direct WhatsApp dispatch link.

---

## 6. Hosting, Deployment & Tech Stack

### 6.1 Technology Architecture
- **Framework:** Next.js 15.1.0 with React 19 (Server Components + App Router).
- **Styling:** Tailwind CSS with custom industrial color palette (Deep Void Navy `#0A0F1D`, Safety Amber `#F59E0B`, Telemetry Cyan `#06B6D4`, Industrial Steel `#64748B`).
- **Typography:** Google Fonts (`Syne` for industrial headings, `Inter` for technical copy, `JetBrains Mono` for asset codes and telemetry).
- **Hosting Platform:** Vercel Global Edge Network.
- **Git Version Control:** GitHub (`origin/main`).

### 6.2 Updating Website Content
To make future updates:
1. **Source Code Modifications:**
   - General company text, phone numbers, or addresses can be updated in `src/lib/constants.ts`. All 18 pages automatically inherit changes from this single source of truth.
   - Engineering service descriptions and scopes are maintained in `ENGINEERING_SERVICES` within `src/lib/constants.ts`.
2. **Deploying Updates:**
   - Pushing any commit to the `main` branch of the GitHub repository triggers an automatic, zero-downtime production deployment on Vercel.
   - Build preview URLs are automatically created for pull requests.

---

## 7. Important Third-Party Services & Integrations

The web platform is designed to connect to the following external cloud services:

1. **Vercel (Hosting & Serverless Compute):**  
   - Serves static assets from edge locations globally.  
   - Executes the serverless RFQ API (`POST /api/rfq`).
2. **Resend (Transactional Email Delivery):**  
   - Handles email dispatch to KOD's inboxes.  
   - Requires a free or pro account at `https://resend.com`.
3. **Upstash Redis (Edge-Wide Distributed Rate Limiting):**  
   - Prevents distributed DDoS and automated spam attempts across serverless instances.  
   - Free tier available at `https://upstash.com`.
4. **Google Maps & WhatsApp:**  
   - Direct navigation link to Stellian Road, Port Harcourt.  
   - Pre-formatted WhatsApp customer service chat.

---

## 8. Outstanding Client Responsibilities & Items Requiring CEO Approval

Before launching under the permanent custom domain and activating live email dispatch, the following items require formal review and approval from the **Chief Executive Officer (CEO)** of KOD Technical Services:

### Item 1: Authenticity Confirmation of 15 Engineering Photographs
- **Current State:** 15 high-resolution field photographs recovered from prior company media archives are currently displayed on the About and Projects pages.
- **CEO Action Required:** Verify that all 15 images represent genuine KOD project sites, field teams, or workshop overhauls, and confirm permission to showcase them publicly.

### Item 2: Written Permission for Client & Operator Logos
- **Current State:** Logos of major operators (Shell, Chevron, ENI/Agip, TotalEnergies, Seplat Energy, ExxonMobil) are **strictly quarantined** in `public/images/clients-pending-permission/` and **NOT** displayed on the live website.
- **CEO Action Required:** Provide written confirmation or vendor clearance authorizing public display of client logos. If not authorized, the website will remain in its current professional state without third-party logos.

### Item 3: Vector Brand Logo Asset
- **Current State:** The website utilizes a high-resolution 512×512 raster PNG of the official KOD globe icon (`kod-logo-icon.png`).
- **CEO Action Required:** Provide original master vector artwork (`.ai`, `.eps`, or `.svg`) if available, to optimize SVG rendering on ultra-high-density 4K displays.

### Item 4: Official Company Capability Statement PDF
- **Current State:** The legacy website linked to a defunct Google Doc that returned HTTP 410 Gone. The download button has been disabled pending an official document.
- **CEO Action Required:** Provide an up-to-date, approved corporate profile / capability statement in PDF format (recommended filename: `KOD-Technical-Services-Capability-Statement.pdf`) to be hosted directly on the website for asset managers to download.

### Item 5: Production Email & Rate Limiting Credentials
- **Current State:** The production API on Vercel currently operates with `RFQ_MOCK_DELIVERY=true` to protect KOD's inbox during testing.
- **Client Action Required:** Configure the following production environment variables in the Vercel Project Settings:
  - `RESEND_API_KEY`: API key from verified Resend account.
  - `RFQ_SENDER_EMAIL`: E.g., `"KOD Engineering Desk <quotes@kodtechnical.com>"`.
  - `RFQ_RECIPIENT_EMAIL`: E.g., `info@kodtechnical.com` (or designated quote recipients).
  - `RFQ_MOCK_DELIVERY`: Set to `false` for live inbox delivery.
  - `UPSTASH_REDIS_REST_URL`: Distributed Redis REST endpoint.
  - `UPSTASH_REDIS_REST_TOKEN`: Distributed Redis REST security token.

---

## 9. Ongoing Maintenance & Security Recommendations

1. **Quarterly Review of Project Summaries:** Keep the Projects page updated with recently completed machinery overhauls and turnaround contracts.
2. **DNS & SSL Monitoring:** Maintain automatic DNS and TLS renewals via Vercel / registrar to prevent certificate expiration.
3. **Email Deliverability Audits:** Perform a quarterly test RFQ to confirm SPF, DKIM, and DMARC email authentication records remain active on the primary domain.
4. **Security Isolation:** Never commit `.env.local` or raw API credentials to GitHub. Maintain all secret keys exclusively within the Vercel Encrypted Environment Variables dashboard.

---
*Signed for handover by the Engineering & Development Team.*

