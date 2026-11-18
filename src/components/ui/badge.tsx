import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "amber" | "cyan" | "green" | "neutral" | "gold" | "ivory" | "dark";
}

export function Badge({
  className,
  variant = "gold",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: "border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]",
    amber: "border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]",
    cyan: "border-telemetry-cyan/30 bg-telemetry-cyan/10 text-telemetry-cyan",
    green: "border-telemetry-green/30 bg-telemetry-green/10 text-telemetry-green",
    neutral: "border-white/10 bg-white/5 text-industrial-silver",
    ivory: "border-[#12151B]/15 bg-[#EFECE2] text-[#0E121A]",
    dark: "border-white/15 bg-[#06080D] text-[#CBD5E1]",
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
