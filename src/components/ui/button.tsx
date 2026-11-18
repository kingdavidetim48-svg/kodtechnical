import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gold" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon, children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-void disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px] group";

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-sm gap-1.5",
      md: "h-11 px-5 text-sm rounded-sm gap-2",
      lg: "h-13 px-7 text-base rounded-md gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B28D46] text-[#06080D] font-bold border border-[#F4E7BD]/50 shadow-sm hover:shadow-gold-glow hover:brightness-105 transition-all",
      gold:
        "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B28D46] text-[#06080D] font-bold border border-[#F4E7BD]/50 shadow-sm hover:shadow-gold-glow hover:brightness-105 transition-all",
      secondary:
        "bg-[#111622] text-[#F8FAFC] border border-white/10 hover:border-[#C5A059]/60 hover:bg-[#171E2D] hover:text-white transition-all shadow-sm",
      ghost:
        "bg-transparent text-[#C5A059] hover:text-[#F4E7BD] font-mono lowercase tracking-normal px-0 hover:bg-transparent transition-colors",
      outline:
        "bg-transparent text-[#F8FAFC] border border-white/20 hover:border-[#C5A059] hover:text-[#C5A059] transition-all",
      dark:
        "bg-[#0E121A] text-[#FDFCF7] border border-[#0E121A] hover:bg-[#1A1D20] hover:border-[#C5A059]/50 transition-all",
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
