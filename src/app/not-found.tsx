import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested engineering page or resource could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center py-24 sm:py-32">
      <Container size="prose">
        <div className="flex flex-col items-center text-center gap-8">
          {/* 404 telemetry display */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[6rem] font-bold text-amber-primary leading-none tracking-tighter select-none">
              404
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-industrial-silver">
              [// PAGE_NOT_FOUND — STATUS: 404]
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-industrial-white">
              This route does not exist
            </h1>
            <p className="text-sm text-industrial-platinum leading-relaxed max-w-md">
              The page you requested could not be located. Return to the
              homepage or navigate to one of our service areas.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/">
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
              >
                Return to Home
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary">Browse Services</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

