"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackedLink({
  event,
  params,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  params?: Record<string, string | number | boolean>;
  children: ReactNode;
}) {
  return (
    <a {...rest} onClick={() => trackEvent(event, params)}>
      {children}
    </a>
  );
}
