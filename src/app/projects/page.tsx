import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechCallout } from "@/components/ui/tech-callout";
import { Reveal } from "@/components/ui/reveal";
import { RevealGroup } from "@/components/ui/reveal-group";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Phone,
  CheckCircle2,
  RotateCw,
  Wrench,
  Activity,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Engineering Capabilities — Oilfield & Industrial Operations",
  description:
    "Explore the operational domains, engineering challenges, and rotating equipment servicing capabilities of KOD Technical Services across oil, gas, and industrial facilities in Nigeria.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Field Capabilities — KOD Technical Services",
    description:
      "Operational domains, equipment capabilities, and authenticated field photography from KOD Technical Services rotating machinery deployments in Nigeria.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  // Credible industrial operational domains and equipment challenges
  const operationalDomains = [
    {
      id: "CAP-01",
      title: "Flowstations & Upstream Production Facilities",
      environment: "Upstream Oil & Gas",
      description:
        "Upstream production skids subject rotating equipment to continuous duty, cyclic pressure fluctuations, and vibration. Our technical scope in these environments focuses on preventing unplanned trips through precision alignment, preventative servicing, and on-site mechanical troubleshooting.",
      machineryTypes: [
        "Crude oil transfer pumps",
        "Water injection skids",
        "Produced water treatment pumps",
        "Utility air compressors and drivers",
      ],
      relevantServices: [
        "Laser & Precision Alignment",
        "Rotating Equipment Overhaul",
        "Condition Monitoring",
      ],
    },
    {
      id: "CAP-02",
      title: "Refining & Chemical Processing Plants",
      environment: "Downstream & Midstream",
      description:
        "Refining and petrochemical processes require rigorous containment and high mechanical reliability. Equipment servicing in these facilities involves strict adherence to mechanical seal plans, thermal growth considerations during alignment, and component refurbishment.",
      machineryTypes: [
        "Heavy centrifugal process pumps",
        "Boiler feedwater pump units",
        "Chemical dosing and metering skids",
        "Plant cooling water circulation pumps",
      ],
      relevantServices: [
        "Equipment Retrofitting",
        "Rotating Equipment Overhaul",
        "Procurement Services",
      ],
    },
    {
      id: "CAP-03",
      title: "Offshore Supply Vessels & Marine Terminals",
      environment: "Marine & Offshore Support",
      description:
        "Marine auxiliaries operate in corrosive coastal and offshore environments where shaft runout and unbalance cause accelerated seal degradation. Our workshop and field teams handle component balancing, shaft straightening, and pump overhauls for marine and terminal machinery.",
      machineryTypes: [
        "High-capacity ballast pumps",
        "Marine firewater pumping systems",
        "Fuel oil transfer and circulating pumps",
        "Auxiliary gearbox drives",
      ],
      relevantServices: [
        "Ultra-Modern Machine Shop & Pump Servicing",
        "Rotating Equipment Overhaul",
        "Laser & Precision Alignment",
      ],
    },
    {
      id: "CAP-04",
      title: "Manufacturing & Industrial Utilities",
      environment: "Industrial Manufacturing",
      description:
        "Heavy industrial processing plants rely on cooling systems, material transfer pumps, and high-torque drives. Our preventative maintenance and machine shop servicing restore worn equipment clearances and ensure dependable utility operation.",
      machineryTypes: [
        "Industrial water supply and circulation pumps",
        "Heavy reduction gearboxes and drives",
        "Process slurry and effluent transfer pumps",
        "Industrial blowers and fans",
      ],
      relevantServices: [
        "General Maintenance",
        "Turnkey Equipment Installation",
        "Ultra-Modern Machine Shop & Pump Servicing",
      ],
    },
  ];

  // Common mechanical challenges KOD resolves
  const engineeringChallenges = [
    {
      title: "Shaft Misalignment & Coupling Strain",
      challenge:
        "Angular and offset misalignment between drivers and driven equipment generates severe cyclic loading on bearings, elevates operating temperatures, and shears flexible coupling elements.",
      resolution:
        "Dual-beam laser alignment protocols calculate micrometer shim corrections and precisely offset thermal growth expansion.",
      icon: <RotateCw className="w-5 h-5 text-[#8C733E]" />,
    },
    {
      title: "Casing Internal Wear & Flow Loss",
      challenge:
        "Corrosive or abrasive process fluids erode internal casing wear rings and bearing housings, causing significant internal bypass and loss of discharge pressure.",
      resolution:
        "In-house machine shop line-boring, wear-ring fabrication, and precision lathe turning in our Port Harcourt engineering center.",
      icon: <Wrench className="w-5 h-5 text-[#0891B2]" />,
    },
    {
      title: "Rotor Dynamic Unbalance & Vibration",
      challenge:
        "Uneven impeller wear, cavitation pitting, or mechanical damage introduces dynamic unbalance, leading to rapid seal failure and structural fatigue.",
      resolution:
        "Dynamic balancing of rotating impellers, shafts, and rotor assemblies to ISO 1940-1 Grade G2.5 balance tolerances.",
      icon: <Activity className="w-5 h-5 text-[#059669]" />,
    },
    {
      title: "Obsolete or Hard-to-Find Spares",
      challenge:
        "Legacy equipment often suffers extended downtime when original equipment parts become difficult to source through standard commercial channels.",
      resolution:
        "Technical procurement and component re-engineering to supply or fabricate certified, metallurgy-matched replacement parts.",
      icon: <Layers className="w-5 h-5 text-[#0E121A]" />,
    },
  ];

  const fieldPhotos = [
    {
      src: "/images/engineering/field-spdc-fuel-gas-scrubber.webp",
      alt: "Fuel gas scrubber skid with associated pipework — field installation, Rivers State",
      caption: "Gas Scrubber & Conditioning Skid",
      domain: "Upstream Gas Facilities",
    },
    {
      src: "/images/engineering/field-gas-conditioning-skid-hoist.webp",
      alt: "Gas conditioning skid with overhead crane — plant installation",
      caption: "Gas Conditioning Skid Hoist Installation",
      domain: "Midstream Gas Skids",
    },
    {
      src: "/images/engineering/field-flare-knockout-drum.webp",
      alt: "Flare knockout drum vessel with piping connections",
      caption: "Flare Knockout Drum Overhaul",
      domain: "Gas Processing Plants",
    },
    {
      src: "/images/engineering/field-crew-gas-manifold-maintenance.webp",
      alt: "Engineering crew performing gas manifold maintenance at a flowstation",
      caption: "Gas Manifold Maintenance Crew",
      domain: "Flowstation Intervention",
    },
    {
      src: "/images/engineering/field-nov-multiplex-pump-servicing.webp",
      alt: "National Oilwell Varco 3000-S multiplex pump during servicing",
      caption: "NOV Multiplex Plunger Pump",
      domain: "High-Pressure Injection",
    },
    {
      src: "/images/engineering/field-gas-scrubber-instrumentation.webp",
      alt: "Gas scrubber manifold with instrumentation and valves at a flow station",
      caption: "Instrumented Scrubber Manifold",
      domain: "Process Instrumentation",
    },
    {
      src: "/images/engineering/field-associated-gas-compressor-station.webp",
      alt: "Associated gas compressor station building and piping infrastructure",
      caption: "Associated Gas Compressor Station",
      domain: "Gas Compression Station",
    },
    {
      src: "/images/engineering/field-compressor-skid-siemens.webp",
      alt: "Centrifugal compressor skid with drive casing — field site",
      caption: "Centrifugal Compressor Package",
      domain: "Rotating Skids",
    },
    {
      src: "/images/engineering/field-pump-skid-shelter-installation.webp",
      alt: "Pump skid shelter with piping installation — equipment commissioning",
      caption: "Pump Skid Shelter & Commissioning",
      domain: "Industrial Turnkey Setup",
    },
  ];

  return (
    <div className="flex flex-col bg-[#06080D]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Projects & Capabilities", url: "/projects" },
        ]}
      />

      {/* ── HEADER SECTION ── */}
      <section className="relative py-20 sm:py-28 bg-[#0B0E17] border-b border-white/[0.08] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
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
                OPERATIONAL DOMAINS &amp; ENGINEERING SCOPES
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-industrial-white leading-[1.08]">
                Engineering Capabilities &amp; <span className="text-gradient-gold">Field Experience</span>
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum/90 leading-relaxed font-normal mt-1">
                KOD Technical Services provides hands-on engineering servicing across upstream flowstations, downstream processing plants, marine terminals, and industrial utility installations throughout Nigeria.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── TRANSPARENCY NOTICE ── */}
      <section className="py-6 bg-[#06080D] border-b border-white/[0.06]">
        <Container size="default">
          <Reveal direction="up">
            <TechCallout variant="neutral" kicker="CLIENT CONFIDENTIALITY &amp; CASE STUDY NOTICE">
              To respect client non-disclosure agreements and commercial confidentiality, specific operator names, offshore platform identifiers, and contract details are shared only during formal commercial engagement. All field photography presented documents authentic KOD personnel and equipment operations.
            </TechCallout>
          </Reveal>
        </Container>
      </section>

      {/* ── FIELD OPERATIONS PHOTO GALLERY ── */}
      <section className="py-20 sm:py-28 bg-[#06080D] border-b border-white/[0.08]" aria-labelledby="field-gallery-heading">
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                AUTHENTICATED FIELD PHOTOGRAPHY
              </span>
              <h2
                id="field-gallery-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2 leading-tight"
              >
                Equipment &amp; Site Operations Record
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2 leading-relaxed">
                The photographs below document actual KOD Technical Services field deployments across oil and gas facilities in Rivers State and the Niger Delta region.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={60} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fieldPhotos.map((photo) => (
              <div
                key={photo.src}
                className="photo-frame group relative rounded-sm overflow-hidden border border-white/[0.08] hover:border-[#C5A059]/60 transition-all duration-300 bg-[#111622] shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.15)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/90 via-[#06080D]/20 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-industrial-white bg-[#06080D]/90 px-2.5 py-1 rounded-sm backdrop-blur-sm border border-white/10 font-semibold">
                    {photo.caption}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#F4E7BD] bg-[#C5A059]/20 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-[#C5A059]/30">
                    {photo.domain}
                  </span>
                </div>
              </div>
            ))}
          </RevealGroup>

          <p className="mt-8 text-xs text-industrial-silver font-mono">
            * All photographs document actual KOD Technical Services field deployments. Proprietary client tags and facility names are withheld under commercial confidentiality agreements.
          </p>
        </Container>
      </section>

      {/* ── SECTION 1: OPERATIONAL ENVIRONMENTS & MACHINERY TYPES ── */}
      <section
        className="py-20 sm:py-28 bg-[#0B0E17] border-b border-white/[0.08]"
        aria-labelledby="domains-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-14">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                OPERATING DOMAINS
              </span>
              <h2
                id="domains-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2 leading-tight"
              >
                Industrial Sectors &amp; Relevant Machinery
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2 leading-relaxed">
                Representative operating sectors where KOD Technical Services deploys rotating machinery maintenance, precision alignment, and machine shop capabilities.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {operationalDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-8 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col justify-between card-gold-top h-full card-hover-gold"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="font-mono text-xs font-bold text-[#C5A059]">
                      {"// "}{domain.id}
                    </span>
                    <Badge variant="cyan">{domain.environment}</Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    {domain.title}
                  </h3>

                  <p className="text-sm text-industrial-platinum/85 mt-3 leading-relaxed">
                    {domain.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-industrial-silver tracking-wider">
                      Relevant Equipment Types:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-industrial-platinum/90">
                      {domain.machineryTypes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase text-industrial-silver mr-1">
                    Applicable Disciplines:
                  </span>
                  {domain.relevantServices.map((srv, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#06080D] border border-white/[0.06] text-[#F4E7BD]"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 2: CONTRAST BREAKOUT — ARCHITECTURAL WARM IVORY ── */}
      <section
        className="py-20 sm:py-28 bg-[#F7F5EE] text-[#0E121A] relative"
        aria-labelledby="challenges-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-14">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C733E] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#8C733E]" />
                ROOT-CAUSE PROBLEM RESOLUTION
              </span>
              <h2
                id="challenges-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#0E121A] mt-2 leading-tight"
              >
                Mechanical Failure Modes We Rectify
              </h2>
              <p className="text-sm sm:text-base text-[#4A5260] mt-2 leading-relaxed">
                Our technicians and machine shop personnel focus on identifying and correcting the underlying mechanical causes behind equipment failure.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engineeringChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-sm bg-white border border-[#12151B]/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-4 h-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <h3 className="font-display text-lg font-bold text-[#0E121A]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#8C733E]">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-sm text-[#4A5260] leading-relaxed">
                  {item.challenge}
                </p>
                <div className="p-4 rounded-sm bg-[#F7F5EE] border border-[#12151B]/08 text-xs text-[#0E121A] leading-relaxed mt-auto font-mono">
                  <strong className="text-[#8C733E] uppercase block mb-1">
                    Technical Resolution Protocol:
                  </strong>
                  {item.resolution}
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 3: INQUIRY & TURNAROUND COLLABORATION ── */}
      <section className="py-20 sm:py-28 bg-[#06080D]" aria-labelledby="discuss-project-heading">
        <Container size="default">
          <Reveal direction="up">
            <div className="relative p-8 sm:p-14 rounded-sm bg-gradient-to-r from-[#0B0E17] via-[#111622] to-[#0B0E17] border border-[#C5A059]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(197,160,89,0.18)]">
              <span className="hud-bracket-tl" aria-hidden="true" />
              <span className="hud-bracket-tr" aria-hidden="true" />
              <span className="hud-bracket-bl" aria-hidden="true" />
              <span className="hud-bracket-br" aria-hidden="true" />

              <div className="flex flex-col gap-3.5 max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  TURNAROUND &amp; MAINTENANCE COLLABORATION
                </span>
                <h2
                  id="discuss-project-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-industrial-white leading-tight"
                >
                  Discuss an Upcoming Maintenance Window or Breakdown
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum/90 leading-relaxed">
                  Whether planning a major facility turnaround overhaul, requiring casing line-boring, or responding to high machinery vibration, our Port Harcourt engineering team is ready to assist.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-industrial-silver pt-2">
                  <span>Facility: <strong className="text-white">{COMPANY_INFO.headquarters}</strong></span>
                  <span>&bull;</span>
                  <span>Phone: <strong className="text-white">{COMPANY_INFO.primaryPhone}</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Contact Engineering Desk
                  </Button>
                </Link>
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-[#06080D] border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase tracking-wider hover:border-[#C5A059] hover:text-[#F4E7BD] transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <Phone className="w-4 h-4 text-telemetry-green" aria-hidden="true" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
