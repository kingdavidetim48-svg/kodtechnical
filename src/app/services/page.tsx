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
    "Rotating Machinery": <Cog className="w-4 h-4 text-cyan-telemetry" aria-hidden="true" />,
    "Precision Maintenance": <Wrench className="w-4 h-4 text-amber-primary" aria-hidden="true" />,
    "Industrial Supply": <Boxes className="w-4 h-4 text-industrial-silver" aria-hidden="true" />,
  };

  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Engineering Services", url: "/services" },
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
                TECHNICAL CAPABILITIES • PORT HARCOURT
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-industrial-white leading-tight">
                11 Core Engineering &amp; Industrial Service Disciplines
              </h1>
              <p className="text-base sm:text-lg text-industrial-platinum leading-relaxed">
                KOD Technical Services delivers specialized mechanical and rotating equipment services designed to maintain plant uptime and operational safety across Nigeria&apos;s oil and gas, marine, and process manufacturing industries.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SERVICES DIRECTORY GRID ── */}
      <section className="py-16 sm:py-24 bg-navy-void" aria-labelledby="services-catalog-heading">
        <Container size="default">
          {/* Section Introduction */}
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 id="services-catalog-heading" className="font-display text-2xl sm:text-3xl font-bold text-industrial-white">
                  Comprehensive Service Directory
                </h2>
                <p className="text-sm text-industrial-silver mt-1">
                  Each service is backed by our experienced engineering personnel and Port Harcourt workshop facilities. Click on any discipline to inspect technical scope, covered equipment, and inquiry guidance.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono shrink-0">
                <span className="px-3 py-1.5 rounded-sm border border-cyan-telemetry/40 bg-cyan-telemetry/10 text-cyan-telemetry font-bold">
                  Rotating Machinery (5)
                </span>
                <span className="px-3 py-1.5 rounded-sm border border-amber-primary/40 bg-amber-primary/10 text-amber-primary font-bold">
                  Precision Maintenance (3)
                </span>
                <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-navy-surface text-industrial-silver font-bold">
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
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-navy-surface border border-white/8 hover:border-amber-primary/50 transition-all duration-280 hover:-translate-y-1 hover:shadow-industrial-lg card-amber-top h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-amber-primary">
                      [// {service.id}]
                    </span>
                    <div className="flex items-center gap-1.5">
                      {categoryIcons[service.category]}
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
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </RevealGroup>

          {/* ── HOW TO ENGAGE KOD TECHNICAL ── */}
          <Reveal direction="up" delay={100}>
            <div className="relative mt-16 p-8 rounded-sm bg-navy-base border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-industrial-lg">
              <span className="hud-bracket-tl" aria-hidden="true" />
              <span className="hud-bracket-tr" aria-hidden="true" />
              <span className="hud-bracket-bl" aria-hidden="true" />
              <span className="hud-bracket-br" aria-hidden="true" />

              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  TECHNICAL INQUIRIES &amp; WORK SCOPES
                </span>
                <h3 className="font-display text-2xl font-bold text-industrial-white">
                  Need to discuss a specific rotating machinery challenge?
                </h3>
                <p className="text-sm text-industrial-silver leading-relaxed">
                  Our Port Harcourt engineers review equipment specifications, operating symptoms, and turnaround schedules to determine the appropriate service approach.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-navy-surface border border-white/15 text-industrial-white font-mono text-xs font-bold uppercase hover:bg-navy-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-primary" aria-hidden="true" />
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
