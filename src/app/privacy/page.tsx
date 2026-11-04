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
    <div className="py-16 sm:py-24 bg-navy-void text-industrial-platinum">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />
      <Container size="prose">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-industrial-silver hover:text-amber-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary block mb-2">
          LEGAL &amp; COMPLIANCE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-industrial-white mb-6">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-industrial-platinum">
          <p>
            At {COMPANY_INFO.name}, we treat proprietary client engineering information, equipment datasheets, facility locations, and procurement inquiries with strict confidentiality.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4">
            1. Information Collection &amp; Use
          </h2>
          <p>
            We only collect operational and technical contact information voluntarily submitted by asset owners, plant managers, and procurement personnel for the express purpose of technical evaluation, RFQ generation, and servicing contract execution.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4">
            2. Proprietary Engineering Data
          </h2>
          <p>
            Equipment specifications, failure reports, vibration telemetry, and machine shop schematics shared with KOD Technical Services are protected under standard non-disclosure practices and are never shared with unauthorized third parties.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4">
            3. Direct Inquiries
          </h2>
          <p>
            For questions regarding confidentiality or to request formal non-disclosure agreements (NDAs) prior to equipment audits, contact us at <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-amber-primary hover:underline">{COMPANY_INFO.primaryEmail}</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
