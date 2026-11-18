import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Data Protection & Client Confidentiality",
  description: "Privacy policy, technical inquiry handling, and data protection standards for KOD Technical Services clients and partners.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — KOD Technical Services",
    description: "Privacy policy, technical inquiry handling, and client data standards for KOD Technical Services.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-20 sm:py-28 bg-[#06080D] text-industrial-platinum min-h-screen relative">
      <div className="absolute top-0 inset-x-0 gold-hairline opacity-60" aria-hidden="true" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />
      <Container size="prose">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-industrial-silver hover:text-[#C5A059] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] block mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#C5A059]" />
          LEGAL &amp; COMPLIANCE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-industrial-white mb-8 tracking-tight">
          Privacy Policy &amp; <span className="text-gradient-gold">Client Confidentiality</span>
        </h1>
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-industrial-platinum/90 p-8 sm:p-10 rounded-sm bg-[#111622] border border-white/[0.08] shadow-[0_20px_45px_rgba(0,0,0,0.7)]">
          <p>
            At {COMPANY_INFO.name}, we treat proprietary client engineering information, equipment datasheets, facility locations, and procurement inquiries with strict confidentiality.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4 border-b border-white/[0.06] pb-2">
            1. Information Collection &amp; Use
          </h2>
          <p>
            We only collect operational and technical contact information voluntarily submitted by asset owners, plant managers, and procurement personnel for the express purpose of technical evaluation, RFQ generation, and servicing contract execution.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4 border-b border-white/[0.06] pb-2">
            2. Proprietary Engineering Data
          </h2>
          <p>
            Equipment specifications, failure reports, vibration telemetry, and machine shop schematics shared with KOD Technical Services are protected under standard non-disclosure practices and are never shared with unauthorized third parties.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4 border-b border-white/[0.06] pb-2">
            3. Direct Inquiries
          </h2>
          <p>
            For questions regarding confidentiality or to request formal non-disclosure agreements (NDAs) prior to equipment audits, contact our Port Harcourt legal desk at <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-[#F4E7BD] underline hover:text-[#C5A059] transition-colors">{COMPANY_INFO.primaryEmail}</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
