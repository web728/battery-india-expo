import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for the India Battery International Show 2026 website — draft for legal review.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" breadcrumbLabel="Cookie Policy" href="/cookies" lastUpdated="Draft — Pending Legal Review">
      <p>
        This website uses cookies to support essential functionality and, with your consent, analytics and
        marketing tools. You can choose to accept or decline non-essential cookies via the cookie banner shown
        on your first visit.
      </p>
      <h2>Types of Cookies Used</h2>
      <ul>
        <li>Essential cookies required for the site to function (e.g. remembering your cookie preference)</li>
        <li>Analytics cookies (Google Analytics / Google Tag Manager) used only after consent</li>
        <li>Marketing cookies (Meta Pixel, LinkedIn Insight Tag) used only after consent</li>
      </ul>
      <h2>Managing Your Preferences</h2>
      <p>
        You can change your cookie preference at any time by clearing your browser&apos;s local storage for
        this site or adjusting your browser&apos;s cookie settings.
      </p>
    </LegalPage>
  );
}
