import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechCallout } from "@/components/ui/tech-callout";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { ENGINEERING_SERVICES, COMPANY_INFO } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Wrench,
  HelpCircle,
  Cog,
  Boxes,
  FileText,
  Clock,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ENGINEERING_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = ENGINEERING_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const title = `${service.title} — Industrial Engineering & Scope`;
  const description = service.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} — KOD Technical Services`,
      description,
      url: `/services/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — KOD Technical Services`,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = ENGINEERING_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Related services in the same category, or next services
  const relatedServices = ENGINEERING_SERVICES.filter(
    (s) => s.slug !== service.slug
  ).slice(0, 3);

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
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
      />
      <ServiceJsonLd
        title={service.title}
        description={service.summary}
        slug={service.slug}
        category={service.category}
      />
      {/* ── BREADCRUMB & HEADER SECTION ── */}
      <section className="relative py-12 sm:py-20 bg-navy-base/80 border-b border-white/10">
        <Container size="default">
          <div className="flex flex-col gap-6 max-w-4xl">
            {/* Back to Services Directory */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-industrial-silver hover:text-amber-primary transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary rounded-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to All 11 Services</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-amber-primary bg-amber-primary/10 border border-amber-primary/30 px-2.5 py-1 rounded-sm">
                DISCIPLINE [// {service.id}]
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

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-industrial-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-industrial-platinum leading-relaxed">
              {service.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* ── MAIN CONTENT & SIDEBAR ── */}
      <section className="py-16 sm:py-24 bg-navy-void">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Comprehensive Technical Breakdown */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Detailed Service Overview */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  SERVICE OVERVIEW
                </span>
                <h2 className="font-display text-2xl font-bold text-industrial-white">
                  Technical Scope &amp; Purpose
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum leading-relaxed">
                  {service.scope}
                </p>
              </div>

              {/* What the Service Involves */}
              <div className="p-6 sm:p-7 rounded-sm bg-navy-surface border border-white/10 flex flex-col gap-4 card-amber-top">
                <h3 className="font-display text-lg font-bold text-industrial-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-primary" aria-hidden="true" />
                  <span>What This Service Involves</span>
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-industrial-platinum">
                  {service.involves.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-amber-primary mt-0.5 shrink-0">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Equipment & Industrial Applications */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-telemetry">
                  APPLICATIONS &amp; MACHINERY
                </span>
                <h3 className="font-display text-xl font-bold text-industrial-white">
                  Relevant Equipment &amp; Industrial Systems
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.equipmentAndApplications.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-sm bg-navy-surface border border-white/5 text-xs sm:text-sm text-industrial-platinum flex items-start gap-2.5 font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Customer Requirements for Inquiries */}
              <div className="p-6 rounded-sm bg-navy-base border border-white/10 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-amber-primary font-mono text-xs font-bold uppercase">
                  <HelpCircle className="w-4 h-4" aria-hidden="true" />
                  <span>RECOMMENDED INQUIRY INFORMATION</span>
                </div>
                <h4 className="font-display text-lg font-bold text-industrial-white">
                  Typical Requirements to Discuss This Service
                </h4>
                <p className="text-xs text-industrial-silver leading-relaxed">
                  To help our engineers assess your requirements efficiently, having the following information ready is beneficial:
                </p>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-industrial-platinum font-mono">
                  {service.customerRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-primary mt-1.5 shrink-0" aria-hidden="true" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workshop & Mobilization Callout */}
              <TechCallout
                variant="neutral"
                kicker="PORT HARCOURT WORKSHOP & FIELD SERVICES"
              >
                Services can be coordinated at our Port Harcourt facility on Stellian Road or deployed directly to client industrial sites across Rivers State and surrounding regions.
              </TechCallout>
            </div>

            {/* Right 4 Columns: Inquiry Card & Related Services */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Inquiry Action Box */}
              <div className="p-6 rounded-sm bg-navy-surface border border-amber-primary/40 flex flex-col gap-5 shadow-industrial-md">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-primary">
                  TECHNICAL INQUIRY
                </span>
                <h3 className="font-display text-xl font-bold text-industrial-white">
                  Discuss This Service With Our Engineers
                </h3>
                <p className="text-xs text-industrial-silver leading-relaxed">
                  Speak directly with our technical team in Port Harcourt regarding equipment servicing schedules, part availability, or on-site inspections.
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/contact">
                    <Button variant="primary" className="w-full justify-center">
                      Submit Technical Inquiry
                    </Button>
                  </Link>

                  <a
                    href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-navy-base border border-white/10 hover:border-amber-primary/40 text-industrial-white font-mono text-xs font-bold uppercase transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-telemetry-green" aria-hidden="true" />
                    <span>{COMPANY_INFO.primaryPhone}</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.primaryEmail}?subject=Inquiry%20regarding%20${encodeURIComponent(
                      service.title
                    )}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm text-xs font-mono text-industrial-silver hover:text-industrial-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-primary" aria-hidden="true" />
                    <span>{COMPANY_INFO.primaryEmail}</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-industrial-silver">
                  <Clock className="w-3.5 h-3.5 text-amber-primary shrink-0" aria-hidden="true" />
                  <span>Mon–Fri: 8AM–5PM (Emergency callout available)</span>
                </div>
              </div>

              {/* Related Services */}
              <div className="p-6 rounded-sm bg-navy-base border border-white/10 flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-industrial-silver">
                  OTHER DISCIPLINES
                </span>
                <div className="flex flex-col gap-3">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/services/${rel.slug}`}
                      className="group flex flex-col gap-1 p-3.5 rounded-sm bg-navy-surface hover:border-amber-primary/40 border border-white/5 transition-colors"
                    >
                      <span className="font-mono text-[10px] text-amber-primary">
                        [// {rel.id}] • {rel.category}
                      </span>
                      <span className="font-display text-sm font-bold text-industrial-white group-hover:text-amber-primary transition-colors">
                        {rel.title}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="font-mono text-xs text-amber-primary hover:underline pt-2 inline-flex items-center gap-1.5"
                >
                  <span>View All 11 Services</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
