import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility statement for the India Battery International Show 2026 website.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" breadcrumbLabel="Accessibility Statement" href="/accessibility" lastUpdated="Draft — Pending Legal Review">
      <p>
        We are committed to making this website accessible to the widest possible audience, in line with WCAG
        2.2 Level AA guidelines. This statement will be reviewed and finalised alongside ongoing accessibility
        testing.
      </p>
      <h2>Accessibility Features</h2>
      <ul>
        <li>Semantic HTML structure and heading hierarchy</li>
        <li>Keyboard navigation and visible focus indicators throughout the site</li>
        <li>Labelled form fields with accessible error messaging</li>
        <li>Alt text for meaningful images and a skip-to-content link</li>
        <li>Support for reduced-motion preferences</li>
      </ul>
      <h2>Feedback</h2>
      <p>
        If you encounter any accessibility barriers on this website, please contact us via the Contact page so
        we can address the issue.
      </p>
    </LegalPage>
  );
}
