import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  withCrosshairs?: boolean;
}

export function GridDivider({
  withCrosshairs = true,
  className,
  ...props
}: GridDividerProps) {
  return (
    <div
      className={cn("relative w-full h-px bg-white/10 my-8 sm:my-12", className)}
      aria-hidden="true"
      {...props}
    >
      {withCrosshairs && (
        <>
          <span className="absolute left-0 -top-1.5 w-3 h-3 border-l border-t border-amber-primary/60" />
          <span className="absolute right-0 -top-1.5 w-3 h-3 border-r border-t border-amber-primary/60" />
        </>
      )}
    </div>
  );
}
