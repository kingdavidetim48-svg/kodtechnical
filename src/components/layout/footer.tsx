import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, ENGINEERING_SERVICES } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#06080D] text-industrial-silver relative">
      {/* Precision Metallic Gold Top Divider */}
      <div className="gold-hairline opacity-70" aria-hidden="true" />

      {/* Top Banner: Emergency Industrial Callout */}
      <div className="border-b border-white/[0.06] bg-[#0B0E17]/80 py-6">
        <Container size="default">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <span className="flex h-3 w-3 relative" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-green opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-telemetry-green" />
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#C5A059] font-bold block">
                  Critical Machinery Failure or Unscheduled Downtime?
                </span>
                <span className="text-sm text-industrial-white font-medium">
                  24/7 emergency technical intervention available across Port Harcourt &amp; the Niger Delta basin.
                </span>
              </div>
            </div>
            <a
              href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-gradient-to-r from-[#C5A059] to-[#B28D46] text-[#06080D] font-bold text-xs uppercase tracking-wider hover:brightness-105 hover:shadow-gold-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] shrink-0"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Emergency Hotline: {COMPANY_INFO.primaryPhone}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Footer Columns */}
      <div className="py-14 sm:py-20">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1: Company Profile */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm w-fit">
                <div className="w-8 h-8 relative flex-shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src="/images/brand/kod-logo-icon.png"
                    alt="KOD Technical Services"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain drop-shadow-[0_2px_6px_rgba(197,160,89,0.25)]"
                  />
                </div>
                <span className="font-display text-lg font-extrabold text-industrial-white tracking-tight">
                  KOD <span className="text-gradient-gold">TECHNICAL</span>
                </span>
              </Link>
              <p className="text-sm text-industrial-platinum leading-relaxed">
                Indigenous Nigerian engineering service provider specializing in precision laser alignment, rotating machinery overhauls, dynamic balancing, and certified machine shop machining.
              </p>
              <div className="flex flex-col gap-1.5 text-xs font-mono text-industrial-silver/90 pt-2 border-t border-white/[0.05]">
                <span><strong className="text-[#C5A059]">C.O.R.E:</strong> Integrity &bull; Commitment &bull; Excellence</span>
                <span><strong className="text-[#C5A059]">HQ:</strong> Port Harcourt, Rivers State, Nigeria</span>
              </div>
            </div>

            {/* Column 2: Key Engineering Disciplines */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none" />
                Rotating Machinery
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {ENGINEERING_SERVICES.slice(3, 7).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-industrial-platinum hover:text-[#F4E7BD] flex items-center justify-between group transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm py-0.5"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{service.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C5A059]" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="text-[#C5A059] font-mono text-xs uppercase tracking-wider hover:text-[#F4E7BD] pt-1 inline-flex items-center gap-1 group"
                  >
                    <span>View All 11 Capabilities</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Maintenance & Supply */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none" />
                Machining &amp; Supply
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {[ENGINEERING_SERVICES[0], ENGINEERING_SERVICES[1], ENGINEERING_SERVICES[2], ENGINEERING_SERVICES[10]].map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-industrial-platinum hover:text-[#F4E7BD] flex items-center justify-between group transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm py-0.5"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{service.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C5A059]" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Verified Contact Coordinates */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none" />
                Facility Coordinates
              </h3>
              <div className="flex flex-col gap-3.5 text-sm">
                <div className="flex items-start gap-2.5 text-industrial-platinum">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-xs leading-relaxed">{COMPANY_INFO.headquarters}</span>
                </div>
                <div className="flex items-center gap-2.5 text-industrial-platinum">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <a href={`tel:${COMPANY_INFO.primaryPhoneRaw}`} className="text-xs hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm font-mono">
                    {COMPANY_INFO.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-industrial-platinum">
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-xs hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm font-mono">
                    {COMPANY_INFO.primaryEmail}
                  </a>
                </div>
                <div className="flex items-start gap-2.5 text-industrial-silver text-xs pt-1">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[11px] leading-relaxed font-mono">{COMPANY_INFO.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/[0.06] py-6 bg-[#040508] text-xs font-mono">
        <Container size="default">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-industrial-silver/80">
              &copy; {currentYear} {COMPANY_INFO.name}. All Rights Reserved. Port Harcourt, Rivers State.
            </div>
            <div className="flex items-center gap-6 text-industrial-silver">
              <Link href="/privacy" className="hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-[#F4E7BD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm">
                Procurement &amp; RFQ Desk
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
