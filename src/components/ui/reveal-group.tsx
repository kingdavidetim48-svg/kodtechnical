"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerMs?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export function RevealGroup({
  children,
  staggerMs = 70,
  duration = 450,
  threshold = 0.1,
  className,
  as: Component = "div",
  ...props
}: RevealGroupProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsRevealed(true);
      return;
    }

    const element = containerRef.current;
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

  const childArray = React.Children.toArray(children);

  return (
    <Component ref={containerRef} className={cn(className)} {...props}>
      {childArray.map((child, index) => {
        const itemStyle: React.CSSProperties = {
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? "none" : "translateY(16px)",
          transitionProperty: "opacity, transform",
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${index * staggerMs}ms`,
          willChange: isRevealed ? "auto" : "opacity, transform",
        };

        return (
          <div key={index} style={itemStyle} className="h-full">
            {child}
          </div>
        );
      })}
    </Component>
  );
}

