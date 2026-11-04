"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 450,
  threshold = 0.12,
  className,
  as: Component = "div",
  style,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    // Immediate reveal if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    if (isRevealed) return "none";
    switch (direction) {
      case "up":
        return "translateY(16px)";
      case "down":
        return "translateY(-16px)";
      case "left":
        return "translateX(16px)";
      case "right":
        return "translateX(-16px)";
      case "none":
      default:
        return "none";
    }
  };

  const dynamicStyle: React.CSSProperties = {
    opacity: isRevealed ? 1 : 0,
    transform: getTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    willChange: isRevealed ? "auto" : "opacity, transform",
    ...style,
  };

  return (
    <Component
      ref={ref}
      style={dynamicStyle}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}

