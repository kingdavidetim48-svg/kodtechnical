import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, ENGINEERING_SERVICES } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-navy-void text-industrial-silver">
      {/* Top Banner: Emergency Industrial Callout */}
      <div className="border-b border-white/5 bg-navy-base/60 py-6">
        <Container size="default">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-green opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-telemetry-green" />
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-amber-primary font-bold block">
                  Critical Equipment Downtime?
                </span>
                <span className="text-sm text-industrial-white font-medium">
                  Emergency technical callout available across Rivers State &amp; Niger Delta
                </span>
              </div>
            </div>
            <a
              href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-amber-primary text-navy-void font-bold text-xs uppercase tracking-wider hover:bg-amber-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Call Hotline: {COMPANY_INFO.primaryPhone}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Footer Columns */}
      <div className="py-14 sm:py-18">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1: Company Profile */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm w-fit">
                <div className="w-8 h-8 relative flex-shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src="/images/brand/kod-logo-icon.png"
                    alt="KOD Technical Services"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="font-display text-lg font-bold text-industrial-white tracking-tight">
                  KOD <span className="text-amber-primary">TECHNICAL</span>
                </span>
              </Link>
              <p className="text-sm text-industrial-platinum leading-relaxed">
                Indigenous Nigerian engineering service provider specializing in the installation, precision alignment, overhaul, and dynamic balancing of heavy rotating equipment.
              </p>
              <div className="flex flex-col gap-1 text-xs font-mono text-industrial-silver pt-2">
                <span>C.O.R.E: Integrity • Commitment • Excellence</span>
                <span>HQ: Port Harcourt, Rivers State, Nigeria</span>
              </div>
            </div>

            {/* Column 2: Key Engineering Disciplines */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-primary">
                Rotating Machinery
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {ENGINEERING_SERVICES.slice(3, 7).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-industrial-platinum hover:text-amber-primary flex items-center justify-between group transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm py-0.5"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{service.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-amber-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="text-amber-primary font-mono text-xs uppercase tracking-wider hover:underline pt-1 inline-block"
                  >
                    View All 11 Capabilities →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Maintenance & Supply */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-primary">
                Precision & Supply
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {[ENGINEERING_SERVICES[0], ENGINEERING_SERVICES[1], ENGINEERING_SERVICES[2], ENGINEERING_SERVICES[10]].map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-industrial-platinum hover:text-amber-primary flex items-center justify-between group transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm py-0.5"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{service.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-amber-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Verified Contact Coordinates */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-primary">
                Facility Coordinates
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-2.5 text-industrial-platinum">
                  <MapPin className="w-4 h-4 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{COMPANY_INFO.headquarters}</span>
                </div>
                <div className="flex items-center gap-2.5 text-industrial-platinum">
                  <Phone className="w-4 h-4 text-amber-primary shrink-0" aria-hidden="true" />
                  <a href={`tel:${COMPANY_INFO.primaryPhoneRaw}`} className="hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm">
                    {COMPANY_INFO.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-industrial-platinum">
                  <Mail className="w-4 h-4 text-amber-primary shrink-0" aria-hidden="true" />
                  <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="hover:text-amber-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm">
                    {COMPANY_INFO.primaryEmail}
                  </a>
                </div>
                <div className="flex items-start gap-2.5 text-industrial-silver text-xs pt-1">
                  <Clock className="w-4 h-4 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{COMPANY_INFO.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/5 py-6 bg-navy-void text-xs font-mono">
        <Container size="default">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              © {currentYear} {COMPANY_INFO.name}. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6 text-industrial-silver">
              <Link href="/privacy" className="hover:text-industrial-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-industrial-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-industrial-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm">
                Procurement Inquiries
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
