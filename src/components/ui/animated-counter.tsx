"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // E.g., "120+", "8000", "25+"
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // Pure number aur (+/%, etc.) ko alag nikalna
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Direct animate function with easeOut easing
    const controls = animate(0, numericValue, {
      duration: duration,
      ease: "easeOut", // Clean deceleration, no infinite slow tail
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}