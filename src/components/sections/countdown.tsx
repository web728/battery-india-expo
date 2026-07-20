"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

function getTimeLeft() {
  const target = new Date(`${siteConfig.dates.start}T00:00:00+05:30`).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: diff <= 0,
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    // Client-only: computed after mount so server and client markup match on first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time || time.isPast) return null;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4" role="timer" aria-label="Countdown to event start">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex w-16 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 py-3 backdrop-blur-sm sm:w-20"
        >
          <span className="font-heading text-2xl font-bold text-white sm:text-3xl tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-white/70 sm:text-xs">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
