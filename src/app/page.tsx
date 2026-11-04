import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechCallout } from "@/components/ui/tech-callout";
import { Reveal } from "@/components/ui/reveal";
import { RevealGroup } from "@/components/ui/reveal-group";
import { COMPANY_INFO, ENGINEERING_SERVICES } from "@/lib/constants";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Activity,
  Shield,
  RotateCw,
  Compass,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Rotating Equipment Engineering & Industrial Oilfield Services Nigeria",
  description:
    "KOD Technical Services provides precision laser alignment, dynamic balancing, industrial pump and compressor overhauls, and machine shop servicing in Port Harcourt, Nigeria.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rotating Equipment Engineering & Industrial Oilfield Services — KOD Technical Services",
    description:
      "Precision laser alignment, dynamic balancing, industrial pump and compressor overhauls, and machine shop servicing in Port Harcourt, Nigeria.",
    url: "/",
  },
};

export default function HomePage() {
  // Flagship 6 capabilities for the homepage preview
  const featuredServices = [
    ENGINEERING_SERVICES[3], // Laser & Precision Alignment
    ENGINEERING_SERVICES[4], // Rotating Equipment Overhaul
    ENGINEERING_SERVICES[10], // Ultra-Modern Machine Shop
    ENGINEERING_SERVICES[6], // Condition Monitoring
    ENGINEERING_SERVICES[5], // Equipment Retrofitting
    ENGINEERING_SERVICES[0], // Procurement Services
  ];

  // Operational domains supported
  const industrialDomains = [
    {
      id: "DOM-01",
      sector: "Upstream Oil & Gas",
      focus: "Offshore Platforms & Flowstations",
      machinery: "Crude Export Pumps • Water Injection Skids • Gas Compressors",
      description:
        "Rig-site vibration diagnosis, skid soleplate re-leveling, and emergency pump changeouts under strict offshore safety controls.",
    },
    {
      id: "DOM-02",
      sector: "Refining & Petrochemicals",
      focus: "Continuous Process Plants",
      machinery: "API 610 Centrifugal Pumps • Heavy Boiler Feed Units • Slurry Agitators",
      description:
        "Turnaround overhauls, mechanical seal upgrades to API 682, and hot/cold alignment under thermal growth constraints.",
    },
    {
      id: "DOM-03",
      sector: "Marine & Offshore Vessels",
      focus: "Supply Vessels & FPSO Auxiliaries",
      machinery: "Thruster Drives • High-Capacity Ballast Pumps • Firewater Systems",
      description:
        "Shaft centerline alignment, dynamic balancing of marine impellers, and machine shop refurbishment of worn bearing journals.",
    },
    {
      id: "DOM-04",
      sector: "Heavy Industrial Manufacturing",
      focus: "Power & Process Utilities",
      machinery: "Circulation Water Pumps • Heavy Gearboxes • Cooling Tower Drives",
      description:
        "Preventative maintenance programs, dynamic balancing, and casing line-boring to restore original factory tolerances.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ── SECTION B: HERO ── */}
      <section
        className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden py-16 sm:py-20 lg:py-28 bg-navy-void border-b border-white/10"
        aria-labelledby="hero-heading"
      >
        {/* Subtle engineering grid background */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient radial lighting accents */}
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] opacity-[0.05] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />

        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Column (65% width equivalent) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
              <Reveal direction="up" delay={0}>
                {/* Telemetry Operational Status Pill */}
                <div
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm border border-amber-primary/30 bg-amber-primary/10"
                  role="status"
                >
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-telemetry-green" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                    ROTATING EQUIPMENT &amp; TECHNICAL SERVICES • PORT HARCOURT
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={80}>
                {/* Main Headline */}
                <h1
                  id="hero-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-industrial-white leading-[1.08]"
                >
                  Precision Engineering for Critical{" "}
                  <span className="text-amber-primary">Rotating Machinery</span>
                </h1>
              </Reveal>

              <Reveal direction="up" delay={140}>
                {/* Verified Value Proposition Copy */}
                <p className="text-base sm:text-lg text-industrial-platinum leading-relaxed max-w-2xl">
                  Headquartered in Port Harcourt, KOD Technical Services delivers
                  precision optical and laser alignment, rotating equipment overhauls,
                  machine shop servicing, and technical procurement for
                  industrial pumps and mechanical machinery across Nigeria.
                </p>
              </Reveal>

              {/* Hero Action Button Group */}
              <Reveal direction="up" delay={200}>
                <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto justify-center"
                      icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                    >
                      Request Technical Consultation
                    </Button>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto justify-center"
                    >
                      Explore 11 Disciplines
                    </Button>
                  </Link>
                </div>
              </Reveal>

              {/* Telemetry Metrics Bar */}
              <Reveal direction="up" delay={260} className="w-full">
                <div
                  className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10 mt-2"
                  aria-label="Verified engineering standards and scope"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-primary tracking-tight">
                      11
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Technical Disciplines
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-primary tracking-tight">
                      Port Harcourt
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Machine Shop &amp; HQ
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-primary tracking-tight">
                      Callout
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Emergency Availability
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-cyan-telemetry tracking-tight">
                      Precision
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Laser Alignment
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hero Right Column: Authentic Field Photography */}
            <div className="lg:col-span-5 relative">
              <Reveal direction="left" delay={150}>
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-sm bg-navy-base border border-white/10 p-5 sm:p-6 shadow-industrial-lg">
                  {/* Precision HUD Corner Brackets */}
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  {/* HUD Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-primary" aria-hidden="true" />
                      <span className="text-industrial-white font-bold tracking-wider uppercase">
                        FIELD OPERATIONS • RIVERS STATE
                      </span>
                    </div>
                    <span className="text-telemetry-green flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
                      STATUS: ACTIVE
                    </span>
                  </div>

                  {/* Authentic Field Photograph with Restrained Hover Zoom */}
                  <div className="photo-frame relative my-4 rounded-sm overflow-hidden border border-white/10">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/images/engineering/field-spdc-fuel-gas-scrubber.webp"
                        alt="Gas conditioning and scrubber skid installation — KOD Technical Services field operations, Rivers State"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-void/85 via-navy-void/20 to-transparent pointer-events-none" />
                      {/* High-Contrast Overlay label */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block font-mono text-[10px] text-industrial-white bg-navy-void/85 backdrop-blur-sm px-2.5 py-1 rounded-sm uppercase tracking-wider border border-white/10 shadow-sm">
                          Gas Conditioning Skid — Field Installation
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* HUD Bottom Specifications */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-[11px] font-mono">
                    <div className="flex flex-col">
                      <span className="text-industrial-silver">EQUIPMENT TYPE</span>
                      <span className="text-industrial-white font-semibold">
                        Rotating Equipment
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-industrial-silver">SCOPE</span>
                      <span className="text-industrial-white font-semibold">
                        Installation &amp; Commissioning
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-industrial-silver">LOCATION</span>
                      <span className="text-telemetry-green font-semibold">
                        Rivers State, Nigeria
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-industrial-silver">SERVICES</span>
                      <span className="text-amber-primary font-semibold">
                        Alignment &amp; Pre-Commissioning
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-industrial-silver">
                    <span>DISPATCH: PORT HARCOURT</span>
                    <span className="text-amber-primary">KOD-ENG-SYS-2026</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SECTION C: ENGINEERING CAPABILITIES PREVIEW ── */}
      <section
        className="py-16 sm:py-24 bg-navy-base"
        aria-labelledby="capabilities-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionHeading
                id="capabilities-heading"
                kicker="TECHNICAL CAPABILITIES"
                title="Core Rotating Machinery &amp; Industrial Disciplines"
                subtitle="From precision field laser alignment to comprehensive machine shop component overhauls, our specialized engineering services ensure equipment uptime across high-consequence operations."
              />
              <Link href="/services" className="shrink-0">
                <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}>
                  View All 11 Disciplines
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* 6 Featured Service Cards with Staggered Entrance */}
          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-navy-surface border border-white/8 hover:border-amber-primary/50 transition-all duration-280 hover:-translate-y-1 hover:shadow-industrial-lg card-amber-top h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-amber-primary">
                      [// {service.id}]
                    </span>
                    <Badge
                      variant={
                        service.category === "Rotating Machinery"
                          ? "cyan"
                          : service.category === "Precision Maintenance"
                            ? "amber"
                            : "neutral"
                      }
                    >
                      {service.category}
                    </Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white group-hover:text-amber-primary transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-industrial-platinum mt-3 leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-navy-base border border-white/5 text-industrial-silver"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-primary group-hover:text-amber-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm"
                  >
                    <span>Inspect Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </RevealGroup>

          {/* Directory Summary Banner */}
          <Reveal direction="up" delay={100}>
            <div className="mt-12 p-6 rounded-sm bg-navy-void border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-telemetry shrink-0 animate-pulse" aria-hidden="true" />
                <p className="text-sm text-industrial-platinum">
                  Showing 6 featured disciplines. Explore our complete 11-discipline industrial directory including Turnkey Installation, Pre-Commissioning, Commissioning, and OEM Representation.
                </p>
              </div>
              <Link href="/services" className="shrink-0">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary hover:underline flex items-center gap-1.5">
                  <span>Browse All 11 Services</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SECTION D: COMPANY INTRODUCTION & C.O.R.E VALUES ── */}
      <section
        className="py-16 sm:py-24 bg-navy-void border-t border-white/10"
        aria-labelledby="company-intro-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  INDIGENOUS OILFIELD SERVICING
                </span>
                <h2
                  id="company-intro-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-industrial-white leading-tight mt-2"
                >
                  Engineering Authority Grounded in Rigorous Standards
                </h2>
              </Reveal>
              <Reveal direction="up" delay={80}>
                <p className="text-base text-industrial-platinum leading-relaxed">
                  Operating from our specialized facility on Stellian Road in Port
                  Harcourt, KOD Technical Services was founded to deliver
                  uncompromising rotating equipment maintenance to the Nigerian oil
                  and gas industry.
                </p>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed mt-3">
                  We combine experienced mechanical technicians, calibrated optical
                  and laser alignment tools, dynamic balancing capabilities, and
                  machining tooling to resolve severe vibration, coupling misalignment,
                  and mechanical seal failures in continuous production plants.
                </p>
              </Reveal>

              {/* Verified Mission & Vision Blocks */}
              <Reveal direction="up" delay={140}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-sm bg-navy-surface border border-white/8 card-amber-top">
                    <div className="flex items-center gap-2 text-amber-primary mb-2">
                      <Target className="w-4 h-4" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        OUR MISSION
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                      &ldquo;{COMPANY_INFO.mission}&rdquo;
                    </p>
                  </div>

                  <div className="p-5 rounded-sm bg-navy-surface border border-white/8 card-amber-top">
                    <div className="flex items-center gap-2 text-cyan-telemetry mb-2">
                      <Compass className="w-4 h-4" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        OUR VISION
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                      &ldquo;{COMPANY_INFO.vision}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Facility Coordinates Card */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={100}>
                <div className="relative p-6 sm:p-8 rounded-sm bg-navy-base border border-white/10 shadow-industrial-md flex flex-col gap-6">
                  {/* Corner Brackets */}
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                      FACILITY HEADQUARTERS
                    </span>
                    <Badge variant="green">Active Machine Shop</Badge>
                  </div>

                  <div className="flex flex-col gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-bold text-industrial-white">Machine Shop &amp; Operations</span>
                        <span className="text-industrial-silver font-mono text-xs mt-0.5">
                          {COMPANY_INFO.headquarters}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-bold text-industrial-white">Technical Dispatch Line</span>
                        <a
                          href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                          className="text-amber-primary font-mono text-xs mt-0.5 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-primary rounded-sm"
                        >
                          {COMPANY_INFO.primaryPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-bold text-industrial-white">Technical Inquiries</span>
                        <a
                          href={`mailto:${COMPANY_INFO.primaryEmail}`}
                          className="text-amber-primary font-mono text-xs mt-0.5 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-primary rounded-sm"
                        >
                          {COMPANY_INFO.primaryEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  <TechCallout variant="cyan" kicker="OPERATIONAL FOCUS">
                    Equipped for pump disassembly, rotor balancing, casing line-boring, and dimensional verification to API and ISO standards.
                  </TechCallout>
                </div>
              </Reveal>
            </div>
          </div>

          {/* C.O.R.E Values Grid */}
          <div className="pt-12 border-t border-white/10">
            <Reveal direction="up">
              <div className="max-w-2xl mb-8">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  CORE VALUES
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-industrial-white mt-1">
                  Integrity, Commitment &amp; Excellence
                </h3>
              </div>
            </Reveal>

            <RevealGroup staggerMs={90} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMPANY_INFO.coreValues.map((val) => (
                <div
                  key={val.title}
                  className="p-6 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-3 card-hover card-amber-top h-full"
                >
                  <div className="w-10 h-10 rounded-sm bg-amber-primary/10 border border-amber-primary/30 flex items-center justify-center font-mono text-xl font-bold text-amber-primary">
                    {val.title.charAt(0)}
                  </div>
                  <h4 className="font-display text-lg font-bold text-industrial-white">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ── SECTION E: WHY KOD / WORKING APPROACH ── */}
      <section
        className="py-16 sm:py-24 bg-navy-base border-t border-white/10"
        aria-labelledby="why-kod-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <SectionHeading
              id="why-kod-heading"
              kicker="THE KOD METHODOLOGY"
              title="Disciplined Mechanical Engineering, Not Guesswork"
              subtitle="Rotating equipment failures are rarely random. We identify the root mechanical cause—thermal expansion offsets, casing distortion, piping strain, or unbalance—and rectify it to OEM tolerances."
              className="mb-12 max-w-3xl"
            />
          </Reveal>

          <RevealGroup staggerMs={75} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-4 card-hover card-amber-top h-full">
              <div className="w-10 h-10 rounded-sm bg-amber-primary/10 border border-amber-primary/30 flex items-center justify-center text-amber-primary">
                <RotateCw className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-industrial-white">
                Laser Precision Alignment
              </h3>
              <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                We align coupled machinery shafts and gearboxes with precision optical and laser tools, accounting for thermal growth offsets and eliminating excessive coupling strain that destroys bearings.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-4 card-hover card-amber-top h-full">
              <div className="w-10 h-10 rounded-sm bg-cyan-telemetry/10 border border-cyan-telemetry/30 flex items-center justify-center text-cyan-telemetry">
                <Wrench className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-industrial-white">
                In-House Machine Shop
              </h3>
              <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                Our Port Harcourt facility provides shaft straightening, casing
                line-boring, and wear-ring clearance re-machining, restoring
                worn components to operating tolerances.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-4 card-hover card-amber-top h-full">
              <div className="w-10 h-10 rounded-sm bg-telemetry-green/10 border border-telemetry-green/30 flex items-center justify-center text-telemetry-green">
                <Activity className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-industrial-white">
                Condition Monitoring
              </h3>
              <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                Predictive vibration measurements and temperature assessments detect early mechanical degradation before costly equipment trips occur.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-4 card-hover card-amber-top h-full">
              <div className="w-10 h-10 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center text-industrial-white">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-industrial-white">
                Emergency Callout
              </h3>
              <p className="text-xs sm:text-sm text-industrial-platinum leading-relaxed">
                When critical pumps or drives suffer unexpected mechanical faults, our field technicians mobilize across Rivers State to assess and restore machinery operation.
              </p>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION F: PROJECT & INDUSTRY TECHNICAL DOMAINS ── */}
      <section
        className="py-16 sm:py-24 bg-navy-void border-t border-white/10"
        aria-labelledby="domains-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="flex flex-col gap-6 mb-12">
              <SectionHeading
                id="domains-heading"
                kicker="OPERATIONAL ENVIRONMENTS"
                title="Industrial Sectors &amp; Severe-Duty Applications"
                subtitle="KOD Technical Services supports continuous mechanical reliability across offshore facilities, refineries, flowstations, and industrial processing utilities."
              />

              <TechCallout variant="neutral" kicker="FIELD PHOTOGRAPHY NOTICE">
                Authentic field photographs from actual KOD Technical Services deployments across Port Harcourt and Rivers State are presented in our gallery on the Projects page. In compliance with strict accuracy standards, no fictitious client logos or generic stock representations are used.
              </TechCallout>
            </div>
          </Reveal>

          <RevealGroup staggerMs={90} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industrialDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-6 sm:p-8 rounded-sm bg-navy-surface border border-white/10 flex flex-col justify-between card-amber-top h-full card-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-amber-primary">
                      [// {domain.id}]
                    </span>
                    <Badge variant="cyan">{domain.sector}</Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    {domain.focus}
                  </h3>

                  <div className="mt-3 py-2 px-3 rounded-sm bg-navy-base border border-white/5 font-mono text-xs text-amber-primary">
                    {domain.machinery}
                  </div>

                  <p className="text-sm text-industrial-platinum mt-4 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-industrial-silver">
                    Port Harcourt Engineering Center
                  </span>
                  <Link
                    href="/projects"
                    className="font-mono text-xs font-semibold text-amber-primary hover:text-amber-hover flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-primary rounded-sm"
                  >
                    <span>View Interventions</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION G: CONTACT CTA BAND ── */}
      <section
        className="py-16 sm:py-20 bg-gradient-to-b from-navy-base to-navy-void border-t border-white/10"
        aria-labelledby="contact-cta-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="relative p-8 sm:p-12 rounded-sm bg-navy-surface border border-amber-primary/40 shadow-industrial-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Corner Brackets */}
              <span className="hud-bracket-tl" aria-hidden="true" />
              <span className="hud-bracket-tr" aria-hidden="true" />
              <span className="hud-bracket-bl" aria-hidden="true" />
              <span className="hud-bracket-br" aria-hidden="true" />

              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-amber-primary font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
                  <span>DIRECT ROTATING MACHINERY CONSULTATION</span>
                </div>
                <h2
                  id="contact-cta-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-industrial-white leading-tight"
                >
                  Have a Critical Rotating Machinery Requirement?
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed">
                  Connect directly with our lead mechanical engineers in Port Harcourt to discuss laser alignment schedules, plant turnaround overhauls, or emergency breakdown interventions.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-industrial-silver pt-2">
                  <span>Phone: {COMPANY_INFO.primaryPhone}</span>
                  <span>•</span>
                  <span>Email: {COMPANY_INFO.primaryEmail}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  >
                    Contact Engineering Desk
                  </Button>
                </Link>
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-navy-base border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-navy-elevated transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
                >
                  <Phone className="w-4 h-4 text-telemetry-green" aria-hidden="true" />
                  <span>Call Hotline Now</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
