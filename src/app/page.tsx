import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  title: "Precision Rotating Equipment Engineering & Oilfield Services Nigeria",
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

  // Authentic engineering operational domains
  const industrialDomains = [
    {
      id: "DOM-01",
      sector: "Upstream Production",
      focus: "Offshore Platforms & Flowstations",
      machinery: "Crude Export Pumps • Water Injection Skids • Gas Compressors",
      description:
        "Rig-site vibration diagnostics, skid soleplate leveling, and emergency pump changeouts under strict offshore operating and safety controls.",
      spec: "API 610 / ISO 13709 Standard Compliance",
    },
    {
      id: "DOM-02",
      sector: "Downstream & Petrochemical",
      focus: "Continuous Process Plants",
      machinery: "API 610 Process Pumps • Boiler Feedwater Units • Slurry Agitators",
      description:
        "Turnaround overhauls, mechanical seal upgrades to API 682, and hot/cold optical alignment under high thermal expansion differentials.",
      spec: "API 682 Mechanical Seal Piping Plans",
    },
    {
      id: "DOM-03",
      sector: "Marine & Offshore Vessels",
      focus: "Supply Vessels & FPSO Auxiliaries",
      machinery: "Thruster Drives • High-Capacity Ballast Pumps • Firewater Systems",
      description:
        "Shaft centerline alignment, dynamic balancing of marine impellers, and machine shop refurbishment of worn bearing journals.",
      spec: "ISO 1940-1 Grade G2.5 Balance Tolerances",
    },
    {
      id: "DOM-04",
      sector: "Heavy Process Manufacturing",
      focus: "Power Generation & Utilities",
      machinery: "Circulation Water Pumps • Heavy Gearboxes • Cooling Tower Drives",
      description:
        "Preventative maintenance schedules, dynamic balancing, and casing line-boring to restore original factory manufacturer clearances.",
      spec: "ISO 10816 Vibration Severity Severity Class III & IV",
    },
  ];

  return (
    <div className="flex flex-col bg-[#06080D]">
      {/* ── SECTION 1: HERO (GOLDEN PRECISION CINEMATIC OPENING) ── */}
      <section
        className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden py-16 sm:py-24 lg:py-32 bg-[#06080D] border-b border-white/[0.08]"
        aria-labelledby="hero-heading"
      >
        {/* Architectural grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Champagne gold ambient lighting */}
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] opacity-[0.09] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, #C5A059 0%, rgba(197,160,89,0.3) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-[450px] h-[450px] opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, #F4E7BD 0%, transparent 70%)",
          }}
        />

        {/* Metallic hairline accent line */}
        <div className="absolute top-0 inset-x-0 gold-hairline opacity-60" aria-hidden="true" />

        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Editorial Headline & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
              <Reveal direction="up" delay={0}>
                {/* Telemetry Operational Status Pill */}
                <div
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm border border-[#C5A059]/40 bg-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                  role="status"
                >
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-telemetry-green" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F4E7BD]">
                    ROTATING MACHINERY &bull; PORT HARCOURT DISPATCH
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={75}>
                {/* Main Confident Display Headline */}
                <h1
                  id="hero-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-industrial-white leading-[1.06]"
                >
                  Engineering Precision for Critical{" "}
                  <span className="text-gradient-gold block sm:inline">Rotating Machinery</span>
                </h1>
              </Reveal>

              <Reveal direction="up" delay={130}>
                {/* Disciplined Editorial Lead Copy */}
                <p className="text-base sm:text-lg text-industrial-platinum/90 leading-relaxed max-w-2xl font-normal">
                  Operating from our Port Harcourt engineering workshop, KOD Technical Services delivers precision laser alignment, dynamic balancing, mechanical overhauls, and machine shop servicing for high-consequence pumps, compressors, and drivers across the Nigerian energy sector.
                </p>
              </Reveal>

              {/* Action Buttons */}
              <Reveal direction="up" delay={190}>
                <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto justify-center"
                      icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                    >
                      Request Technical Quotation
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

              {/* Engineering Standards & Telemetry Readouts */}
              <Reveal direction="up" delay={250} className="w-full">
                <div
                  className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/[0.08] mt-2"
                  aria-label="Verified engineering standards and scope"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#C5A059] tracking-tight">
                      11
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Technical Disciplines
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F4E7BD] tracking-tight">
                      0.01mm
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Laser Alignment
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#C5A059] tracking-tight">
                      ISO G2.5
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Dynamic Balancing
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-telemetry-cyan tracking-tight">
                      Port Harcourt
                    </span>
                    <span className="font-mono text-[11px] text-industrial-silver uppercase tracking-wider mt-1">
                      Machine Shop &amp; HQ
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Architectural HUD Frame & Authentic Field Photography */}
            <div className="lg:col-span-5 relative">
              <Reveal direction="left" delay={120}>
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-sm bg-[#0B0E17] border border-[#C5A059]/30 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,160,89,0.12)]">
                  {/* Precision Gold Corner Datum Brackets */}
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  {/* HUD Top Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C5A059]" aria-hidden="true" />
                      <span className="text-industrial-white font-bold tracking-wider uppercase">
                        FIELD TELEMETRY // RIVERS STATE
                      </span>
                    </div>
                    <span className="text-telemetry-green flex items-center gap-1.5 font-semibold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
                      DEPLOYMENT ACTIVE
                    </span>
                  </div>

                  {/* Authentic Field Photograph with Restrained Hover Zoom */}
                  <div className="photo-frame relative my-4 rounded-sm overflow-hidden border border-white/[0.08]">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/images/engineering/field-spdc-fuel-gas-scrubber.webp"
                        alt="Gas conditioning and scrubber skid installation — KOD Technical Services field operations, Rivers State"
                        fill
                        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/90 via-[#06080D]/20 to-transparent pointer-events-none" />
                      {/* High-Contrast Technical Overlay Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="inline-block font-mono text-[10px] text-industrial-white bg-[#06080D]/90 backdrop-blur-sm px-2.5 py-1 rounded-sm uppercase tracking-wider border border-white/10 shadow-sm">
                          Gas Conditioning Skid Installation
                        </span>
                        <span className="font-mono text-[10px] text-[#F4E7BD] bg-[#C5A059]/25 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-[#C5A059]/40">
                          API 610/682
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* HUD Technical Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3.5 pt-3.5 border-t border-white/[0.08] text-[11px] font-mono">
                    <div className="flex flex-col">
                      <span className="text-industrial-silver/70">EQUIPMENT CLASS</span>
                      <span className="text-industrial-white font-semibold">
                        Multi-Stage Rotating Skid
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-industrial-silver/70">TECHNICAL SCOPE</span>
                      <span className="text-industrial-white font-semibold">
                        Laser Alignment &amp; Commissioning
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-industrial-silver/70">OPERATIONAL REGION</span>
                      <span className="text-[#F4E7BD] font-semibold">
                        Rivers State &bull; Niger Delta
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-industrial-silver/70">VIBRATION TOLERANCE</span>
                      <span className="text-telemetry-green font-semibold">
                        &lt; 0.025 mm/s ISO 10816
                      </span>
                    </div>
                  </div>

                  {/* HUD Base Bar */}
                  <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-industrial-silver">
                    <span>DISPATCH: PORT HARCOURT HQ</span>
                    <span className="text-[#C5A059] font-bold">KOD-METROLOGY-2026</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SECTION 2: HIGH-IMPACT METRICS BAR (AUTHORITY DATUM) ── */}
      <section className="py-12 bg-[#0B0E17] border-b border-white/[0.08] relative">
        <div className="absolute top-0 inset-x-0 gold-hairline opacity-40" aria-hidden="true" />
        <Container size="default">
          <Reveal direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-gold tracking-tight">
                  30+ Yrs
                </span>
                <span className="text-xs sm:text-sm text-industrial-white font-semibold mt-1">
                  Senior Engineering Leadership
                </span>
                <span className="text-[11px] font-mono text-industrial-silver mt-0.5">
                  Overhaul &amp; mechanical servicing
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
                  0.01 mm
                </span>
                <span className="text-xs sm:text-sm text-industrial-white font-semibold mt-1">
                  Optical &amp; Laser Alignment
                </span>
                <span className="text-[11px] font-mono text-industrial-silver mt-0.5">
                  Thermal growth compensation
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-gold tracking-tight">
                  ISO G2.5
                </span>
                <span className="text-xs sm:text-sm text-industrial-white font-semibold mt-1">
                  Dynamic Balancing Precision
                </span>
                <span className="text-[11px] font-mono text-industrial-silver mt-0.5">
                  In-house Port Harcourt shop
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
                  24/7
                </span>
                <span className="text-xs sm:text-sm text-industrial-white font-semibold mt-1">
                  Emergency Mobilization
                </span>
                <span className="text-[11px] font-mono text-industrial-silver mt-0.5">
                  Fast emergency breakdown dispatch
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SECTION 3: SERVICES (GOLDEN PRECISION ENGINEERING CAPABILITIES) ── */}
      <section
        className="py-20 sm:py-28 bg-[#06080D] relative"
        aria-labelledby="capabilities-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  ENGINEERING CAPABILITIES
                </span>
                <h2
                  id="capabilities-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-industrial-white mt-2 leading-tight"
                >
                  Core Rotating Machinery &amp; Industrial Disciplines
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum/80 mt-2 max-w-2xl leading-relaxed">
                  From rig-site laser shaft alignment to comprehensive machine shop component overhauls, our specialized engineering services ensure equipment uptime across high-consequence operations.
                </p>
              </div>
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
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-sm bg-[#111622] border border-white/[0.08] hover:border-[#C5A059]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.18)] card-gold-top h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-xs font-bold text-[#C5A059] tracking-wider">
                      {"//"} {service.id}
                    </span>
                    <Badge
                      variant={
                        service.category === "Rotating Machinery"
                          ? "cyan"
                          : service.category === "Precision Maintenance"
                            ? "gold"
                            : "neutral"
                      }
                    >
                      {service.category}
                    </Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white group-hover:text-[#F4E7BD] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-industrial-platinum/80 mt-3 leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.06]">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-sm bg-[#0B0E17] border border-white/[0.06] text-industrial-silver"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] group-hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
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
            <div className="mt-12 p-6 sm:p-7 rounded-sm bg-[#0B0E17] border border-[#C5A059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
              <div className="flex items-center gap-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-telemetry-green shrink-0 animate-pulse" aria-hidden="true" />
                <p className="text-sm text-industrial-platinum">
                  Showing 6 featured disciplines. Explore our complete 11-discipline industrial directory including Turnkey Installation, Pre-Commissioning, Dynamic Balancing, and OEM Representation.
                </p>
              </div>
              <Link href="/services" className="shrink-0">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#F4E7BD] hover:underline flex items-center gap-1.5">
                  <span>Browse All 11 Services</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SECTION 4: ARCHITECTURAL CONTRAST BREAKOUT — WARM IVORY EDITORIAL ── */}
      {/* This delivers the "balance dark cinematic sections with bright, refined sections" requirement */}
      <section
        className="py-20 sm:py-28 bg-[#F7F5EE] text-[#0E121A] relative overflow-hidden"
        aria-labelledby="why-choose-kod-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left 7 Columns: Editorial Text & 4 Strength Pillars */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C733E] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C733E]" />
                  THE KOD ENGINEERING ADVANTAGE
                </span>
                <h2
                  id="why-choose-kod-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0E121A] leading-tight mt-2"
                >
                  Disciplined Mechanical Engineering, Not Guesswork
                </h2>
                <p className="text-base text-[#4A5260] leading-relaxed mt-1">
                  Rotating equipment failures in continuous production plants are rarely random. We identify the root mechanical cause—thermal expansion offsets, casing distortion, piping strain, or unbalance—and rectify it to original OEM tolerances.
                </p>
              </Reveal>

              <RevealGroup staggerMs={75} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="p-6 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#8C733E]">
                    <RotateCw className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0E121A]">
                    Laser Precision Alignment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                    Coupled shafts aligned using calibrated laser metrology, accounting for thermal growth offsets and eliminating excessive coupling fatigue.
                  </p>
                </div>

                <div className="p-6 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#06B6D4]/15 border border-[#06B6D4]/30 flex items-center justify-center text-[#0891B2]">
                    <Wrench className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0E121A]">
                    In-House Machine Shop
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                    Shaft straightening, casing line-boring, and wear-ring clearance re-machining executed locally in Port Harcourt to restore OEM specs.
                  </p>
                </div>

                <div className="p-6 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#059669]">
                    <Activity className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0E121A]">
                    Condition Monitoring
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                    Predictive vibration measurements and FFT spectrum diagnostics detect bearing failure and unbalance before catastrophic plant trips occur.
                  </p>
                </div>

                <div className="p-6 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#0E121A]/10 border border-[#0E121A]/20 flex items-center justify-center text-[#0E121A]">
                    <Shield className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0E121A]">
                    Emergency Callout
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] leading-relaxed">
                    When critical pumps suffer breakdown, our emergency response crew mobilizes across Rivers State to assess and restore mechanical operation.
                  </p>
                </div>
              </RevealGroup>
            </div>

            {/* Right 5 Columns: Editorial Photo Showcase on Ivory */}
            <div className="lg:col-span-5 relative">
              <Reveal direction="left" delay={100}>
                <div className="relative p-6 sm:p-7 rounded-sm bg-white border border-[#12151B]/12 shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col gap-4">
                  <div className="photo-frame relative rounded-sm overflow-hidden border border-[#12151B]/10">
                    <div className="relative aspect-[16/11]">
                      <Image
                        src="/images/engineering/field-casing-overhaul-bearings.webp"
                        alt="Precision casing overhaul and bearing inspection at Port Harcourt facility"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute bottom-3 left-3 bg-[#0E121A]/90 text-white font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                        Machine Shop Casing Overhaul
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2">
                    <span className="font-mono text-xs font-bold text-[#8C733E] uppercase tracking-wider">
                      VERIFIED RECOVERY SPECIFICATION
                    </span>
                    <p className="text-xs text-[#4A5260] leading-relaxed">
                      Worn multi-stage centrifugal pump casing line-bored and fitted with OEM-tolerance wear rings, eliminating internal bypass and restoring differential head.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#12151B]/10 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>Facility: Stellian Rd, Port Harcourt</span>
                    <span className="text-[#8C733E] font-bold">TOLERANCE &lt; 0.015MM</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SECTION 5: AUTHENTIC FIELD PORTFOLIO & SEVERE-DUTY APPLICATIONS ── */}
      <section
        className="py-20 sm:py-28 bg-[#06080D] border-t border-white/[0.08] relative"
        aria-labelledby="domains-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="flex flex-col gap-6 mb-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                    OPERATIONAL ENVIRONMENTS
                  </span>
                  <h2
                    id="domains-heading"
                    className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-industrial-white mt-2 leading-tight"
                  >
                    Industrial Sectors &amp; Severe-Duty Applications
                  </h2>
                  <p className="text-sm sm:text-base text-industrial-platinum/80 mt-2 max-w-2xl leading-relaxed">
                    KOD Technical Services supports continuous mechanical reliability across offshore production skids, petrochemical plants, flowstations, and heavy industrial utilities.
                  </p>
                </div>
                <Link href="/projects" className="shrink-0">
                  <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}>
                    Explore Field Interventions
                  </Button>
                </Link>
              </div>

              <TechCallout variant="neutral" kicker="AUTHENTICITY &amp; NDA COMPLIANCE">
                In strict compliance with professional engineering ethics, all photography displayed represents genuine KOD field interventions in Rivers State. Client confidentiality is maintained by omitting proprietary operator markings.
              </TechCallout>
            </div>
          </Reveal>

          {/* 4 Sector Cards */}
          <RevealGroup staggerMs={90} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industrialDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-7 sm:p-8 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col justify-between card-gold-top h-full card-hover-gold"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="font-mono text-xs font-bold text-[#C5A059]">
                      {"//"} {domain.id}
                    </span>
                    <Badge variant="cyan">{domain.sector}</Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    {domain.focus}
                  </h3>

                  <div className="mt-3.5 py-2.5 px-3.5 rounded-sm bg-[#0B0E17] border border-white/[0.06] font-mono text-xs text-[#F4E7BD]">
                    {domain.machinery}
                  </div>

                  <p className="text-sm text-industrial-platinum/80 mt-4 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C5A059] font-medium">
                    {domain.spec}
                  </span>
                  <Link
                    href="/projects"
                    className="font-mono text-xs font-bold text-[#F8FAFC] hover:text-[#C5A059] flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm transition-colors"
                  >
                    <span>Inspect Domain</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </RevealGroup>

          {/* Photographic Gallery Preview Strip */}
          <Reveal direction="up" delay={120}>
            <div className="mt-14 pt-12 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider block">
                    PHOTOGRAPHIC CAPABILITY RECORD
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-industrial-white mt-1">
                    Authentic Niger Delta Field Operations
                  </h3>
                </div>
                <Link
                  href="/projects"
                  className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#F4E7BD]"
                >
                  <span>View All 9 Field Photos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="photo-frame rounded-sm border border-white/[0.08] group">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/images/engineering/field-compressor-skid-siemens.webp"
                      alt="Siemens compressor skid overhaul and alignment"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white font-medium">
                      Siemens Compressor Skid Overhaul
                    </div>
                  </div>
                </div>

                <div className="photo-frame rounded-sm border border-white/[0.08] group">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/images/engineering/field-associated-gas-compressor-station.webp"
                      alt="Associated gas compressor station pre-commissioning"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white font-medium">
                      Gas Compressor Station Alignment
                    </div>
                  </div>
                </div>

                <div className="photo-frame rounded-sm border border-white/[0.08] group">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/images/engineering/field-nov-multiplex-pump-servicing.webp"
                      alt="NOV multiplex plunger pump servicing and valve overhaul"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white font-medium">
                      Multiplex Plunger Pump Servicing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SECTION 6: COMPANY MISSION, VISION & C.O.R.E VALUES ── */}
      <section
        className="py-20 sm:py-28 bg-[#0B0E17] border-t border-white/[0.08] relative"
        aria-labelledby="company-intro-heading"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="up">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  INDIGENOUS ENGINEERING AUTHORITY
                </span>
                <h2
                  id="company-intro-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-industrial-white leading-tight mt-2"
                >
                  Rooted in Port Harcourt, Built for High-Consequence Reliability
                </h2>
              </Reveal>
              <Reveal direction="up" delay={80}>
                <p className="text-base text-industrial-platinum/90 leading-relaxed">
                  Operating from our dedicated machine shop facility on Stellian Road in Port Harcourt, KOD Technical Services was founded to deliver uncompromising rotating equipment engineering to Nigeria&apos;s energy operators and industrial manufacturing base.
                </p>
                <p className="text-sm sm:text-base text-industrial-platinum/80 leading-relaxed mt-3">
                  We unite experienced mechanical specialists, calibrated laser metrology, dynamic balancing benches, and comprehensive machine tooling to resolve excessive vibration, shaft runout, and catastrophic bearing failures in continuous operations.
                </p>
              </Reveal>

              {/* Verified Mission & Vision Cards */}
              <Reveal direction="up" delay={140}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-6 rounded-sm bg-[#111622] border border-white/[0.08] card-gold-top shadow-sm">
                    <div className="flex items-center gap-2.5 text-[#C5A059] mb-3">
                      <Target className="w-5 h-5" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        OUR MISSION
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-industrial-platinum/90 leading-relaxed italic">
                      &ldquo;{COMPANY_INFO.mission}&rdquo;
                    </p>
                  </div>

                  <div className="p-6 rounded-sm bg-[#111622] border border-white/[0.08] card-gold-top shadow-sm">
                    <div className="flex items-center gap-2.5 text-telemetry-cyan mb-3">
                      <Compass className="w-5 h-5" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        OUR VISION
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-industrial-platinum/90 leading-relaxed italic">
                      &ldquo;{COMPANY_INFO.vision}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Facility Coordinates Card */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={100}>
                <div className="relative p-7 sm:p-8 rounded-sm bg-[#111622] border border-[#C5A059]/30 shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex flex-col gap-6">
                  {/* Corner Brackets */}
                  <span className="hud-bracket-tl" aria-hidden="true" />
                  <span className="hud-bracket-tr" aria-hidden="true" />
                  <span className="hud-bracket-bl" aria-hidden="true" />
                  <span className="hud-bracket-br" aria-hidden="true" />

                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                      FACILITY HEADQUARTERS
                    </span>
                    <Badge variant="green">Active Machine Shop</Badge>
                  </div>

                  <div className="flex flex-col gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-bold text-industrial-white">Machine Shop &amp; Operations</span>
                        <span className="text-industrial-silver font-mono text-xs mt-0.5">
                          {COMPANY_INFO.headquarters}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-bold text-industrial-white">Technical Dispatch Line</span>
                        <a
                          href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                          className="text-[#F4E7BD] font-mono text-xs mt-0.5 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm font-semibold"
                        >
                          {COMPANY_INFO.primaryPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-bold text-industrial-white">Engineering Inquiries</span>
                        <a
                          href={`mailto:${COMPANY_INFO.primaryEmail}`}
                          className="text-[#F4E7BD] font-mono text-xs mt-0.5 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm font-semibold"
                        >
                          {COMPANY_INFO.primaryEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  <TechCallout variant="cyan" kicker="TOOLING &amp; APPARATUS">
                    Equipped with dynamic balancing machines, precision center lathes, horizontal line-boring tooling, and calibrated dual-laser shaft alignment systems.
                  </TechCallout>
                </div>
              </Reveal>
            </div>
          </div>

          {/* C.O.R.E Values Grid */}
          <div className="pt-12 border-t border-white/[0.08]">
            <Reveal direction="up">
              <div className="max-w-2xl mb-8">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  FOUNDATIONAL CODE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-industrial-white mt-1">
                  The C.O.R.E Values: Integrity, Commitment &amp; Excellence
                </h3>
              </div>
            </Reveal>

            <RevealGroup staggerMs={90} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMPANY_INFO.coreValues.map((val) => (
                <div
                  key={val.title}
                  className="p-7 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col gap-3.5 card-hover-gold card-gold-top h-full"
                >
                  <div className="w-11 h-11 rounded-sm bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center font-mono text-xl font-bold text-[#F4E7BD]">
                    {val.title.charAt(0)}
                  </div>
                  <h4 className="font-display text-lg font-bold text-industrial-white">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-industrial-platinum/80 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ── SECTION 7: HIGH-CONVERSION RFQ & DISPATCH CALLOUT ── */}
      <section
        className="py-20 sm:py-28 bg-[#06080D] border-t border-white/[0.08] relative"
        aria-labelledby="contact-cta-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="relative p-8 sm:p-14 rounded-sm bg-gradient-to-r from-[#0B0E17] via-[#111622] to-[#0B0E17] border border-[#C5A059]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(197,160,89,0.18)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              {/* Corner Brackets */}
              <span className="hud-bracket-tl" aria-hidden="true" />
              <span className="hud-bracket-tr" aria-hidden="true" />
              <span className="hud-bracket-bl" aria-hidden="true" />
              <span className="hud-bracket-br" aria-hidden="true" />

              <div className="flex flex-col gap-3.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[#C5A059] font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
                  <span>DIRECT ROTATING MACHINERY CONSULTATION</span>
                </div>
                <h2
                  id="contact-cta-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-industrial-white leading-tight"
                >
                  Have a Critical Rotating Machinery Scope?
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum/90 leading-relaxed">
                  Connect directly with our lead mechanical engineers in Port Harcourt to discuss laser alignment schedules, plant turnaround overhauls, dynamic balancing, or emergency breakdown interventions.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-industrial-silver pt-2">
                  <span>Phone: <strong className="text-white">{COMPANY_INFO.primaryPhone}</strong></span>
                  <span>&bull;</span>
                  <span>Email: <strong className="text-white">{COMPANY_INFO.primaryEmail}</strong></span>
                  <span>&bull;</span>
                  <span>HQ: <strong className="text-white">Port Harcourt, Nigeria</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center text-sm"
                    icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  >
                    Request Technical Quote
                  </Button>
                </Link>
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#06080D] border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase tracking-wider hover:border-[#C5A059] hover:text-[#F4E7BD] transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <Phone className="w-4 h-4 text-telemetry-green" aria-hidden="true" />
                  <span>Direct Hotline Callout</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
