import Link from "next/link";
import { CalendarCheck, Ticket, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

export function StickyMobileBar() {
  const waLink = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    siteConfig.whatsapp.message
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-grey-light bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden">
      <Link
        href="/exhibit/book-a-stand"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-navy-dark"
      >
        <CalendarCheck className="h-5 w-5 text-red" aria-hidden="true" />
        Exhibit
      </Link>
      <Link
        href="/visit/register"
        className="flex flex-col items-center justify-center gap-0.5 border-x border-grey-light py-2.5 text-xs font-semibold text-navy-dark"
      >
        <Ticket className="h-5 w-5 text-red" aria-hidden="true" />
        Visit
      </Link>
      <TrackedLink
        event={AnalyticsEvents.WHATSAPP_CLICK}
        params={{ source: "sticky-bar" }}
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-navy-dark"
      >
        <MessageCircle className="h-5 w-5 text-green" aria-hidden="true" />
        WhatsApp
      </TrackedLink>
    </div>
  );
}
