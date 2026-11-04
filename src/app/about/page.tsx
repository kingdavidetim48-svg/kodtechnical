import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { TechCallout } from "@/components/ui/tech-callout";
import { Reveal } from "@/components/ui/reveal";
import { RevealGroup } from "@/components/ui/reveal-group";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Compass,
  Target,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  Wrench,
  RotateCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Rotating Equipment Engineering & Industrial Servicing",
  description:
    "Learn about KOD Technical Services, an indigenous engineering firm based in Port Harcourt specializing in rotating equipment maintenance, precision alignment, machine shop services, and technical procurement.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About KOD Technical Services — Industrial Engineering & Rotating Machinery",
    description:
      "Indigenous Nigerian engineering company based in Port Harcourt, Rivers State. Precision rotating machinery maintenance, laser alignment, and machine shop operations.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ]}
      />
      {/* ── SECTION 1: HEADER & COMPANY INTRODUCTION ── */}
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
                ABOUT OUR COMPANY • PORT HARCOURT, NIGERIA
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-industrial-white leading-tight">
                Indigenous Technical Services for Nigeria&apos;s Oil &amp; Gas Industry
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum leading-relaxed">
                KOD Technical Services is an indigenous Nigerian engineering company based in Port Harcourt, Rivers State. We specialize in rotating equipment servicing, precision optical and laser alignment, machine shop refurbishment, preventative maintenance, and specialized industrial procurement for the upstream, midstream, and process manufacturing sectors.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SECTION 2: MISSION & VISION ── */}
      <section
        className="py-16 sm:py-20 bg-navy-void border-b border-white/10"
        aria-labelledby="mission-vision-heading"
      >
        <Container size="default">
          <h2 id="mission-vision-heading" className="sr-only">
            Mission and Vision
          </h2>
          <RevealGroup staggerMs={90} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-4 card-amber-top h-full card-hover">
              <div className="flex items-center gap-3 text-amber-primary">
                <Target className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  OUR MISSION
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-industrial-white">
                Leadership in Oil &amp; Gas Servicing
              </h3>
              <p className="text-base text-industrial-platinum leading-relaxed italic">
                &ldquo;{COMPANY_INFO.mission}&rdquo;
              </p>
              <p className="text-xs text-industrial-silver leading-relaxed pt-2 border-t border-white/5">
                Our mission guides our commitment to safe practices, qualified technical personnel, and reliable execution on every client work scope.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-4 card-amber-top h-full card-hover">
              <div className="flex items-center gap-3 text-cyan-telemetry">
                <Compass className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  OUR VISION
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-industrial-white">
                Leading-Edge Technology &amp; Global Competitiveness
              </h3>
              <p className="text-base text-industrial-platinum leading-relaxed italic">
                &ldquo;{COMPANY_INFO.vision}&rdquo;
              </p>
              <p className="text-xs text-industrial-silver leading-relaxed pt-2 border-t border-white/5">
                We invest in calibrated alignment instrumentation, machining tooling, and modern diagnostic methods to provide local capabilities matching international industry benchmarks.
              </p>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 3: CORE VALUES (VERIFIED AUDIT WORDING) ── */}
      <section
        className="py-16 sm:py-24 bg-navy-base border-b border-white/10"
        aria-labelledby="core-values-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                FOUNDATIONAL PRINCIPLES
              </span>
              <h2
                id="core-values-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2"
              >
                CORE Values: Integrity, Commitment &amp; Excellence
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2">
                Our operations and client relationships are governed by the three verified core values established at the foundation of KOD Technical Services.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.coreValues.map((val) => (
              <div
                key={val.title}
                className="p-7 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-4 card-hover card-amber-top h-full"
              >
                <div className="w-10 h-10 rounded-sm bg-amber-primary/10 border border-amber-primary/30 flex items-center justify-center font-mono text-lg font-bold text-amber-primary">
                  {val.title.charAt(0)}
                </div>
                <h3 className="font-display text-xl font-bold text-industrial-white">
                  {val.title}
                </h3>
                <p className="text-sm text-industrial-platinum leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 4: ENGINEERING PHILOSOPHY & SERVICE APPROACH ── */}
      <section
        className="py-16 sm:py-24 bg-navy-void border-b border-white/10"
        aria-labelledby="philosophy-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  HOW WE OPERATE
                </span>
                <h2
                  id="philosophy-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-industrial-white leading-tight mt-2"
                >
                  Disciplined Engineering for High-Consequence Machinery
                </h2>
                <p className="text-base text-industrial-platinum leading-relaxed mt-4">
                  Industrial rotating machinery in oil and gas production, marine terminals, and processing facilities operate under demanding conditions. Premature mechanical breakdown causes costly production downtime and safety risks.
                </p>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed mt-3">
                  Our service approach focuses on addressing the root causes of machinery failure—such as shaft misalignment, excessive runout, dynamic unbalance, or improper mechanical seal installation—rather than merely replacing broken components repeatedly.
                </p>
              </Reveal>

              <Reveal direction="up" delay={120}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-2 card-amber-top card-hover">
                    <div className="flex items-center gap-2 text-amber-primary">
                      <RotateCw className="w-4 h-4" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase">
                        Precision Measurements
                      </span>
                    </div>
                    <p className="text-xs text-industrial-silver leading-relaxed">
                      Utilizing calibrated digital dial gauges and optical laser tools to verify clearances, soft foot, and shaft alignment coordinates.
                    </p>
                  </div>

                  <div className="p-5 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-2 card-amber-top card-hover">
                    <div className="flex items-center gap-2 text-cyan-telemetry">
                      <Wrench className="w-4 h-4" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase">
                        In-House Workshop
                      </span>
                    </div>
                    <p className="text-xs text-industrial-silver leading-relaxed">
                      Our Port Harcourt facility handles lathe turning, shaft straightening, casing line-boring, and rotor balancing under controlled conditions.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={100}>
                <div className="relative flex flex-col gap-4 p-8 rounded-sm bg-navy-base border border-white/10 shadow-industrial-lg">
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                    TECHNICAL CAPABILITIES AT A GLANCE
                  </span>
                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    11 Core Engineering Services
                  </h3>
                  <p className="text-xs text-industrial-silver leading-relaxed">
                    Our service scope covers the complete operating lifecycle of rotating machinery and plant equipment:
                  </p>

                  <div className="flex flex-col gap-2.5 pt-2">
                    {[
                      "Procurement Services & Genuine Spares",
                      "OEM Representation & Technical Sourcing",
                      "General Industrial Maintenance & Upkeep",
                      "Laser & Precision Shaft Alignment",
                      "Rotating Equipment Overhaul & Balancing",
                      "Ultra-Modern Machine Shop & Casing Boring",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-xs font-mono text-industrial-platinum"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Link href="/services">
                      <Button variant="secondary" className="w-full justify-center">
                        Browse Complete Service Catalog
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SECTION 5: FACILITY & OPERATIONAL COORDINATES ── */}
      <section
        className="py-16 sm:py-24 bg-navy-base"
        aria-labelledby="facility-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  FACILITY &amp; OPERATIONS
                </span>
                <h2
                  id="facility-heading"
                  className="font-display text-3xl font-bold text-industrial-white mt-1"
                >
                  Port Harcourt Machine Shop &amp; Operations Center
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed mt-3">
                  KOD Technical Services operates from our facility at {COMPANY_INFO.headquarters}. Our center accommodates machine shop tooling, component inspection bays, and operational coordination for field maintenance deployments across Rivers State and the Niger Delta.
                </p>

                <div className="flex flex-col gap-3 font-mono text-xs text-industrial-silver mt-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{COMPANY_INFO.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-primary shrink-0" aria-hidden="true" />
                    <span>{COMPANY_INFO.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-primary shrink-0" aria-hidden="true" />
                    <a href={`tel:${COMPANY_INFO.primaryPhoneRaw}`} className="hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-primary rounded-sm">
                      {COMPANY_INFO.primaryPhone} / {COMPANY_INFO.alternatePhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-primary shrink-0" aria-hidden="true" />
                    <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-primary rounded-sm">
                      {COMPANY_INFO.primaryEmail}
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <TechCallout variant="neutral" kicker="FIELD OPERATIONS PHOTOGRAPHS">
                    The photographs below document actual field deployments and equipment serviced by KOD Technical Services personnel. Images are sourced directly from the company&apos;s operational records. Individual client facility names and contract identities are withheld under commercial non-disclosure obligations.
                  </TechCallout>
                </div>
              </Reveal>

              {/* Refined 4-photo authentic field operations grid */}
              <RevealGroup staggerMs={70} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 hover:border-amber-primary/50 transition-colors">
                  <Image
                    src="/images/engineering/field-associated-gas-compressor-station.webp"
                    alt="Associated gas compressor station — field maintenance deployment, Rivers State"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-void/85 via-navy-void/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-navy-void/80 px-2 py-0.5 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      Gas Compressor Station
                    </span>
                  </div>
                </div>

                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 hover:border-amber-primary/50 transition-colors">
                  <Image
                    src="/images/engineering/field-compressor-skid-siemens.webp"
                    alt="Centrifugal compressor skid with drive casing — rotating equipment overhaul"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-void/85 via-navy-void/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-navy-void/80 px-2 py-0.5 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      Centrifugal Compressor Skid
                    </span>
                  </div>
                </div>

                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 hover:border-amber-primary/50 transition-colors">
                  <Image
                    src="/images/engineering/field-nov-multiplex-pump-servicing.webp"
                    alt="National Oilwell Varco multiplex pump during field servicing and inspection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-void/85 via-navy-void/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-navy-void/80 px-2 py-0.5 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      NOV Multiplex Pump Servicing
                    </span>
                  </div>
                </div>

                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 hover:border-amber-primary/50 transition-colors">
                  <Image
                    src="/images/engineering/field-crew-gas-manifold-maintenance.webp"
                    alt="KOD Technical engineering crew performing gas manifold maintenance operations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-void/85 via-navy-void/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-navy-void/80 px-2 py-0.5 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      Gas Manifold Maintenance Crew
                    </span>
                  </div>
                </div>
              </RevealGroup>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={120}>
                <div className="relative flex flex-col gap-4 p-8 rounded-sm bg-navy-surface border border-white/10 shadow-industrial-lg">
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    Contact Our Engineering Desk
                  </h3>
                  <p className="text-sm text-industrial-platinum leading-relaxed">
                    Whether you need to discuss equipment overhauls, schedule precision laser alignment, or arrange machine shop component servicing, our team is ready to assist.
                  </p>

                  <div className="flex flex-col gap-3 pt-3">
                    <Link href="/contact">
                      <Button variant="primary" className="w-full justify-center">
                        Submit Technical Inquiry
                      </Button>
                    </Link>
                    <a
                      href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-navy-base border border-white/10 hover:border-amber-primary/40 text-industrial-white font-mono text-xs font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
                    >
                      <Phone className="w-3.5 h-3.5 text-telemetry-green" aria-hidden="true" />
                      <span>Call Primary Hotline</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
