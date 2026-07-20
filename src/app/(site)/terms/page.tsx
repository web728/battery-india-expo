import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for the India Battery International Show 2026 website — draft for legal review.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" breadcrumbLabel="Terms of Use" href="/terms" lastUpdated="Draft — Pending Legal Review">
      <p>
        These draft Terms of Use govern access to and use of the {siteConfig.siteUrl} website operated by{" "}
        {siteConfig.organizer.name} for India Battery International Show 2026. This content must be reviewed
        and finalised by qualified legal counsel before publication.
      </p>
      <h2>Use of This Website</h2>
      <p>
        This website is provided for informational purposes related to India Battery International Show 2026.
        You agree not to misuse the site, including by attempting unauthorised access, submitting false
        information, or interfering with its normal operation.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics and logos, is the property of{" "}
        {siteConfig.organizer.name} or its licensors and may not be reproduced without permission.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        Event details, pricing and programme content are subject to change. {siteConfig.organizer.name} is
        not liable for losses arising from reliance on unconfirmed information published on this site.
      </p>
    </LegalPage>
  );
}
