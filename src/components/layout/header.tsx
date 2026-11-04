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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy-void/90 backdrop-blur-md">
      <Container size="default">
        <div className="flex h-18 sm:h-20 items-center justify-between gap-4">
          {/* Brand Logo & Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm p-1 -m-1"
            aria-label="KOD Technical Services Home"
          >
            {/* Official KOD Globe Logo */}
            <div className="w-10 h-10 relative flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/images/brand/kod-logo-icon.png"
                alt="KOD Technical Services logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-industrial-white leading-none">
                KOD <span className="text-amber-primary">TECHNICAL</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-industrial-silver uppercase mt-1">
                Port Harcourt • Rivers State
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
                    "relative px-3.5 py-2 text-sm font-medium rounded-sm transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary",
                    isActive
                      ? "text-amber-primary bg-amber-primary/10 font-semibold shadow-[inset_0_-2px_0_0_#F59E0B]"
                      : "text-industrial-platinum hover:text-industrial-white hover:bg-white/5"
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
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-telemetry-green/30 bg-telemetry-green/10 text-telemetry-green font-mono text-xs font-semibold hover:bg-telemetry-green/20 hover:border-telemetry-green/50 transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
              title="Direct Engineering Hotline"
            >
              <span className="w-2 h-2 rounded-full bg-telemetry-green animate-pulse" aria-hidden="true" />
              <Phone className="w-3.5 h-3.5 transition-transform group-hover:scale-110" aria-hidden="true" />
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
              className="p-2.5 rounded-sm border border-telemetry-green/40 bg-telemetry-green/10 text-telemetry-green hover:bg-telemetry-green/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
              aria-label={`Call emergency hotline: ${COMPANY_INFO.primaryPhone}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-sm text-industrial-platinum hover:text-industrial-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden py-4 border-t border-white/10 flex flex-col gap-2 animate-slide-down bg-navy-void/98 backdrop-blur-xl"
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
                    "px-4 py-3 text-base font-medium rounded-sm transition-all duration-150 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary",
                    isActive
                      ? "text-amber-primary bg-amber-primary/10 font-semibold border-l-2 border-amber-primary pl-3.5"
                      : "text-industrial-platinum hover:text-industrial-white hover:bg-white/5"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 px-2 flex flex-col gap-2">
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
