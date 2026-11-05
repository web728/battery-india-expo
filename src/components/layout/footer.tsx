"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Mail, Phone } from "lucide-react";

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

import { LinkedInIcon, FacebookIcon } from "@/components/ui/social-icons";

import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

import { cn } from "@/lib/utils";

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
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-white/10 bg-[#18181b] text-white">
      <Container>
        <div className="grid gap-x-9 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1.1fr] lg:gap-10 lg:py-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="India International Battery Show home"
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed3138]"
            >
              <Image
                src="/logo/battery-white.png"
                alt="India International Battery Show"
                width={230}
                height={86}
                className="h-18 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs font-heading text-sm font-semibold leading-6 text-white/85">
              {siteConfig.eventName}
            </p>

            <div className="mt-4 space-y-1.5 text-sm leading-6 text-white/55">
              <p>{siteConfig.dates.display}</p>
              <p>{siteConfig.venue.full}</p>
            </div>

            <p className="mt-5 text-xs leading-6 text-white/50">
              Organised by{" "}
              <span className="font-semibold text-white/80">
                {siteConfig.organizer.name}
              </span>
            </p>

            <div className="mt-6 flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/70 transition-[background-color,border-color,color] hover:border-[#ed3138]/60 hover:bg-[#ed3138]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <FooterColumn
            title="Explore"
            links={footerQuickLinks}
            pathname={pathname}
          />

          {/* Participation */}
          <FooterColumn
            title="Participate"
            links={footerParticipationLinks}
            pathname={pathname}
          />

          {/* Contact & newsletter */}
          <div>
            <FooterHeading>Contact</FooterHeading>

            <div className="mt-5 space-y-5">
              {siteConfig.contacts.map((contact, index) => (
                <div key={`${contact.email}-${index}`} className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-white/90">
                    {contact.name}
                  </p>

                  {contact.phone && (
                    <TrackedLink
                      event={AnalyticsEvents.PHONE_CLICK}
                      params={{ source: "footer" }}
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                      className="mt-2 flex items-start gap-2 text-[13px] leading-6 text-white/55 transition-colors hover:text-white"
                    >
                      <Phone
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-[#ed3138]"
                        aria-hidden="true"
                      />
                      <span>{contact.phone}</span>
                    </TrackedLink>
                  )}

                  {contact.email && (
                    <TrackedLink
                      event={AnalyticsEvents.EMAIL_CLICK}
                      params={{ source: "footer" }}
                      href={`mailto:${contact.email}`}
                      className="mt-1 flex items-start gap-2 break-all text-[13px] leading-6 text-white/55 transition-colors hover:text-white"
                    >
                      <Mail
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-[#ed3138]"
                        aria-hidden="true"
                      />
                      <span>{contact.email}</span>
                    </TrackedLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.organizer.name}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => {
              const active = isExactActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors hover:text-white",
                    active && "font-semibold text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-[12px] font-bold uppercase tracking-[0.13em] text-white">
      {children}
    </h3>
  );
}

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
    <div>
      <FooterHeading>{title}</FooterHeading>

      <ul className="mt-5 space-y-3">
        {links.map((link) => {
          const external = isExternalLink(link.href);

          const active = isExactActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 text-[13px] leading-6 transition-colors",
                  active
                    ? "font-semibold text-white"
                    : "text-white/55 hover:text-white",
                  "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
