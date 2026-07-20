import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "red" | "green" | "navy";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-grey-light text-grey-medium",
    red: "bg-red/10 text-red",
    green: "bg-green/10 text-green",
    navy: "bg-navy/10 text-navy",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
