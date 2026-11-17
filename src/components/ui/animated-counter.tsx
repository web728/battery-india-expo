
"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";

/* ==================================================
   LIGHTWEIGHT ANIMATED COUNTER

   - No Framer Motion
   - Starts when visible
   - Animates once
   - Supports comma formatting
   - Supports prefixes and suffixes
   - Reduced-motion friendly
   - Cleanup on unmount
================================================== */

export interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

type ParsedValue = {
  prefix: string;
  numericValue: number;
  suffix: string;
  decimals: number;
  usesGrouping: boolean;
};

function parseValue(value: string): ParsedValue | null {
  const match = value.match(
    /^([\s\S]*?)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/
  );

  if (!match) {
    return null;
  }

  const numericText = match[2].replace(/,/g, "");
  const numericValue = Number(numericText);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const decimals = numericText.includes(".")
    ? numericText.split(".")[1].length
    : 0;

  return {
    prefix: match[1],
    numericValue,
    suffix: match[3],
    decimals,
    usesGrouping: match[2].includes(","),
  };
}

function formatValue(
  number: number,
  parsed: ParsedValue
) {
  const formatted = parsed.usesGrouping
    ? number.toLocaleString("en-IN", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : number.toFixed(parsed.decimals);

  return `${parsed.prefix}${formatted}${parsed.suffix}`;
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export function AnimatedCounter({
  value,
  duration = 1.4,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const parsed = useMemo(
    () => parseValue(value),
    [value]
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (!parsed) {
      element.textContent = value;
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (prefersReducedMotion || duration <= 0) {
      element.textContent = value;
      return;
    }

    let frameId = 0;
    let started = false;
    let cancelled = false;

    const totalDuration =
      Math.max(0, duration) * 1000;

    function startAnimation() {
      if (started || cancelled || !element) {
        return;
      }

      started = true;

      let startTime: number | null = null;

      function animateFrame(timestamp: number) {
        if (!element || cancelled) {
          return;
        }

        if (startTime === null) {
          startTime = timestamp;
        }

        const elapsed = timestamp - startTime;

        const progress = Math.min(
          elapsed / totalDuration,
          1
        );

        const eased = easeOutCubic(progress);

        const currentValue =
          parsed!.numericValue * eased;

        element.textContent = formatValue(
          currentValue,
          parsed!
        );

        if (progress < 1) {
          frameId = requestAnimationFrame(
            animateFrame
          );
        } else {
          element.textContent = value;
        }
      }

      frameId = requestAnimationFrame(
        animateFrame
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value, duration, parsed]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={value}
    >
      {value}
    </span>
  );
}
