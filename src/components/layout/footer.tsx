import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerLegalLinks, footerQuickLinks } from "@/lib/content/nav";
import { siteConfig } from "@/lib/site-config";
import { LinkedInIcon, TwitterIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/social-icons";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

const socialIcons = [
  { key: "linkedin", Icon: LinkedInIcon, label: "LinkedIn" },
  { key: "twitter", Icon: TwitterIcon, label: "Twitter / X" },
  { key: "facebook", Icon: FacebookIcon, label: "Facebook" },
  { key: "instagram", Icon: InstagramIcon, label: "Instagram" },
  { key: "youtube", Icon: YouTubeIcon, label: "YouTube" },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
         <Link href="/" className="mb-4 inline-flex items-center gap-2">
  <Image
    src="/logo/battery-logo.png"
    alt="Battery India Expo Logo"
    width={240}
    height={90}
    className="h-16 w-auto object-contain"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</Link>
          <p className="text-sm leading-relaxed">{siteConfig.eventName}</p>
          <p className="mt-2 text-sm leading-relaxed">{siteConfig.dates.display}</p>
          <p className="mt-2 text-sm leading-relaxed">{siteConfig.venue.full}</p>
          <p className="mt-4 text-sm leading-relaxed">Organised by {siteConfig.organizer.name}</p>
          <div className="mt-5 flex gap-3">
            {socialIcons.map(({ key, Icon, label }) => {
              const url = siteConfig.social[key];
              if (!url) {
                return (
                  <span
                    key={key}
                    aria-label={`${label} (coming soon)`}
                    title={`${label} — coming soon`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                );
              }
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-red hover:text-red"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
          <ul className="flex flex-col gap-4 text-sm">
            {siteConfig.contacts.map((contact) => (
              <li key={contact.email}>
                <p className="font-semibold text-white">{contact.name}</p>
                <TrackedLink event={AnalyticsEvents.PHONE_CLICK} params={{ source: "footer" }} href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="mt-1 flex items-center gap-1.5 transition-colors hover:text-red">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {contact.phone}
                </TrackedLink>
                <TrackedLink event={AnalyticsEvents.EMAIL_CLICK} params={{ source: "footer" }} href={`mailto:${contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-red">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {contact.email}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Stay Updated</h3>
          <p className="mb-4 text-sm">
            Receive exhibitor announcements, conference updates and registration information.
          </p>
          <NewsletterForm compact />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.organizer.name}. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}