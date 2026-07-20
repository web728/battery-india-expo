import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy",
  description: "Cancellation and refund policy for India Battery International Show 2026 — draft for legal review.",
  alternates: { canonical: "/cancellation-policy" },
  robots: { index: false, follow: true },
};

export default function CancellationPolicyPage() {
  return (
    <LegalPage title="Cancellation and Refund Policy" breadcrumbLabel="Cancellation & Refund Policy" href="/cancellation-policy" lastUpdated="Draft — Pending Legal Review">
      <p>
        This draft policy outlines cancellation and refund terms for exhibition stand bookings, sponsorship
        packages and any paid registration categories at India Battery International Show 2026. Final terms
        are confirmed at the time of booking and subject to legal review.
      </p>
      <h2>Stand and Sponsorship Cancellations</h2>
      <p>
        Cancellation terms, applicable deadlines and any refund schedule for stand bookings and sponsorship
        packages will be set out in the relevant booking agreement.
      </p>
      <h2>Visitor Registration</h2>
      <p>
        Where visitor registration involves a fee, cancellation and refund terms will be published here and
        confirmed at the time of registration.
      </p>
      <h2>Event Postponement or Cancellation</h2>
      <p>
        In the event of postponement or cancellation of the show by the organizer, applicable terms regarding
        rescheduled participation or refunds will be communicated directly to registered participants.
      </p>
    </LegalPage>
  );
}
