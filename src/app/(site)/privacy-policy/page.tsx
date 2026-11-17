
import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW
   PRIVACY POLICY
   Route: /privacy-policy
================================================== */

const PAGE_PATH = "/privacy-policy";

const PAGE_TITLE =
  `Privacy Policy | ${siteConfig.eventName}`;

const PAGE_DESCRIPTION =
  `Learn how ${siteConfig.organizer.name} collects, ` +
  `uses, stores and handles personal information ` +
  `submitted through the ${siteConfig.eventName} website.`;

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

  // Keep disabled until the published policy
  // matches verified operational practices.
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const privacyContact = siteConfig.contacts[0];

  return (
    <LegalPage
      title="Privacy Policy"
      breadcrumbLabel="Privacy Policy"
      href={PAGE_PATH}
      lastUpdated="17 November 2026"
    >
      {/* INTRODUCTION */}

      <p>
        This Privacy Policy explains how{" "}
        <strong>{siteConfig.organizer.name}</strong>{" "}
        (&quot;we&quot;, &quot;us&quot; or
        &quot;our&quot;) handles personal
        information collected through the official
        website of{" "}
        <strong>{siteConfig.eventName}</strong>.
      </p>

      <p>
        It applies when you browse this website,
        register for the exhibition, request an
        event brochure, submit a business enquiry,
        or subscribe to event communications.
      </p>

      <h2>1. Information We Collect</h2>

      <p>
        Depending on how you interact with the
        website, we may collect the following
        information.
      </p>

      <ul>
        <li>
          <strong>Contact information:</strong>{" "}
          Full name, business email address,
          telephone or mobile number.
        </li>

        <li>
          <strong>Professional information:</strong>{" "}
          Company or organisation name,
          designation, country, business category
          and areas of interest.
        </li>

        <li>
          <strong>Exhibitor information:</strong>{" "}
          Products and services, preferred
          booth size and exhibition requirements.
        </li>

        <li>
          <strong>Sponsorship information:</strong>{" "}
          Partnership interests, requirements
          and additional enquiry details.
        </li>

        <li>
          <strong>Registration information:</strong>{" "}
          Details provided through visitor
          registration and related forms.
        </li>

        <li>
          <strong>Communication information:</strong>{" "}
          Messages sent through contact forms,
          enquiries and other direct correspondence.
        </li>

        <li>
          <strong>Brochure requests:</strong>{" "}
          Details submitted to request or
          download event brochures.
        </li>

        <li>
          <strong>Technical information:</strong>{" "}
          Information such as browser details,
          device information, IP address and
          website interactions, where collected
          by hosting, security or enabled
          analytics services.
        </li>
      </ul>

      <p>
        We ask visitors to provide information
        relevant to the particular form or service
        they are using.
      </p>

      <h2>2. How We Use Your Information</h2>

      <p>
        We process personal information for
        purposes connected with the exhibition
        and operation of this website.
      </p>

      <ul>
        <li>
          Processing visitor registrations and
          related requests.
        </li>

        <li>
          Reviewing exhibitor stand enquiries
          and contacting interested businesses.
        </li>

        <li>
          Reviewing sponsorship and partnership
          enquiries.
        </li>

        <li>
          Responding to general contact enquiries.
        </li>

        <li>
          Providing access to requested event
          brochures and resources.
        </li>

        <li>
          Sending confirmations, references and
          service-related communications.
        </li>

        <li>
          Maintaining records needed for event
          administration and legitimate
          operational purposes.
        </li>

        <li>
          Protecting forms and the website
          against spam, abuse and unauthorised
          activity.
        </li>

        <li>
          Sending newsletters or promotional
          communications where you have
          separately agreed to receive them.
        </li>

        <li>
          Understanding website usage through
          optional analytics where the required
          consent has been obtained.
        </li>
      </ul>

      <h2>3. Consent and Communication Preferences</h2>

      <p>
        Where consent is required, we request
        it for the relevant processing purpose.
        Submitting a registration, brochure
        request or business enquiry allows us
        to process the information needed to
        handle that request, subject to
        applicable law.
      </p>

      <p>
        Consent to receive newsletters or
        promotional messages is separate
        from the submission of an enquiry
        or registration.
      </p>

      <p>
        You may ask us to stop sending
        promotional communications by
        contacting our team. Withdrawing
        marketing consent does not
        automatically cancel an existing
        registration or enquiry.
      </p>

      <h2>4. Storage and Service Providers</h2>

      <p>
        Information submitted through website
        forms may be processed using the
        systems supporting our registration,
        enquiry, communication and event
        administration workflows.
      </p>

      <p>
        These systems include database hosting,
        spreadsheet-based administration,
        email delivery and notification services.
        Our current website integrations include
        MongoDB Atlas and Google Sheets.
      </p>

      <p>
        Relevant information may also be
        processed by service providers needed
        to operate the website, verify form
        submissions and deliver communications.
      </p>

      <p>
        Service providers may process
        information on infrastructure located
        outside India. Applicable transfer
        restrictions and contractual
        requirements must be observed.
      </p>

      <h2>5. Information Sharing</h2>

      <p>
        Personal information may be accessible
        to authorised members of the
        organising team and service providers
        involved in processing relevant
        requests.
      </p>

      <p>
        Information may also be disclosed
        when required by applicable law,
        a lawful request or an obligation
        connected with the operation
        of the event.
      </p>

      <p>
        Submission of an enquiry does not
        automatically authorise unrelated
        marketing by independent third parties.
      </p>

      <h2>6. Cookies and Website Analytics</h2>

      <p>
        This website uses browser storage
        to remember your cookie preferences.
        Other storage technologies may be
        used for essential functionality,
        security or optional analytics.
      </p>

      <p>
        Optional analytics and similar
        technologies are subject to the
        consent controls implemented
        on the website.
      </p>

      <p>
        For more information, please read
        our{" "}
        <Link
          href="/cookies"
          className="font-semibold text-brand-red underline underline-offset-2"
        >
          Cookie Policy
        </Link>
        .
      </p>

      <h2>7. Data Retention</h2>

      <p>
        Personal information is retained
        for the period reasonably needed
        to fulfil the purpose for which
        it was collected, support event
        administration, address disputes,
        and meet applicable legal
        or record-keeping requirements.
      </p>

      <p>
        Retention requirements may differ
        depending on the type of record.
        When information is no longer
        required, it should be deleted
        or handled in accordance with
        applicable retention obligations.
      </p>

      <h2>8. Data Security</h2>

      <p>
        We seek to protect personal
        information through appropriate
        technical and organisational
        safeguards, including measures
        relevant to access control,
        secure processing and protection
        against unauthorised use.
      </p>

      <p>
        However, no website or internet-based
        transmission can be guaranteed
        completely secure.
      </p>

      <h2>9. Your Privacy Rights</h2>

      <p>
        Subject to applicable law, you
        may contact us regarding personal
        information held about you,
        including requests for access,
        correction, updating or erasure,
        or withdrawal of consent
        where applicable.
      </p>

      <p>
        We may need to verify your identity
        before acting on a request.
        Some information may need to
        be retained where legally required.
      </p>

      <h2>10. Third-Party Websites</h2>

      <p>
        Our website may contain links
        to external websites, social
        media platforms and third-party
        services.
      </p>

      <p>
        Their privacy practices are
        governed by their own policies.
        We encourage you to review
        those policies before providing
        personal information.
      </p>

      <h2>11. Children&apos;s Privacy</h2>

      <p>
        This website is intended primarily
        for professional, trade and business
        audiences.
      </p>

      <p>
        We do not design our registration
        and business enquiry services
        for use by children. If you
        believe a child has provided
        personal information without
        the permissions required by law,
        please contact us.
      </p>

      <h2>12. Changes to This Policy</h2>

      <p>
        We may update this Privacy Policy
        when website services, data
        processing practices or legal
        requirements change.
      </p>

      <p>
        The updated version will be
        published on this page with
        a revised update date.
      </p>

      <h2>13. Contact and Privacy Requests</h2>

      <p>
        For privacy-related questions,
        requests or concerns, please
        contact:
      </p>

      <p>
        <strong>
          {siteConfig.organizer.name}
        </strong>
      </p>

      {privacyContact && (
        <p>
          Contact: {privacyContact.name}
          <br />
          Email:{" "}
          <a
            href={`mailto:${privacyContact.email}`}
            className="font-semibold text-brand-red underline underline-offset-2"
          >
            {privacyContact.email}
          </a>
        </p>
      )}

      <p>
        You can also reach the team
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
