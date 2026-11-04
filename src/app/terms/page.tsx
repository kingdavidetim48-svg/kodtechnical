import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Industrial Engineering & Procurement Terms",
  description: "Terms of service, engineering engagement standards, and operational guidelines for KOD Technical Services clients.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — KOD Technical Services",
    description: "Terms of service and engineering engagement provisions for KOD Technical Services.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-navy-void text-industrial-platinum">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
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
          Terms of Service
        </h1>
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-industrial-platinum">
          <p>
            Welcome to {COMPANY_INFO.name}. By accessing our technical website, engineering service catalog, and communication channels, you agree to the following terms and conditions.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4">
            1. Engineering Scope &amp; Quotations
          </h2>
          <p>
            Technical descriptions, capabilities, and standards referenced on this website represent general service capabilities. Formal contractual scopes, pricing, tolerances, and turnaround schedules are governed exclusively by formal, written quotations issued by authorized KOD Technical Services representatives.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4">
            2. Intellectual Property
          </h2>
          <p>
            All brand elements, engineering diagrams, technical copy, and visual identity tokens are the intellectual property of {COMPANY_INFO.name}.
          </p>
          <h2 className="font-display text-xl font-bold text-industrial-white mt-4">
            3. Contact &amp; Inquiries
          </h2>
          <p>
            For questions regarding service terms or commercial contracting, reach our Port Harcourt office at <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-amber-primary hover:underline">{COMPANY_INFO.primaryEmail}</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
