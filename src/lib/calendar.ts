import { siteConfig } from "@/lib/site-config";

function toIcsDate(date: string) {
  return date.replace(/-/g, "");
}

export function buildIcsDataUrl() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Battery India Expo//Registration//EN",
    "BEGIN:VEVENT",
    `UID:battery-india-expo-2026@${new URL(siteConfig.siteUrl).hostname}`,
    `DTSTART;VALUE=DATE:${toIcsDate(siteConfig.dates.start)}`,
    `DTEND;VALUE=DATE:${toIcsDate(siteConfig.dates.end)}`,
    `SUMMARY:${siteConfig.eventName}`,
    `LOCATION:${siteConfig.venue.full}`,
    `DESCRIPTION:${siteConfig.tagline}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}
