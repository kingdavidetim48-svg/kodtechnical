import * as React from "react";
import { Container, type ContainerSize } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerSize?: ContainerSize;
  surface?: "void" | "base" | "surface" | "neutral";
  withBorderTop?: boolean;
  withBorderBottom?: boolean;
  withGridOverlay?: boolean;
  innerClassName?: string;
}

export function SectionWrapper({
  children,
  containerSize = "default",
  surface = "base",
  withBorderTop = false,
  withBorderBottom = false,
  withGridOverlay = false,
  className,
  innerClassName,
  ...props
}: SectionWrapperProps) {
  const surfaceClasses = {
    void: "bg-navy-void",
    base: "bg-navy-base",
    surface: "bg-navy-surface",
    neutral: "bg-industrial-neutral text-industrial-charcoal",
  };

  return (
    <section
      className={cn(
        "relative py-16 sm:py-20 lg:py-28 overflow-hidden",
        surfaceClasses[surface],
        withBorderTop && "border-t border-white/8",
        withBorderBottom && "border-b border-white/8",
        className
      )}
      {...props}
    >
      {withGridOverlay && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      )}
      <Container size={containerSize} className={innerClassName}>
        {children}
      </Container>
    </section>
  );
}
