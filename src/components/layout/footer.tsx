
"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";

import {
  footerLegalLinks,
  footerQuickLinks,
  footerParticipationLinks,
  isExactActive,
  isExternalLink,
  type NavLink,
} from "@/lib/content/nav";

import { siteConfig } from "@/lib/site-config";

import {
  LinkedInIcon,
  FacebookIcon,
} from "@/components/ui/social-icons";

import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

import { cn } from "@/lib/utils";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   GLOBAL FOOTER
   Hybrid Industrial Editorial

   Structure:
   1. Brand & Event Details
   2. Explore Links
   3. Participation Links
   4. Contact Details
   5. Newsletter
   6. Legal / Copyright Bar

   Features:
   - Responsive layout
   - Existing navigation preserved
   - Existing analytics preserved
   - Active link indication
   - Accessible social links
   - Newsletter integration
   - No Framer Motion
================================================== */

/* --------------------------------------------------
   SOCIAL LINKS
-------------------------------------------------- */

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/batteryindiaexpo",
    Icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/indiabatteryshow/",
    Icon: LinkedInIcon,
  },
] as const;

/* --------------------------------------------------
   SHARED LINK STYLES
-------------------------------------------------- */

const footerLinkClasses = [
  "inline-flex items-center gap-2",
  "font-body text-[13px] leading-7",
  "text-white/60",
  "transition-colors duration-200",
  "hover:text-white",
  "focus-visible:rounded-sm",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-4",
  "focus-visible:outline-brand-red",
].join(" ");

/* ==================================================
   FOOTER
================================================== */

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      aria-label="Website footer"
      className="border-t border-white/10 bg-[#191C21] text-white"
    >
      {/* ========================================
          MAIN FOOTER
      ======================================== */}

      <Container>
        <div className="grid gap-x-8 gap-y-12 py-14 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-8 lg:py-20 xl:gap-x-10">

          {/* ------------------------------------
              BRAND & EVENT INFORMATION
          ------------------------------------ */}

          <div className="min-w-0 sm:col-span-2 lg:col-span-3">
            <Link
              href="/"
              aria-label={`${siteConfig.eventName} home`}
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
            >
              <Image
                src="/logo/battery-white.png"
                alt={siteConfig.eventName}
                width={230}
                height={86}
                sizes="230px"
                className="h-auto w-[200px] object-contain sm:w-[220px]"
              />
            </Link>

            <p className="mt-6 max-w-[330px] font-heading text-[15px] font-bold leading-[1.6] tracking-[-0.01em] text-white">
              {siteConfig.eventName}
            </p>

            <p className="mt-3 max-w-[340px] font-body text-[13px] leading-[1.8] text-white/55">
              {siteConfig.tagline}
            </p>

           

            {/* SOCIAL LINKS */}

            <div className="mt-7 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  title={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.035] text-white/70 transition-[border-color,background-color,color] duration-200 hover:border-[#C62832]/70 hover:bg-[#C62832]/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ------------------------------------
              EXPLORE LINKS
          ------------------------------------ */}

          <div className="min-w-0 lg:col-span-2">
            <FooterColumn
              title="Explore"
              links={footerQuickLinks}
              pathname={pathname}
            />
          </div>

          {/* ------------------------------------
              PARTICIPATION LINKS
          ------------------------------------ */}

          <div className="min-w-0 lg:col-span-2">
            <FooterColumn
              title="Participate"
              links={footerParticipationLinks}
              pathname={pathname}
            />
          </div>

          {/* ------------------------------------
              CONTACT INFORMATION
          ------------------------------------ */}

          <div className="min-w-0 lg:col-span-2">
            <FooterHeading>Contact</FooterHeading>

            <div className="mt-6 space-y-7">
              {siteConfig.contacts.map((contact) => (
                <div
                  key={contact.email}
                  className="min-w-0"
                >
                  <p className="font-heading text-[13px] font-bold leading-6 text-white/90">
                    {contact.name}
                  </p>

                  <div className="mt-3 space-y-2.5">
                    <TrackedLink
                      event={AnalyticsEvents.PHONE_CLICK}
                      params={{
                        source: "footer",
                      }}
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                      className="flex w-fit items-start gap-2.5 font-body text-[13px] leading-6 text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      <Phone
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-[#E45760]"
                        strokeWidth={1.8}
                      />

                      <span>{contact.phone}</span>
                    </TrackedLink>

                    <TrackedLink
                      event={AnalyticsEvents.EMAIL_CLICK}
                      params={{
                        source: "footer",
                      }}
                      href={`mailto:${contact.email}`}
                      className="flex w-fit items-start gap-2.5 break-all font-body text-[13px] leading-6 text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      <Mail
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-[#E45760]"
                        strokeWidth={1.8}
                      />

                      <span>{contact.email}</span>
                    </TrackedLink>
                  </div>
                </div>
              ))}

             
            </div>
          </div>

          {/* ------------------------------------
              NEWSLETTER
          ------------------------------------ */}

          <div className="min-w-0 sm:col-span-2 lg:col-span-3">
            <FooterHeading>
              Stay Updated
            </FooterHeading>

        

            <div className="mt-6">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </Container>

      {/* ========================================
          ORGANIZER STRIP
      ======================================== */}

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-xs leading-6 text-white/50">
              Organised by{" "}
              <span className="font-semibold text-white/80">
                {siteConfig.organizer.name}
              </span>
            </p>

            <Link
              href="/exhibit/book-a-stand"
              className="group inline-flex min-h-10 w-fit items-center gap-2 font-heading text-xs font-bold text-white transition-colors duration-200 hover:text-[#FFB7BC]"
            >
              Interested in Exhibiting?

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </Container>
      </div>

      {/* ========================================
          COPYRIGHT + LEGAL LINKS
      ======================================== */}

      <div className="border-t border-white/10 bg-[#15181D]">
        <Container>
          <div className="flex flex-col gap-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">

            <p className="font-body leading-6 text-white/45">
              © {new Date().getFullYear()}{" "}
              {siteConfig.organizer.name}.
              All rights reserved.
            </p>

            <nav aria-label="Legal links">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {footerLegalLinks.map((link) => {
                  const active = isExactActive(
                    pathname,
                    link.href
                  );

                  const external = isExternalLink(
                    link.href
                  );

                  return (
                    <li key={link.href}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "font-body leading-6 text-white/45 transition-colors duration-200 hover:text-white",
                            "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                          )}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          aria-current={
                            active ? "page" : undefined
                          }
                          className={cn(
                            "font-body leading-6 transition-colors duration-200",
                            "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
                            active
                              ? "font-semibold text-white"
                              : "text-white/45 hover:text-white"
                          )}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* ==================================================
   FOOTER HEADING
================================================== */

function FooterHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h2 className="font-heading text-[12px] font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </h2>
  );
}

/* ==================================================
   FOOTER NAVIGATION COLUMN
================================================== */

function FooterColumn({
  title,
  links,
  pathname,
}: {
  title: string;
  links: NavLink[];
  pathname: string;
}) {
  return (
    <nav aria-label={`${title} links`}>
      <FooterHeading>{title}</FooterHeading>

      <ul className="mt-6 space-y-3">
        {links.map((link) => {
          const external = isExternalLink(
            link.href
          );

          const active = !external &&
            isExactActive(pathname, link.href);

          return (
            <li key={link.href}>
              {external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClasses}
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 opacity-60"
                    strokeWidth={1.8}
                  />
                </a>
              ) : (
                <Link
                  href={link.href}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={cn(
                    footerLinkClasses,
                    active && "font-semibold text-white"
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                    />
                  )}

                  <span>{link.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
