import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Registration Terms",
  description: "Registration terms for exhibitors and visitors at India Battery International Show 2026 — draft for legal review.",
  alternates: { canonical: "/registration-terms" },
  robots: { index: false, follow: true },
};

export default function RegistrationTermsPage() {
  return (
    <LegalPage title="Registration Terms" breadcrumbLabel="Registration Terms" href="/registration-terms" lastUpdated="Draft — Pending Legal Review">
      <p>
        These draft Registration Terms apply to visitor registration and exhibitor booking for India Battery
        International Show 2026. Final terms — including entry eligibility, fees (if any), and conduct
        requirements — will be confirmed and published here ahead of the show, subject to legal review.
      </p>
      <h2>Trade-Only Event</h2>
      <p>
        India Battery International Show 2026 is intended as a trade and business event. Entry policy for
        specific visitor categories is confirmed prior to the show opening.
      </p>
      <h2>Registration Accuracy</h2>
      <p>
        Registrants must provide accurate business information. {`Futurex`} reserves the right to verify
        registration details and decline entry where information cannot be verified.
      </p>
      <h2>Changes to Registration</h2>
      <p>
        Procedures for amending or cancelling a registration will be published here and confirmed in your
        registration confirmation email.
      </p>
    </LegalPage>
  );
}
