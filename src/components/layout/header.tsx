"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY_INFO, NAVIGATION_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#06080D]/95 backdrop-blur-xl">
      {/* Precision Top Datum Line */}
      <div className="gold-hairline opacity-70" aria-hidden="true" />

      {/* Top Engineering Micro-Utility Bar */}
      <div className="hidden lg:block border-b border-white/[0.05] bg-[#0B0E17]/60 py-1.5 text-[11px] font-mono">
        <Container size="default">
          <div className="flex items-center justify-between text-industrial-silver">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-telemetry-green font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-telemetry-green animate-pulse" />
                PORT HARCOURT WORKSHOP &amp; FIELD OPERATIONS ACTIVE
              </span>
              <span className="text-white/20">•</span>
              <span className="text-industrial-silver/80">API 610 &bull; ISO 10816 PRECISION ALIGNMENT</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-industrial-silver/90">HOURS: MON–FRI 08:00–17:00 (24/7 CALLOUT)</span>
              <span className="text-white/20">•</span>
              <a
                href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                className="text-[#C5A059] hover:text-[#F4E7BD] font-bold transition-colors"
              >
                HOTLINE: {COMPANY_INFO.primaryPhone}
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container size="default">
        <div className="flex h-18 sm:h-20 items-center justify-between gap-4">
          {/* Brand Logo & Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm p-1 -m-1"
            aria-label="KOD Technical Services Home"
          >
            {/* Official KOD Globe Logo */}
            <div className="w-10 h-10 relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/brand/kod-logo-icon.png"
                alt="KOD Technical Services logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(197,160,89,0.25)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-industrial-white leading-none">
                KOD <span className="text-gradient-gold">TECHNICAL</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-industrial-silver uppercase mt-1">
                Rotating Equipment &bull; Port Harcourt
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {NAVIGATION_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide rounded-sm transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]",
                    isActive
                      ? "text-[#F4E7BD] bg-[#C5A059]/10 font-semibold shadow-[inset_0_-2px_0_0_#C5A059]"
                      : "text-industrial-platinum hover:text-[#F4E7BD] hover:bg-white/[0.04]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Direct Hotline & Quote CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#F4E7BD] font-mono text-xs font-semibold hover:bg-[#C5A059]/20 hover:border-[#C5A059]/60 transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              title="Direct Engineering Hotline"
            >
              <span className="w-2 h-2 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
              <Phone className="w-3.5 h-3.5 text-[#C5A059] transition-transform group-hover:scale-110" aria-hidden="true" />
              <span>{COMPANY_INFO.primaryPhone}</span>
            </a>

            <Link href="/contact" tabIndex={-1}>
              <Button size="sm" variant="primary" icon={<ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}>
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
              className="p-2.5 rounded-sm border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label={`Call emergency hotline: ${COMPANY_INFO.primaryPhone}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-sm text-industrial-platinum hover:text-industrial-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C5A059]" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden py-4 border-t border-white/10 flex flex-col gap-2 animate-slide-down bg-[#06080D]/98 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {NAVIGATION_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-sm transition-all duration-150 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]",
                    isActive
                      ? "text-[#F4E7BD] bg-[#C5A059]/15 font-semibold border-l-2 border-[#C5A059] pl-3.5"
                      : "text-industrial-platinum hover:text-industrial-white hover:bg-white/5"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 px-2 flex flex-col gap-2 border-t border-white/[0.08] mt-2">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center" variant="primary">
                  Request Technical Quote
                </Button>
              </Link>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-telemetry-green border border-telemetry-green/30 bg-telemetry-green/5 hover:bg-telemetry-green/10 rounded-sm transition-colors active:translate-y-[1px]"
              >
                Direct WhatsApp Dispatch
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
