import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { RevealGroup } from "@/components/ui/reveal-group";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ENGINEERING_SERVICES, COMPANY_INFO } from "@/lib/constants";
import {
  ArrowRight,
  Phone,
  Wrench,
  Cog,
  Boxes,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Services Directory — 11 Core Disciplines",
  description:
    "Explore the 11 verified engineering services offered by KOD Technical Services, including rotating equipment overhaul, laser alignment, machine shop servicing, and technical procurement in Port Harcourt, Nigeria.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Engineering Services Directory — KOD Technical Services",
    description:
      "Comprehensive catalog of 11 core industrial engineering services: rotating equipment overhauls, laser shaft alignment, machine shop machining, and procurement in Nigeria.",
    url: "/services",
  },
};

export default function ServicesPage() {
  const categoryIcons = {
    "Rotating Machinery": <Cog className="w-4 h-4 text-telemetry-cyan" aria-hidden="true" />,
    "Precision Maintenance": <Wrench className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />,
    "Industrial Supply": <Boxes className="w-4 h-4 text-industrial-silver" aria-hidden="true" />,
  };

  return (
    <div className="flex flex-col bg-[#06080D]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Engineering Services", url: "/services" },
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
                TECHNICAL CAPABILITIES &bull; PORT HARCOURT
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-industrial-white leading-[1.08]">
                11 Core Engineering &amp; <span className="text-gradient-gold">Industrial Disciplines</span>
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum/90 leading-relaxed font-normal mt-1">
                KOD Technical Services delivers specialized mechanical and rotating machinery engineering designed to safeguard plant uptime and operational safety across Nigeria&apos;s oil, gas, and process industries.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SERVICES DIRECTORY GRID ── */}
      <section className="py-20 sm:py-28 bg-[#06080D]" aria-labelledby="services-catalog-heading">
        <Container size="default">
          {/* Section Introduction */}
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <h2 id="services-catalog-heading" className="font-display text-2xl sm:text-3xl font-bold text-industrial-white">
                  Comprehensive Service Directory
                </h2>
                <p className="text-sm text-industrial-silver mt-1.5 max-w-2xl">
                  Each service is backed by experienced mechanical engineers and our Port Harcourt machine shop. Click any discipline to review technical scope, covered machinery, and inquiry guidelines.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono shrink-0">
                <span className="px-3 py-1.5 rounded-sm border border-telemetry-cyan/40 bg-telemetry-cyan/10 text-telemetry-cyan font-bold">
                  Rotating Machinery (5)
                </span>
                <span className="px-3 py-1.5 rounded-sm border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] font-bold">
                  Precision Maintenance (3)
                </span>
                <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-[#111622] text-industrial-silver font-bold">
                  Industrial Supply (3)
                </span>
              </div>
            </div>
          </Reveal>

          {/* 11 Services Grid with Staggered Entrance */}
          <RevealGroup staggerMs={65} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGINEERING_SERVICES.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-sm bg-[#111622] border border-white/[0.08] hover:border-[#C5A059]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.18)] card-gold-top h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-[#C5A059] tracking-wider">
                      {"//"} {service.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {categoryIcons[service.category]}
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
                  </div>

                  <h3 className="font-display text-xl font-bold text-industrial-white group-hover:text-[#F4E7BD] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-industrial-platinum/80 mt-3 leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/[0.06]">
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

                <div className="pt-6 mt-4 border-t border-white/[0.06]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] group-hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </RevealGroup>

          {/* ── HOW TO ENGAGE KOD TECHNICAL ── */}
          <Reveal direction="up" delay={100}>
            <div className="relative mt-16 p-8 sm:p-12 rounded-sm bg-[#0B0E17] border border-[#C5A059]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <span className="hud-bracket-tl" aria-hidden="true" />
              <span className="hud-bracket-tr" aria-hidden="true" />
              <span className="hud-bracket-bl" aria-hidden="true" />
              <span className="hud-bracket-br" aria-hidden="true" />

              <div className="flex flex-col gap-2.5 max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  TECHNICAL INQUIRIES &amp; WORK SCOPES
                </span>
                <h3 className="font-display text-2xl font-bold text-industrial-white">
                  Need to discuss a specific rotating machinery challenge?
                </h3>
                <p className="text-sm text-industrial-platinum/80 leading-relaxed">
                  Our Port Harcourt engineers review equipment datasheets, operating symptoms, and turnaround schedules to determine the appropriate service approach.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#111622] border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase hover:border-[#C5A059] hover:text-[#F4E7BD] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <Phone className="w-3.5 h-3.5 text-telemetry-green" aria-hidden="true" />
                  <span>Call {COMPANY_INFO.primaryPhone}</span>
                </a>
                <Link href="/contact">
                  <Button variant="primary">
                    Inquire Engineering Desk
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
