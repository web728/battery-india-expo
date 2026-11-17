
import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW
   TERMS OF USE

   Route: /terms
   Event: 14–16 October 2027

   Hybrid Industrial Editorial
   Server Component
================================================== */

const PAGE_PATH = "/terms";

const PAGE_TITLE =
  `Terms of Use | ${siteConfig.eventName}`;

const PAGE_DESCRIPTION =
  `Read the terms governing use of the ` +
  `${siteConfig.eventName} website, including ` +
  `event information, registrations, enquiries, ` +
  `downloads and website content.`;

/* --------------------------------------------------
   SEO METADATA
-------------------------------------------------- */

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

  // Preserve existing noindex setting
  // until the organizer approves publication.
  robots: {
    index: false,
    follow: true,
  },
};

/* ==================================================
   TERMS OF USE PAGE
================================================== */

export default function TermsPage() {
  const primaryContact = siteConfig.contacts[0];

  return (
    <LegalPage
      title="Terms of Use"
      breadcrumbLabel="Terms of Use"
      href={PAGE_PATH}
      lastUpdated="17 November 2026"
    >
      {/* INTRODUCTION */}

      <p>
        Welcome to the official website of{" "}
        <strong>{siteConfig.eventName}</strong>.
        This website is operated by{" "}
        <strong>{siteConfig.organizer.name}</strong>{" "}
        (&quot;we&quot;, &quot;us&quot; or
        &quot;our&quot;).
      </p>

      <p>
        These Terms of Use explain the conditions
        that apply when you access this website,
        browse event information, submit an enquiry,
        register for the exhibition or use
        other services made available through
        the website.
      </p>

      <p>
        By using this website, you agree to
        comply with these Terms of Use and
        applicable laws. If you do not agree
        with these terms, you should discontinue
        use of the website.
      </p>

      {/* SECTION 1 */}

      <h2>1. About the Exhibition</h2>

      <p>
        {siteConfig.eventName} is an industry-focused
        exhibition covering battery technologies,
        manufacturing, energy storage and related
        sectors.
      </p>

      <p>
        The exhibition is scheduled to take place
        from{" "}
        <strong>{siteConfig.dates.display}</strong>{" "}
        at{" "}
        <strong>{siteConfig.venue.name}</strong>,{" "}
        {siteConfig.venue.city},{" "}
        {siteConfig.venue.state}, India.
      </p>

      <p>
        Information provided on this website
        is intended to help visitors, exhibitors,
        sponsors and other interested parties
        learn about the exhibition and
        available participation opportunities.
      </p>

      {/* SECTION 2 */}

      <h2>2. Permitted Use of the Website</h2>

      <p>
        You may use this website for lawful,
        personal or business-related purposes
        connected with the exhibition.
      </p>

      <p>
        When using the website, you agree not to:
      </p>

      <ul>
        <li>
          Submit information that is intentionally
          false, misleading or fraudulent.
        </li>

        <li>
          Attempt to access accounts, systems,
          databases or website areas without
          authorisation.
        </li>

        <li>
          Interfere with the website&apos;s
          availability, security or
          normal operation.
        </li>

        <li>
          Introduce malicious code, harmful
          software or other disruptive content.
        </li>

        <li>
          Use automated tools to collect
          information from the website
          in a manner that violates
          applicable law or these terms.
        </li>

        <li>
          Misrepresent your relationship
          with the exhibition, its organiser
          or participating businesses.
        </li>

        <li>
          Use website content in a way
          that infringes the rights
          of another person or organisation.
        </li>
      </ul>

      <p>
        We may take reasonable measures
        to protect the website and respond
        to suspected misuse, subject
        to applicable law.
      </p>

      {/* SECTION 3 */}

      <h2>3. Accuracy of Information</h2>

      <p>
        We aim to keep the exhibition
        information published on this
        website accurate and relevant.
      </p>

      <p>
        However, event-related information
        may be updated as planning progresses.
        This can include exhibition schedules,
        participating companies, programme
        details, available services
        and participation arrangements.
      </p>

      <p>
        Visitors and participating businesses
        should refer to the latest official
        communications for confirmation
        of arrangements relevant to them.
      </p>

      {/* SECTION 4 */}

      <h2>4. Visitor Registration</h2>

      <p>
        The website may provide forms
        through which eligible visitors
        can submit their details
        to register for the exhibition.
      </p>

      <p>
        When submitting a registration,
        you agree to provide accurate
        and current information
        requested by the relevant form.
      </p>

      <p>
        Submission of a registration
        form does not, by itself,
        guarantee admission or any
        particular access entitlement.
        Registration and entry arrangements
        remain subject to the applicable
        event requirements.
      </p>

      <p>
        Additional information regarding
        registration may be available
        in our{" "}
        <Link
          href="/registration-terms"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Registration Terms
        </Link>
        .
      </p>

      {/* SECTION 5 */}

      <h2>5. Exhibitor Enquiries and Stand Bookings</h2>

      <p>
        Businesses interested in exhibiting
        may submit their company details,
        products or services and preferred
        stand requirements through
        the website.
      </p>

      <p>
        An exhibitor enquiry is an
        expression of interest and
        does not automatically create
        a confirmed stand booking.
      </p>

      <p>
        Stand availability, location,
        size, pricing, payment terms
        and other participation
        arrangements must be confirmed
        separately through the
        organiser&apos;s booking process.
      </p>

      <p>
        A binding commercial arrangement,
        where applicable, is governed
        by the specific booking documents
        and terms agreed between
        the relevant parties.
      </p>

      {/* SECTION 6 */}

      <h2>6. Sponsorship and Partnership Enquiries</h2>

      <p>
        Organisations may contact
        the organising team to discuss
        sponsorship, branding and
        partnership opportunities.
      </p>

      <p>
        Submitting a sponsorship enquiry
        does not reserve any sponsorship
        package or create a confirmed
        partnership agreement.
      </p>

      <p>
        Sponsorship opportunities,
        commercial terms and
        deliverables are subject
        to availability and
        separate confirmation.
      </p>

      {/* SECTION 7 */}

      <h2>7. Brochures and Downloadable Materials</h2>

      <p>
        This website may make
        event brochures, promotional
        materials and other resources
        available for download,
        including through forms
        that request professional
        contact information.
      </p>

      <p>
        Downloadable materials are
        provided for information
        and evaluation of possible
        exhibition participation.
      </p>

      <p>
        You may download and use
        these materials for their
        intended informational
        purpose, but you must not
        falsely represent them as
        your own official materials
        or use the organiser&apos;s
        branding in a misleading way.
      </p>

      <p>
        Information contained
        in brochures may be updated.
        Where there is a difference
        between preliminary promotional
        material and a later confirmed
        agreement, the applicable
        confirmed documents will govern
        the relevant commercial arrangements.
      </p>

      {/* SECTION 8 */}

      <h2>8. Intellectual Property</h2>

      <p>
        The website may contain
        trademarks, logos, text,
        photographs, graphics,
        layouts, documents and
        other protected materials.
      </p>

      <p>
        Rights in these materials
        belong to{" "}
        {siteConfig.organizer.name},
        relevant rights holders
        or their licensors,
        as applicable.
      </p>

      <p>
        Accessing the website
        does not transfer ownership
        or grant unrestricted
        commercial rights
        to its contents.
      </p>

      <p>
        Reproduction, redistribution
        or commercial use of protected
        material requires the
        necessary permission,
        except where otherwise
        allowed by applicable law.
      </p>

      {/* SECTION 9 */}

      <h2>9. Third-Party Content and Links</h2>

      <p>
        The website may contain
        links to external websites,
        social media platforms,
        event partners, exhibitors
        or third-party services.
      </p>

      <p>
        Such links are provided
        for convenience or
        informational purposes.
        They do not necessarily
        constitute an endorsement
        of all third-party content,
        products or services.
      </p>

      <p>
        Third-party websites
        may operate under
        their own policies
        and terms of use.
      </p>

      <p>
        We encourage visitors
        to review the relevant
        terms before interacting
        with external services.
      </p>

      {/* SECTION 10 */}

      <h2>10. Privacy and Personal Information</h2>

      <p>
        Personal information submitted
        through the website is handled
        in accordance with our
        published privacy information
        and applicable requirements.
      </p>

      <p>
        Please review our{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Privacy Policy
        </Link>{" "}
        to understand how information
        may be collected, used,
        stored and shared.
      </p>

      <p>
        Information regarding cookies
        and similar browser technologies
        is available in our{" "}
        <Link
          href="/cookies"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Cookie Policy
        </Link>
        .
      </p>

      {/* SECTION 11 */}

      <h2>11. Website Availability and Security</h2>

      <p>
        We take reasonable steps
        to operate and maintain
        the website, but continuous
        or uninterrupted availability
        cannot be guaranteed.
      </p>

      <p>
        Access may occasionally
        be affected by maintenance,
        system updates, network
        conditions, security incidents
        or circumstances outside
        our reasonable control.
      </p>

      <p>
        We may update, suspend
        or modify website features
        when reasonably necessary
        for operational or
        security purposes.
      </p>

      {/* SECTION 12 */}

      <h2>12. Limitation of Liability</h2>

      <p>
        The website and its general
        informational content
        are provided on an
        &quot;as available&quot; basis,
        subject to applicable law.
      </p>

      <p>
        While we aim to provide
        accurate information
        and reliable website
        functionality, we cannot
        guarantee that all content
        will remain error-free,
        complete or continuously
        available.
      </p>

      <p>
        To the extent permitted
        by applicable law,
        the organiser is not
        responsible for indirect
        or consequential losses
        arising solely from use
        of general website information
        or temporary website
        unavailability.
      </p>

      <p>
        Nothing in these terms
        excludes or limits
        liability or statutory
        rights where such exclusion
        or limitation is
        prohibited by law.
      </p>

      {/* SECTION 13 */}

      <h2>13. Event Changes and Cancellations</h2>

      <p>
        Exhibition arrangements
        may change due to operational,
        regulatory, safety or
        other relevant circumstances.
      </p>

      <p>
        If significant event changes
        occur, the organiser may
        communicate updated
        information through
        appropriate official channels.
      </p>

      <p>
        Any applicable cancellation,
        refund or booking obligations
        will be determined by
        the relevant participation
        agreement and applicable law.
      </p>

      <p>
        For further information,
        please refer to our{" "}
        <Link
          href="/cancellation-policy"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Cancellation Policy
        </Link>
        .
      </p>

      {/* SECTION 14 */}

      <h2>14. Changes to These Terms</h2>

      <p>
        We may update these Terms
        of Use to reflect changes
        in website functionality,
        exhibition arrangements
        or applicable requirements.
      </p>

      <p>
        The revised terms will
        be published on this page.
        The displayed update date
        will indicate when the
        published version
        was last revised.
      </p>

      {/* SECTION 15 */}

      <h2>15. Applicable Law and Disputes</h2>

      <p>
        These Terms of Use
        are intended to operate
        in accordance with
        the laws applicable
        in India.
      </p>

      <p>
        Any dispute relating
        to use of the website
        will be addressed
        subject to applicable
        law, mandatory legal
        protections and
        the jurisdiction
        of the competent courts.
      </p>

      <p>
        Separate contractual
        arrangements for
        exhibition participation
        may contain their own
        dispute resolution
        provisions.
      </p>

      {/* SECTION 16 */}

      <h2>16. Contact Information</h2>

      <p>
        For questions relating
        to this website
        or these Terms of Use,
        please contact the
        organising team.
      </p>

      <p>
        <strong>
          {siteConfig.organizer.name}
        </strong>
      </p>

      {primaryContact && (
        <p>
          Contact: {primaryContact.name}
          <br />
          Email:{" "}
          <a
            href={`mailto:${primaryContact.email}`}
            className="font-semibold text-brand-red underline underline-offset-2"
          >
            {primaryContact.email}
          </a>
          <br />
          Phone:{" "}
          <a
            href={`tel:${primaryContact.phone.replace(
              /[^\d+]/g,
              ""
            )}`}
            className="font-semibold text-brand-red underline underline-offset-2"
          >
            {primaryContact.phone}
          </a>
        </p>
      )}

      <p>
        You may also submit
        a general enquiry
        through our{" "}
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
