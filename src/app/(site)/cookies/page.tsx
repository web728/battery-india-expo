
import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW
   COOKIE POLICY
   Route: /cookies
================================================== */

const PAGE_PATH = "/cookies";

const PAGE_TITLE =
  `Cookie Policy | ${siteConfig.eventName}`;

const PAGE_DESCRIPTION =
  `Learn how the ${siteConfig.eventName} website ` +
  `uses cookies, browser storage and optional ` +
  `analytics technologies, and how to manage ` +
  `your preferences.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    type: "website",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: siteConfig.eventName,
  },

  // Enable indexing after verifying the policy
  // against the live analytics configuration.
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  const contact = siteConfig.contacts[0];

  return (
    <LegalPage
      title="Cookie Policy"
      breadcrumbLabel="Cookie Policy"
      href={PAGE_PATH}
      lastUpdated="17 November 2026"
    >
      <p>
        This Cookie Policy explains how
        the official website of{" "}
        <strong>{siteConfig.eventName}</strong>,
        operated by{" "}
        <strong>{siteConfig.organizer.name}</strong>,
        uses cookies and browser storage
        technologies.
      </p>

      <p>
        It also explains the purpose of
        these technologies and the
        choices available to visitors.
      </p>

      <h2>1. What Are Cookies?</h2>

      <p>
        Cookies are small pieces of information
        that websites may store in your
        browser. They can help websites
        remember preferences, support
        functionality and measure usage.
      </p>

      <p>
        Websites can also use related
        technologies, such as local storage
        and session storage, to save
        information within a browser.
      </p>

      <h2>2. How This Website Uses Storage</h2>

      <p>
        This website uses browser storage
        to remember the visitor&apos;s
        preference for optional cookies
        and tracking technologies.
      </p>

      <p>
        Some essential technical operations
        may also involve cookies or
        temporary identifiers used by
        hosting, security, verification
        or other website services.
      </p>

      <p>
        Optional analytics technologies
        may be used to understand
        website performance and visitor
        interactions, subject to
        applicable consent requirements.
      </p>

      <h2>3. Cookie and Storage Categories</h2>

      <h3>Essential Website Storage</h3>

      <p>
        Essential storage helps support
        basic website operation,
        security and the management
        of visitor preferences.
      </p>

      <p>
        This may include browser storage
        used to remember whether optional
        tracking has been accepted
        or declined.
      </p>

      <h3>Analytics Technologies</h3>

      <p>
        Analytics technologies may
        be used to understand which
        pages visitors access, how
        visitors navigate the website,
        and whether website functions
        are being used successfully.
      </p>

      <p>
        Where required, analytics
        cookies and related tracking
        will be subject to the
        visitor&apos;s consent choice.
      </p>

      <h3>Marketing Technologies</h3>

      <p>
        Marketing or advertising
        technologies may be introduced
        where relevant to event
        promotion. If used, they
        must be disclosed and handled
        according to applicable
        consent requirements.
      </p>

      <p>
        This policy does not mean
        that every analytics or
        advertising service is
        currently active on the website.
      </p>

      <h2>4. Cookie Consent Preferences</h2>

      <p>
        When the website does not
        recognise a saved preference,
        a cookie consent banner
        provides two choices:
      </p>

      <ul>
        <li>
          <strong>Accept All:</strong>{" "}
          Allows optional technologies
          covered by the website&apos;s
          consent implementation.
        </li>

        <li>
          <strong>Reject Optional:</strong>{" "}
          Declines optional technologies
          while allowing the website
          to operate with necessary
          functionality.
        </li>
      </ul>

      <p>
        Your selection is recorded
        locally in the browser
        used to access this website.
      </p>

      <h2>5. Cookie Preference Storage</h2>

      <p>
        The website&apos;s consent banner
        uses the following local
        storage entry:
      </p>

      <ul>
        <li>
          <strong>Storage key:</strong>{" "}
          <code>bie-cookie-consent</code>
        </li>

        <li>
          <strong>Purpose:</strong>{" "}
          Remembering the selected
          cookie consent preference.
        </li>

        <li>
          <strong>Possible values:</strong>{" "}
          <code>accepted</code> or{" "}
          <code>declined</code>.
        </li>

        <li>
          <strong>Storage type:</strong>{" "}
          Browser local storage,
          not a traditional HTTP cookie.
        </li>
      </ul>

      <p>
        The preference normally remains
        in that browser until it is
        removed or changed.
      </p>

      <h2>6. Managing or Changing Preferences</h2>

      <p>
        You can remove the saved cookie
        preference through your
        browser&apos;s site-data
        or storage settings.
      </p>

      <p>
        After the saved preference
        is removed, the website can
        display its consent banner
        again on a subsequent visit.
      </p>

      <p>
        You can also use your browser
        settings to manage cookies
        and other website data.
      </p>

      <p>
        Removing a saved preference
        does not automatically delete
        information already processed
        by an external service.
        Where applicable, separate
        privacy requests may be made
        under our{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <h2>7. Third-Party Services</h2>

      <p>
        Certain website functions
        may involve third-party
        services, such as form
        verification, hosting,
        analytics or embedded
        content.
      </p>

      <p>
        These services may use
        their own cookies or
        technical identifiers
        according to their
        functionality and
        applicable privacy
        practices.
      </p>

      <p>
        Visitors can review
        the privacy information
        provided by those
        services when relevant.
      </p>

      <h2>8. Disabling Cookies</h2>

      <p>
        Most browsers provide
        controls to block,
        remove or restrict
        cookies and other
        stored website data.
      </p>

      <p>
        Disabling some essential
        storage technologies
        may affect website
        functionality, including
        preference persistence
        or verification-related
        features.
      </p>

      <h2>9. Updates to This Policy</h2>

      <p>
        We may revise this
        Cookie Policy when
        the website&apos;s
        technologies or
        applicable requirements
        change.
      </p>

      <p>
        Any revised policy
        will be published
        on this page with
        an updated date.
      </p>

      <h2>10. Contact Us</h2>

      <p>
        For questions about
        cookies or personal
        information, contact:
      </p>

      <p>
        <strong>
          {siteConfig.organizer.name}
        </strong>
      </p>

      {contact && (
        <p>
          Email:{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-semibold text-brand-red underline underline-offset-2"
          >
            {contact.email}
          </a>
        </p>
      )}

      <p>
        You may also use our{" "}
        <Link
          href="/contact"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
