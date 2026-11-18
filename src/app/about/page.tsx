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
    <div className="flex flex-col bg-[#06080D]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ]}
      />

      {/* ── SECTION 1: HEADER & COMPANY INTRODUCTION ── */}
      <section className="relative py-20 sm:py-28 bg-[#0B0E17] border-b border-white/[0.08] overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Ambient champagne lighting */}
        <div
          className="absolute top-0 right-10 w-[500px] h-[500px] opacity-[0.07] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, #C5A059 0%, transparent 70%)",
          }}
        />

        <div className="absolute top-0 inset-x-0 gold-hairline opacity-60" aria-hidden="true" />

        <Container size="default">
          <Reveal direction="up">
            <div className="flex flex-col items-start gap-4 max-w-3xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                ABOUT OUR COMPANY &bull; PORT HARCOURT, NIGERIA
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-industrial-white leading-[1.08]">
                Indigenous Technical Precision for Nigeria&apos;s <span className="text-gradient-gold">Energy Sector</span>
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum/90 leading-relaxed font-normal mt-1">
                KOD Technical Services is an indigenous Nigerian engineering company based in Port Harcourt, Rivers State. We specialize in rotating equipment servicing, precision optical and laser alignment, machine shop refurbishment, preventative maintenance, and specialized industrial procurement for the upstream, midstream, and process manufacturing sectors.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SECTION 2: MISSION & VISION ── */}
      <section
        className="py-16 sm:py-24 bg-[#06080D] border-b border-white/[0.08]"
        aria-labelledby="mission-vision-heading"
      >
        <Container size="default">
          <h2 id="mission-vision-heading" className="sr-only">
            Mission and Vision
          </h2>
          <RevealGroup staggerMs={90} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col gap-4 card-gold-top h-full card-hover-gold shadow-sm">
              <div className="flex items-center gap-3 text-[#C5A059]">
                <Target className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  OUR MISSION
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-industrial-white">
                Leadership in Oil &amp; Gas Servicing
              </h3>
              <p className="text-base text-industrial-platinum/90 leading-relaxed italic">
                &ldquo;{COMPANY_INFO.mission}&rdquo;
              </p>
              <p className="text-xs text-industrial-silver leading-relaxed pt-3 border-t border-white/[0.06]">
                Our mission guides our commitment to safe practices, qualified technical personnel, and reliable execution on every client work scope.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col gap-4 card-gold-top h-full card-hover-gold shadow-sm">
              <div className="flex items-center gap-3 text-telemetry-cyan">
                <Compass className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  OUR VISION
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-industrial-white">
                Leading-Edge Technology &amp; Global Competitiveness
              </h3>
              <p className="text-base text-industrial-platinum/90 leading-relaxed italic">
                &ldquo;{COMPANY_INFO.vision}&rdquo;
              </p>
              <p className="text-xs text-industrial-silver leading-relaxed pt-3 border-t border-white/[0.06]">
                We invest in calibrated alignment instrumentation, machining tooling, and modern diagnostic methods to provide local capabilities matching international industry benchmarks.
              </p>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 3: CORE VALUES ── */}
      <section
        className="py-20 sm:py-28 bg-[#0B0E17] border-b border-white/[0.08]"
        aria-labelledby="core-values-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-14">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                FOUNDATIONAL PRINCIPLES
              </span>
              <h2
                id="core-values-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2 leading-tight"
              >
                C.O.R.E Values: Integrity, Commitment &amp; Excellence
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2 leading-relaxed">
                Our operations and client relationships are governed by the three verified core values established at the foundation of KOD Technical Services.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.coreValues.map((val) => (
              <div
                key={val.title}
                className="p-8 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col gap-4 card-hover-gold card-gold-top h-full"
              >
                <div className="w-11 h-11 rounded-sm bg-[#C5A059]/15 border border-[#C5A059]/35 flex items-center justify-center font-mono text-xl font-bold text-[#F4E7BD]">
                  {val.title.charAt(0)}
                </div>
                <h3 className="font-display text-xl font-bold text-industrial-white">
                  {val.title}
                </h3>
                <p className="text-sm text-industrial-platinum/80 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 4: CONTRAST BREAKOUT — ARCHITECTURAL WARM IVORY ── */}
      <section
        className="py-20 sm:py-28 bg-[#F7F5EE] text-[#0E121A] relative"
        aria-labelledby="philosophy-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C733E] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C733E]" />
                  ENGINEERING PHILOSOPHY
                </span>
                <h2
                  id="philosophy-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#0E121A] leading-tight mt-2"
                >
                  Root-Cause Resolution for High-Consequence Machinery
                </h2>
                <p className="text-base text-[#4A5260] leading-relaxed mt-2">
                  Industrial rotating machinery in oil and gas production, marine terminals, and processing facilities operate under demanding conditions. Premature mechanical breakdown causes costly production downtime and safety risks.
                </p>
                <p className="text-sm sm:text-base text-[#4A5260] leading-relaxed mt-2">
                  Our service approach focuses on addressing the root causes of machinery failure—such as shaft misalignment, excessive runout, dynamic unbalance, or improper mechanical seal installation—rather than merely replacing broken components repeatedly.
                </p>
              </Reveal>

              <Reveal direction="up" delay={120}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="p-6 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[#8C733E]">
                      <RotateCw className="w-5 h-5" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        Precision Metrology
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                      Utilizing calibrated digital dial gauges and optical laser systems to verify axial float, soft foot, and shaft alignment coordinates under thermal offsets.
                    </p>
                  </div>

                  <div className="p-6 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[#0891B2]">
                      <Wrench className="w-5 h-5" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        In-House Machine Shop
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                      Our Port Harcourt facility handles center lathe turning, shaft straightening, casing line-boring, and rotor dynamic balancing under controlled conditions.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={100}>
                <div className="relative flex flex-col gap-4 p-8 rounded-sm bg-white border border-[#12151B]/12 shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C733E]">
                    SERVICE SCOPE AT A GLANCE
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#0E121A]">
                    11 Core Engineering Services
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                    Our service scope covers the complete operating lifecycle of rotating machinery and plant equipment:
                  </p>

                  <div className="flex flex-col gap-2.5 pt-2">
                    {[
                      "Procurement Services & Certified Spares",
                      "OEM Representation & Technical Sourcing",
                      "General Industrial Maintenance & Upkeep",
                      "Laser & Precision Shaft Alignment",
                      "Rotating Equipment Overhaul & Balancing",
                      "Ultra-Modern Machine Shop & Casing Boring",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-xs font-mono text-[#0E121A]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#8C733E] shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#12151B]/10 mt-2">
                    <Link href="/services">
                      <Button variant="dark" className="w-full justify-center text-xs">
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
        className="py-20 sm:py-28 bg-[#06080D] border-t border-white/[0.08]"
        aria-labelledby="facility-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  FACILITY &amp; OPERATIONS
                </span>
                <h2
                  id="facility-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-1 leading-tight"
                >
                  Port Harcourt Machine Shop &amp; Operations Center
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum/90 leading-relaxed mt-3">
                  KOD Technical Services operates from our facility at {COMPANY_INFO.headquarters}. Our center accommodates machine shop tooling, component inspection bays, and operational coordination for field maintenance deployments across Rivers State and the Niger Delta.
                </p>

                <div className="flex flex-col gap-3 font-mono text-xs text-industrial-silver mt-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-industrial-platinum">{COMPANY_INFO.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                    <span>{COMPANY_INFO.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                    <a href={`tel:${COMPANY_INFO.primaryPhoneRaw}`} className="text-[#F4E7BD] hover:underline font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm">
                      {COMPANY_INFO.primaryPhone} / {COMPANY_INFO.alternatePhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                    <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-[#F4E7BD] hover:underline font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm">
                      {COMPANY_INFO.primaryEmail}
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <TechCallout variant="neutral" kicker="FIELD OPERATIONS PHOTOGRAPHS">
                    The photographs below document actual field deployments and equipment serviced by KOD Technical Services personnel. Images are sourced directly from operational records. Individual client facility names and contract identities are withheld under commercial non-disclosure obligations.
                  </TechCallout>
                </div>
              </Reveal>

              {/* Refined 4-photo authentic field operations grid */}
              <RevealGroup staggerMs={70} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08] hover:border-[#C5A059]/60 transition-colors">
                  <Image
                    src="/images/engineering/field-associated-gas-compressor-station.webp"
                    alt="Associated gas compressor station — field maintenance deployment, Rivers State"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-[#06080D]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-[#06080D]/85 px-2.5 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      Gas Compressor Station
                    </span>
                  </div>
                </div>

                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08] hover:border-[#C5A059]/60 transition-colors">
                  <Image
                    src="/images/engineering/field-compressor-skid-siemens.webp"
                    alt="Centrifugal compressor skid with drive casing — rotating equipment overhaul"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-[#06080D]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-[#06080D]/85 px-2.5 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      Centrifugal Compressor Skid
                    </span>
                  </div>
                </div>

                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08] hover:border-[#C5A059]/60 transition-colors">
                  <Image
                    src="/images/engineering/field-nov-multiplex-pump-servicing.webp"
                    alt="National Oilwell Varco multiplex pump during field servicing and inspection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-[#06080D]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-[#06080D]/85 px-2.5 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      NOV Multiplex Pump Servicing
                    </span>
                  </div>
                </div>

                <div className="photo-frame group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08] hover:border-[#C5A059]/60 transition-colors">
                  <Image
                    src="/images/engineering/field-crew-gas-manifold-maintenance.webp"
                    alt="KOD Technical engineering crew performing gas manifold maintenance operations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-[#06080D]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono text-[10px] text-industrial-white bg-[#06080D]/85 px-2.5 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      Gas Manifold Maintenance Crew
                    </span>
                  </div>
                </div>
              </RevealGroup>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={120}>
                <div className="relative flex flex-col gap-4 p-8 sm:p-10 rounded-sm bg-[#111622] border border-[#C5A059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                    TECHNICAL CONSULTATION
                  </span>
                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    Connect With Our Engineering Desk
                  </h3>
                  <p className="text-sm text-industrial-platinum/80 leading-relaxed">
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
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[#06080D] border border-white/10 hover:border-[#C5A059]/60 text-industrial-white font-mono text-xs font-bold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
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
