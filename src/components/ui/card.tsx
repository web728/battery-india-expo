import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-grey-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
