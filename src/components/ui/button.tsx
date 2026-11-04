import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-void disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px]";

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-sm gap-1.5",
      md: "h-11 px-5 text-sm rounded-sm gap-2",
      lg: "h-13 px-7 text-base rounded-md gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-amber-primary text-navy-void hover:bg-amber-hover border border-amber-hover shadow-sm hover:shadow-amber-glow transition-all",
      secondary:
        "bg-navy-surface text-industrial-white border border-white/10 hover:border-amber-primary/60 hover:bg-navy-elevated transition-colors",
      ghost:
        "bg-transparent text-amber-primary hover:text-industrial-white font-mono lowercase tracking-normal px-0 hover:bg-transparent transition-colors",
      outline:
        "bg-transparent text-industrial-white border border-white/20 hover:border-amber-primary hover:text-amber-primary transition-colors",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
        {icon && (
          <span className="transition-transform duration-280 group-hover:translate-x-1 flex-shrink-0">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
