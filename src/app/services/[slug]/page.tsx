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
  Phone,
  CheckCircle2,
  Wrench,
  HelpCircle,
  Cog,
  Boxes,
  FileText,
  ArrowUpRight,
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

  // Related services in the same category or neighboring disciplines
  const relatedServices = ENGINEERING_SERVICES.filter(
    (s) => s.slug !== service.slug
  ).slice(0, 3);

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
      <section className="relative py-16 sm:py-24 bg-[#0B0E17] border-b border-white/[0.08] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 inset-x-0 gold-hairline opacity-60" aria-hidden="true" />

        <Container size="default">
          <div className="flex flex-col gap-6 max-w-4xl">
            {/* Back to Services Directory */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-industrial-silver hover:text-[#C5A059] transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to All 11 Services</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#F4E7BD] bg-[#C5A059]/15 border border-[#C5A059]/35 px-2.5 py-1 rounded-sm">
                DISCIPLINE {"//"}&nbsp;{service.id}
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

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-industrial-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-industrial-platinum/90 leading-relaxed max-w-3xl">
              {service.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* ── MAIN CONTENT & SIDEBAR ── */}
      <section className="py-20 sm:py-28 bg-[#06080D]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Left 8 Columns: Comprehensive Technical Breakdown */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              {/* Detailed Service Overview */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  SERVICE OVERVIEW
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-industrial-white">
                  Technical Scope &amp; Purpose
                </h2>
                <p className="text-sm sm:text-base text-industrial-platinum/90 leading-relaxed">
                  {service.scope}
                </p>
              </div>

              {/* What the Service Involves */}
              <div className="p-7 sm:p-9 rounded-sm bg-[#111622] border border-white/[0.08] flex flex-col gap-5 card-gold-top shadow-sm">
                <h3 className="font-display text-xl font-bold text-industrial-white flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
                  <span>What This Service Involves</span>
                </h3>
                <ul className="flex flex-col gap-3.5 text-sm text-industrial-platinum/90">
                  {service.involves.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <span className="font-mono text-xs font-bold text-[#C5A059] mt-0.5 shrink-0">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Equipment & Industrial Applications */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-telemetry-cyan flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-telemetry-cyan" />
                  APPLICATIONS &amp; MACHINERY
                </span>
                <h3 className="font-display text-2xl font-bold text-industrial-white">
                  Relevant Equipment &amp; Industrial Systems
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.equipmentAndApplications.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-sm bg-[#111622] border border-white/[0.06] text-xs sm:text-sm text-industrial-platinum flex items-start gap-3 font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Customer Requirements for Inquiries */}
              <div className="p-7 sm:p-8 rounded-sm bg-[#0B0E17] border border-[#C5A059]/30 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#C5A059] font-mono text-xs font-bold uppercase">
                  <HelpCircle className="w-4 h-4" aria-hidden="true" />
                  <span>RECOMMENDED INQUIRY INFORMATION</span>
                </div>
                <h4 className="font-display text-xl font-bold text-industrial-white">
                  Typical Requirements to Discuss This Service
                </h4>
                <p className="text-xs sm:text-sm text-industrial-silver leading-relaxed">
                  To help our engineers assess your requirements efficiently, having the following information ready is beneficial:
                </p>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-industrial-platinum/90 font-mono">
                  {service.customerRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#C5A059] mt-2 shrink-0" aria-hidden="true" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workshop & Mobilization Callout */}
              <TechCallout
                variant="neutral"
                kicker="PORT HARCOURT WORKSHOP & FIELD SERVICES"
              >
                Services can be conducted either on-site at your facility across Rivers State and the Niger Delta, or at our Port Harcourt machine shop on Stellian Road. Emergency technical callout support is available 24/7 for critical machinery downtime.
              </TechCallout>
            </div>

            {/* Right 4 Columns: Sticky Quick Action Card & Related Disciplines */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Sticky Technical Consultation Card */}
              <div className="sticky top-28 p-7 rounded-sm bg-[#111622] border border-[#C5A059]/30 shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex flex-col gap-5">
                <span className="hud-bracket-tl" aria-hidden="true" />
                <span className="hud-bracket-tr" aria-hidden="true" />
                <span className="hud-bracket-bl" aria-hidden="true" />
                <span className="hud-bracket-br" aria-hidden="true" />

                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono">
                  <span className="text-[#C5A059] font-bold">PORT HARCOURT DESK</span>
                  <span className="text-telemetry-green font-semibold">ONLINE</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-lg font-bold text-industrial-white">
                    Request Quotation for This Service
                  </h3>
                  <p className="text-xs text-industrial-platinum/80 leading-relaxed">
                    Submit your scope, equipment details, or turnaround schedule to our mechanical engineering team.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/contact">
                    <Button variant="primary" className="w-full justify-center text-xs">
                      Request Technical Quotation
                    </Button>
                  </Link>

                  <a
                    href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[#06080D] border border-white/10 hover:border-[#C5A059]/60 text-industrial-white font-mono text-xs font-bold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  >
                    <Phone className="w-3.5 h-3.5 text-telemetry-green" aria-hidden="true" />
                    <span>Call Hotline Now</span>
                  </a>

                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 text-xs font-mono font-semibold text-telemetry-green hover:underline"
                  >
                    Direct WhatsApp Dispatch &rarr;
                  </a>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2 text-xs font-mono text-industrial-silver">
                  <div className="flex items-center justify-between">
                    <span>DISPATCH REGION:</span>
                    <span className="text-white font-medium">Rivers State &bull; Niger Delta</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>HOTLINE:</span>
                    <span className="text-[#C5A059] font-bold">{COMPANY_INFO.primaryPhone}</span>
                  </div>
                </div>
              </div>

              {/* Related Disciplines */}
              <div className="p-7 rounded-sm bg-[#0B0E17] border border-white/[0.08] flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  RELATED DISCIPLINES
                </span>
                <div className="flex flex-col gap-3">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/services/${rel.slug}`}
                      className="group p-3.5 rounded-sm bg-[#111622] border border-white/[0.06] hover:border-[#C5A059]/60 transition-colors flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#C5A059]">
                          {"//"} {rel.id}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-industrial-silver group-hover:text-[#F4E7BD] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-[#F4E7BD] transition-colors">
                        {rel.title}
                      </span>
                      <span className="text-[11px] text-industrial-silver/80 line-clamp-2 mt-0.5">
                        {rel.summary}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
