import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** id passed to the inner <h2> for aria-labelledby on the parent <section> */
  id?: string;
}

export function SectionHeading({
  className,
  kicker,
  title,
  subtitle,
  align = "left",
  id,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {kicker && (
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-primary flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full bg-telemetry-green animate-pulse"
            aria-hidden="true"
          />
          {kicker}
        </span>
      )}
      <h2
        id={id}
        className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-industrial-white leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-industrial-platinum max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
