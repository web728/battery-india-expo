import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for India Battery International Show 2026 — draft for legal review.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" breadcrumbLabel="Privacy Policy" href="/privacy-policy" lastUpdated="Draft — Pending Legal Review">
      <p>
        {siteConfig.organizer.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This draft Privacy
        Policy describes how we collect, use and protect personal data submitted through this website for
        India Battery International Show 2026, and must be reviewed and finalised by qualified legal counsel
        before publication.
      </p>
      <h2>Data We Collect</h2>
      <ul>
        <li>Contact and business details submitted through registration, enquiry and application forms</li>
        <li>Communication preferences and marketing consent</li>
        <li>Technical data such as IP address and browser type via analytics tools, once cookie consent is given</li>
      </ul>
      <h2>Purpose of Data Collection</h2>
      <p>
        Data is collected to process visitor registrations, exhibitor and sponsor enquiries, respond to contact
        enquiries, and — with separate marketing consent — to send updates about the event.
      </p>
      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data, and may withdraw
        marketing consent at any time by contacting {siteConfig.contacts[1].email}.
      </p>
      <h2>Data Sharing</h2>
      <p>
        Data is not sold to third parties. It may be shared with service providers supporting event
        operations (such as email delivery and database hosting) under appropriate confidentiality terms.
      </p>
    </LegalPage>
  );
}
