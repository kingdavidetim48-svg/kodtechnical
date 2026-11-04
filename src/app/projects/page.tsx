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
        "Optical and laser alignment protocols calculate accurate shim corrections and account for thermal growth offsets.",
    },
    {
      title: "Casing Internal Wear & Flow Loss",
      challenge:
        "Corrosive or abrasive process fluids erode internal casing wear rings and bearing housings, causing significant internal recirculation and loss of discharge pressure.",
      resolution:
        "In-house machine shop line-boring, wear-ring fabrication, and precision lathe turning in our Port Harcourt engineering center.",
    },
    {
      title: "Rotor Unbalance & High Vibration",
      challenge:
        "Uneven impeller wear, cavitation pitting, or mechanical damage introduces dynamic unbalance, leading to rapid seal degradation and structural fatigue.",
      resolution:
        "Dynamic balancing of rotating impellers, shafts, and rotor assemblies to reduce residual unbalance to acceptable operational levels.",
    },
    {
      title: "Obsolete or Hard-to-Find Spares",
      challenge:
        "Legacy equipment often suffers extended downtime when original equipment parts become difficult to source through standard commercial channels.",
      resolution:
        "Technical procurement and component re-engineering to supply or fabricate compatible, durable replacement parts.",
    },
  ];

  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Projects & Capabilities", url: "/projects" },
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
                OPERATIONAL DOMAINS &amp; ENGINEERING SCOPES
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-industrial-white leading-tight">
                Engineering Capabilities &amp; Industry Experience
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum leading-relaxed">
                KOD Technical Services provides hands-on engineering servicing across upstream flowstations, downstream processing plants, marine terminals, and industrial utility installations throughout Nigeria.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── TRANSPARENCY NOTICE ── */}
      <section className="py-6 bg-navy-void border-b border-white/5">
        <Container size="default">
          <Reveal direction="up">
            <TechCallout variant="neutral" kicker="CLIENT CONFIDENTIALITY & CASE STUDY NOTICE">
              To respect client non-disclosure agreements and commercial confidentiality, specific operator names, offshore platform identifiers, and contract details are shared only during formal commercial engagement. Detailed, verified project case studies and on-site photography will be published following official client authorization.
            </TechCallout>
          </Reveal>
        </Container>
      </section>

      {/* ── FIELD OPERATIONS PHOTO GALLERY ── */}
      <section className="py-14 sm:py-20 bg-navy-void border-b border-white/10" aria-labelledby="field-gallery-heading">
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                AUTHENTICATED FIELD PHOTOGRAPHY
              </span>
              <h2
                id="field-gallery-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2"
              >
                Equipment &amp; Site Operations
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2">
                The photographs below are sourced from actual KOD Technical Services field deployments across oil and gas facilities in Rivers State and the Niger Delta region. Client and facility identities are withheld in accordance with commercial confidentiality obligations.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={60} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                src: "/images/engineering/field-spdc-fuel-gas-scrubber.webp",
                alt: "Fuel gas scrubber skid with associated pipework — field installation, Rivers State",
                caption: "Gas Scrubber & Conditioning Skid",
              },
              {
                src: "/images/engineering/field-gas-conditioning-skid-hoist.webp",
                alt: "Gas conditioning skid with overhead crane — plant installation",
                caption: "Gas Conditioning Skid Installation",
              },
              {
                src: "/images/engineering/field-flare-knockout-drum.webp",
                alt: "Flare knockout drum vessel with piping connections",
                caption: "Flare Knockout Drum",
              },
              {
                src: "/images/engineering/field-crew-gas-manifold-maintenance.webp",
                alt: "Engineering crew performing gas manifold maintenance at a flowstation",
                caption: "Gas Manifold Maintenance — Field Crew",
              },
              {
                src: "/images/engineering/field-nov-multiplex-pump-servicing.webp",
                alt: "National Oilwell Varco 3000-S multiplex pump during servicing",
                caption: "NOV Multiplex Pump Servicing",
              },
              {
                src: "/images/engineering/field-gas-scrubber-instrumentation.webp",
                alt: "Gas scrubber manifold with instrumentation and valves at a flow station",
                caption: "Instrumented Gas Scrubber Manifold",
              },
              {
                src: "/images/engineering/field-associated-gas-compressor-station.webp",
                alt: "Associated gas compressor station building and piping infrastructure",
                caption: "Associated Gas Compressor Station",
              },
              {
                src: "/images/engineering/field-compressor-skid-siemens.webp",
                alt: "Centrifugal compressor skid with drive casing — field site",
                caption: "Centrifugal Compressor Skid",
              },
              {
                src: "/images/engineering/field-pump-skid-shelter-installation.webp",
                alt: "Pump skid shelter with piping installation — equipment commissioning",
                caption: "Pump Skid Shelter & Commissioning",
              },
            ].map((photo) => (
              <div
                key={photo.src}
                className="photo-frame group relative rounded-sm overflow-hidden border border-white/10 hover:border-amber-primary/50 transition-colors bg-navy-surface"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-void/90 via-navy-void/25 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-mono text-xs text-industrial-white bg-navy-void/80 px-2.5 py-1 rounded-sm backdrop-blur-sm border border-white/10 inline-block font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </RevealGroup>

          <p className="mt-6 text-xs text-industrial-silver font-mono">
            * Photographs document actual KOD Technical Services field deployments. Equipment identifiers and client facility names are not disclosed without authorization.
          </p>
        </Container>
      </section>

      {/* ── SECTION 1: OPERATIONAL ENVIRONMENTS & MACHINERY TYPES ── */}
      <section
        className="py-16 sm:py-24 bg-navy-void border-b border-white/10"
        aria-labelledby="domains-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                INDUSTRIAL ENVIRONMENTS
              </span>
              <h2
                id="domains-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2"
              >
                Operating Sectors &amp; Relevant Machinery
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2">
                Representative operating sectors where KOD Technical Services deploys its rotating equipment maintenance, precision alignment, and machine shop capabilities.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {operationalDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-7 rounded-sm bg-navy-surface border border-white/8 flex flex-col justify-between card-amber-top h-full card-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-amber-primary">
                      [// {domain.id}]
                    </span>
                    <Badge variant="cyan">{domain.environment}</Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white">
                    {domain.title}
                  </h3>

                  <p className="text-sm text-industrial-platinum mt-3 leading-relaxed">
                    {domain.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-col gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-industrial-silver">
                      Relevant Equipment Types:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono text-industrial-platinum">
                      {domain.machineryTypes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-primary shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase text-industrial-silver mr-1">
                    Applicable Disciplines:
                  </span>
                  {domain.relevantServices.map((srv, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-navy-base border border-white/5 text-amber-primary"
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

      {/* ── SECTION 2: COMMON MECHANICAL CHALLENGES & RESOLUTION ── */}
      <section
        className="py-16 sm:py-24 bg-navy-base border-b border-white/10"
        aria-labelledby="challenges-heading"
      >
        <Container size="default">
          <Reveal direction="up">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                ENGINEERING PROBLEM RESOLUTION
              </span>
              <h2
                id="challenges-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-industrial-white mt-2"
              >
                Mechanical Challenges We Address
              </h2>
              <p className="text-sm sm:text-base text-industrial-silver mt-2">
                Our technicians and machine shop personnel focus on identifying and correcting the root mechanical causes behind equipment failure.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engineeringChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-sm bg-navy-surface border border-white/8 flex flex-col gap-4 card-hover card-amber-top h-full"
              >
                <div className="flex items-center gap-2 text-amber-primary font-mono text-xs font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-primary" aria-hidden="true" />
                  <span>CHALLENGE 0{idx + 1}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-industrial-white">
                  {item.title}
                </h3>
                <p className="text-sm text-industrial-platinum leading-relaxed">
                  {item.challenge}
                </p>
                <div className="p-3.5 rounded-sm bg-navy-base border border-white/5 text-xs text-industrial-platinum leading-relaxed mt-auto">
                  <strong className="text-amber-primary font-mono uppercase block mb-1">
                    Technical Resolution:
                  </strong>
                  {item.resolution}
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── SECTION 3: INQUIRY & UPCOMING WORK SCOPES ── */}
      <section className="py-16 sm:py-20 bg-navy-void" aria-labelledby="discuss-project-heading">
        <Container size="default">
          <Reveal direction="up">
            <div className="relative p-8 sm:p-12 rounded-sm bg-navy-base border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-industrial-lg">
              <span className="hud-bracket-tl" aria-hidden="true" />
              <span className="hud-bracket-tr" aria-hidden="true" />
              <span className="hud-bracket-bl" aria-hidden="true" />
              <span className="hud-bracket-br" aria-hidden="true" />

              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  TURNAROUND &amp; MAINTENANCE COLLABORATION
                </span>
                <h2
                  id="discuss-project-heading"
                  className="font-display text-2xl sm:text-3xl font-extrabold text-industrial-white leading-tight"
                >
                  Discuss an Upcoming Maintenance Window or Equipment Challenge
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed">
                  Whether planning a planned facility turnaround, requiring machine shop casing re-machining, or responding to high machinery vibration, our Port Harcourt team can review your specifications and schedule.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-industrial-silver pt-2">
                  <span>Facility: {COMPANY_INFO.headquarters}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Contact Engineering Desk
                  </Button>
                </Link>
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-navy-surface border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-navy-elevated transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
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
