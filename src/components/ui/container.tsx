import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}) {
  return (
    // 'px-4' mobile ke liye, 'sm:px-6' tablet ke liye, 'lg:px-8' desktop ke liye
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}