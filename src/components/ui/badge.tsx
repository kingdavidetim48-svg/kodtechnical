import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "amber" | "cyan" | "green" | "neutral";
}

export function Badge({
  className,
  variant = "amber",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    amber: "border-amber-primary/30 bg-amber-primary/10 text-amber-primary",
    cyan: "border-telemetry-cyan/30 bg-telemetry-cyan/10 text-telemetry-cyan",
    green: "border-telemetry-green/30 bg-telemetry-green/10 text-telemetry-green",
    neutral: "border-white/10 bg-white/5 text-industrial-silver",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider rounded-sm border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
