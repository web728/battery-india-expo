
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarCheck2,
  MessageCircle,
  Ticket,
} from "lucide-react";

import { siteConfig } from "@/lib/site-config";

import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PREMIUM STICKY MOBILE BAR

   Design:
   - Hybrid Industrial Editorial
   - White floating action surface
   - Industrial red primary CTA
   - Clean charcoal typography
   - Three equal-width mobile actions
   - Safe-area support
   - WhatsApp analytics preserved

   Visible below lg breakpoint only.
================================================== */

const STAND_PATH = "/exhibit/book-a-stand";
const VISITOR_PATH = "/visit/register";

export function StickyMobileBar() {
  const whatsappNumber =
    siteConfig.whatsapp.number.replace(/\D/g, "");

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=` +
    encodeURIComponent(siteConfig.whatsapp.message);

  return (
    <nav
      aria-label="Quick participation actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E4E2DE] bg-white/95 shadow-[0_-8px_30px_rgba(25,28,33,0.10)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto grid max-w-[520px] grid-cols-3 gap-2 px-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2.5 sm:px-5">
        {/* =====================================
            EXHIBITOR ACTION
        ===================================== */}

        <Link
          href={STAND_PATH}
          aria-label="Book an exhibition stand"
          className="group flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-md border border-[#E4E2DE] bg-[#F7F6F3] px-2 py-2 text-center transition-[border-color,background-color,color] duration-200 hover:border-[#C62832]/40 hover:bg-[#FFF5F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62832]"
        >
          <CalendarCheck2
            aria-hidden="true"
            className="h-[19px] w-[19px] text-[#C62832]"
            strokeWidth={1.8}
          />

          <span className="font-heading text-[11px] font-bold leading-4 text-[#191C21] sm:text-xs">
            Exhibit
          </span>
        </Link>

        {/* =====================================
            VISITOR REGISTRATION
            PRIMARY ACTION
        ===================================== */}

        <Link
          href={VISITOR_PATH}
          aria-label="Register to visit the exhibition"
          className="group flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-md bg-[#C62832] px-2 py-2 text-center text-white transition-colors duration-200 hover:bg-[#A82029] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62832]"
        >
          <Ticket
            aria-hidden="true"
            className="h-[19px] w-[19px] text-white"
            strokeWidth={1.8}
          />

          <span className="font-heading text-[11px] font-bold leading-4 text-white sm:text-xs">
            Register
          </span>
        </Link>

        {/* =====================================
            WHATSAPP CONTACT
        ===================================== */}

        {whatsappNumber ? (
          <TrackedLink
            event={AnalyticsEvents.WHATSAPP_CLICK}
            params={{ source: "sticky-bar" }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with the exhibition team on WhatsApp"
            className="group flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-md border border-[#E4E2DE] bg-[#F7F6F3] px-2 py-2 text-center transition-[border-color,background-color] duration-200 hover:border-[#C62832]/40 hover:bg-[#FFF5F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62832]"
          >
            <MessageCircle
              aria-hidden="true"
              className="h-[19px] w-[19px] text-[#26784B]"
              strokeWidth={1.8}
            />

            <span className="inline-flex items-center gap-1 font-heading text-[11px] font-bold leading-4 text-[#191C21] sm:text-xs">
              WhatsApp

              <ArrowUpRight
                aria-hidden="true"
                className="h-3 w-3 text-[#777A80]"
                strokeWidth={1.8}
              />
            </span>
          </TrackedLink>
        ) : (
          <Link
            href="/contact"
            aria-label="Contact the exhibition team"
            className="flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-md border border-[#E4E2DE] bg-[#F7F6F3] px-2 py-2 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62832]"
          >
            <MessageCircle
              aria-hidden="true"
              className="h-[19px] w-[19px] text-[#C62832]"
              strokeWidth={1.8}
            />

            <span className="font-heading text-[11px] font-bold leading-4 text-[#191C21] sm:text-xs">
              Contact
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
