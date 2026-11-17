
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/* ==================================================
   SHARED CARD
   Hybrid Industrial Editorial

   - White surface
   - Warm neutral borders
   - Subtle hover feedback
   - No heavy shadows
   - Responsive and reusable
================================================== */

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({
  children,
  className,
  interactive = false,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-card",
        "border border-[#E4E2DE]",
        "bg-surface",
        "p-6 sm:p-7",
        "text-foreground",
        "transition-[border-color,box-shadow] duration-200",
        interactive &&
          "hover:border-brand-red/30 hover:shadow-[0_8px_24px_rgba(25,28,33,0.045)]",
        className
      )}
    >
      {children}
    </div>
  );
}
