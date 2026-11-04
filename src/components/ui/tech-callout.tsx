import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechCalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  kicker?: string;
  variant?: "amber" | "cyan" | "green" | "neutral";
  icon?: React.ReactNode;
}

export function TechCallout({
  children,
  kicker,
  variant = "amber",
  icon,
  className,
  ...props
}: TechCalloutProps) {
  const variantStyles = {
    amber: "border-l-amber-primary bg-amber-primary/5 text-industrial-platinum",
    cyan: "border-l-cyan-telemetry bg-cyan-telemetry/5 text-industrial-platinum",
    green: "border-l-telemetry-green bg-telemetry-green/5 text-industrial-platinum",
    neutral: "border-l-white/20 bg-white/5 text-industrial-platinum",
  };

  const kickerStyles = {
    amber: "text-amber-primary",
    cyan: "text-cyan-telemetry",
    green: "text-telemetry-green",
    neutral: "text-industrial-silver",
  };

  return (
    <div
      className={cn(
        "border-l-2 p-4 sm:p-5 rounded-r-sm backdrop-blur-sm border-t border-r border-b border-white/5",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
        <div className="flex flex-col gap-1 w-full">
          {kicker && (
            <span
              className={cn(
                "font-mono text-[11px] font-bold uppercase tracking-wider",
                kickerStyles[variant]
              )}
            >
              {kicker}
            </span>
          )}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
