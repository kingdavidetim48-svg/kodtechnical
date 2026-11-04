import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactEnquiryForm } from "@/components/contact/contact-enquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { RevealGroup } from "@/components/ui/reveal-group";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { COMPANY_INFO } from "@/lib/constants";
import {
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Engineering Desk & Workshop — Port Harcourt",
  description:
    "Direct contact coordinates, Port Harcourt machine shop location, telephone hotlines, WhatsApp dispatch, and technical RFQ guidance for KOD Technical Services.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Engineering Desk & Workshop — KOD Technical Services",
    description:
      "Port Harcourt facility coordinates, direct engineering hotlines (+234 803 727 0249), and Request for Quotation desk for KOD Technical Services.",
    url: "/contact",
  },
};

export default function ContactPage() {
  // Verified Google Maps search URL for Port Harcourt location
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${COMPANY_INFO.name}, 41 Stellian Road, Off Elelenwo, Port Harcourt, Nigeria`
  )}`;

  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact & RFQ", url: "/contact" },
        ]}
      />
      {/* ── HEADER SECTION ── */}
      <section className="relative py-16 sm:py-24 bg-navy-base/80 border-b border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <Container size="default">
          <Reveal direction="up">
            <div className="flex flex-col items-start gap-4 max-w-3xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                FACILITY &amp; TECHNICAL DISPATCH • PORT HARCOURT
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-industrial-white leading-tight">
                Connect with Our Engineering Operations Desk
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum leading-relaxed">
                Whether responding to critical pump downtime, scheduling precision laser alignment, or discussing plant turnaround machining, our engineering team in Port Harcourt is available for technical consultation.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── MAIN WORKSPACE: CONTACT CHANNELS & INTERACTIVE ENQUIRY FORM ── */}
      <section className="py-16 sm:py-24 bg-navy-void border-b border-white/10" aria-labelledby="contact-coordinates-heading">
        <Container size="default">
          <h2 id="contact-coordinates-heading" className="sr-only">
            Contact Information and Technical Enquiry
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 5 Columns: Verified Direct Channels */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal direction="up">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                    VERIFIED DIRECT CHANNELS
                  </span>
                  <h3 className="font-display text-2xl font-bold text-industrial-white">
                    Direct Operational Coordinates
                  </h3>
                  <p className="text-xs sm:text-sm text-industrial-silver leading-relaxed">
                    Connect immediately with our Port Harcourt engineering office via telephone, direct email, or field dispatch.
                  </p>
                </div>
              </Reveal>

              <RevealGroup staggerMs={75} className="flex flex-col gap-6">
                {/* Primary Hotline Card */}
                <div className="p-6 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-3 card-amber-top card-hover">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-amber-primary">
                      PRIMARY TECHNICAL LINE
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
                  </div>
                  <a
                    href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                    className="font-mono text-xl sm:text-2xl font-bold text-industrial-white hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm w-fit"
                  >
                    {COMPANY_INFO.primaryPhone}
                  </a>
                  <p className="text-xs text-industrial-silver leading-relaxed">
                    Direct connection for urgent maintenance mobilization, equipment breakdowns, and turnaround coordination.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-amber-primary/10 border border-amber-primary/30 text-amber-primary font-mono text-xs font-bold uppercase hover:bg-amber-primary/20 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Dial Primary Phone</span>
                    </a>
                  </div>
                </div>

                {/* Alternate Phone Card */}
                <div className="p-6 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-3 card-hover">
                  <span className="font-mono text-xs font-bold uppercase text-industrial-silver">
                    ALTERNATE TECHNICAL LINE
                  </span>
                  <a
                    href={`tel:${COMPANY_INFO.alternatePhoneRaw}`}
                    className="font-mono text-lg sm:text-xl font-bold text-industrial-white hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm w-fit"
                  >
                    {COMPANY_INFO.alternatePhone}
                  </a>
                  <p className="text-xs text-industrial-silver leading-relaxed">
                    Office inquiries, scheduled procurement follow-ups, and machine shop work orders.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`tel:${COMPANY_INFO.alternatePhoneRaw}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-navy-base border border-white/10 text-industrial-platinum font-mono text-xs font-bold uppercase hover:bg-navy-elevated transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-primary" aria-hidden="true" />
                      <span>Dial Alternate Phone</span>
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-6 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-3 card-hover">
                  <span className="font-mono text-xs font-bold uppercase text-cyan-telemetry">
                    TECHNICAL CORRESPONDENCE &amp; RFQs
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.primaryEmail}`}
                    className="font-mono text-base sm:text-lg font-bold text-industrial-white hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm w-fit break-all"
                  >
                    {COMPANY_INFO.primaryEmail}
                  </a>
                  <p className="text-xs text-industrial-silver leading-relaxed">
                    Send technical drawings, equipment datasheets, vibration logs, and formal Request for Quotation (RFQ) packages.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`mailto:${COMPANY_INFO.primaryEmail}?subject=Technical%20Inquiry%20%E2%80%94%20KOD%20Technical%20Services`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-cyan-telemetry/10 border border-cyan-telemetry/30 text-cyan-telemetry font-mono text-xs font-bold uppercase hover:bg-cyan-telemetry/20 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Send Direct Email</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp Quick Dispatch */}
                <div className="p-6 rounded-sm bg-telemetry-green/5 border border-telemetry-green/30 flex flex-col gap-3 card-hover">
                  <div className="flex items-center gap-2 text-telemetry-green font-mono text-xs font-bold uppercase">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>DIRECT WHATSAPP DISPATCH</span>
                </div>
                <h4 className="font-display text-base font-bold text-industrial-white">
                  Field Engineer WhatsApp Connect
                </h4>
                <p className="text-xs text-industrial-platinum leading-relaxed">
                  Rapidly transmit photos of machinery nameplates, damaged impellers, or urgent mobilization queries directly to our technical duty line.
                </p>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-telemetry-green text-navy-void font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-telemetry-green w-fit"
                >
                  <span>Open WhatsApp (+234 803 727 0249)</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </RevealGroup>
          </div>

          {/* Right 7 Columns: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <Reveal direction="left" delay={150}>
              <ContactEnquiryForm />
            </Reveal>
          </div>
          </div>
        </Container>
      </section>

      {/* ── SECTION 3: WORKSHOP LOCATION & OPERATIONAL HOURS ── */}
      <section className="py-16 sm:py-24 bg-navy-base border-b border-white/10" aria-labelledby="facility-location-heading">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Columns: Address & Operating Protocol */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  PHYSICAL FACILITY
                </span>
                <h2 id="facility-location-heading" className="font-display text-3xl font-bold text-industrial-white mt-1">
                  Port Harcourt Workshop &amp; Head Office
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed mt-3">
                  Our primary machine shop and engineering center is strategically located in Port Harcourt to service operating facilities across Rivers State, Bayelsa, Delta, and the wider Niger Delta petroleum corridor.
                </p>

                <div className="p-6 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs font-bold uppercase text-industrial-silver">
                        Official Physical Address:
                      </span>
                      <span className="text-sm font-mono text-industrial-white leading-relaxed">
                        {COMPANY_INFO.headquarters}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                    <Clock className="w-5 h-5 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs font-bold uppercase text-industrial-silver">
                        Operating Hours:
                      </span>
                      <span className="text-sm text-industrial-platinum font-mono">
                        {COMPANY_INFO.operatingHours}
                      </span>
                      <span className="text-xs text-industrial-silver">
                        Emergency callout available for unscheduled plant shutdowns and critical breakdowns.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-navy-surface border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-navy-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
                  >
                    <MapPin className="w-4 h-4 text-amber-primary" aria-hidden="true" />
                    <span>View Location on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-industrial-silver" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right 6 Columns: Technical RFQ Preparation Checklist */}
            <div className="lg:col-span-6">
              <Reveal direction="left" delay={150}>
                <div className="p-7 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-4 card-amber-top shadow-industrial-lg">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                    ENGINEERING RFQ CHECKLIST
                  </span>
                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    Preparing Your Scope for Rapid Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-industrial-silver leading-relaxed">
                    To accelerate engineering review and provide accurate technical recommendations, please include as much of the following data as possible when contacting our desk:
                  </p>

                  <ul className="flex flex-col gap-3 text-xs sm:text-sm text-industrial-platinum font-mono pt-2">
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-primary font-bold">01.</span>
                      <span><strong>Equipment Identity:</strong> Make, model, casing configuration (e.g., end-suction, horizontal split-case, multi-stage), and nameplate serial number.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-primary font-bold">02.</span>
                      <span><strong>Operating Parameters:</strong> RPM, operating temperature, differential head/pressure, and fluid handled (sour, hydrocarbon, chemical).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-primary font-bold">03.</span>
                      <span><strong>Observed Faults:</strong> Vibration signatures, seal leakage, bearing overheating, abnormal noise, or loss of hydraulic performance.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-primary font-bold">04.</span>
                      <span><strong>Intervention Location:</strong> Delivery to our Port Harcourt machine shop or on-site field mobilization requirement.</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
