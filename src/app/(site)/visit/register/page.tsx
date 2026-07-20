import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { VisitorRegistrationForm } from "@/components/forms/visitor-registration-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Visitor Registration",
  description: "Register as a trade visitor for India Battery International Show 2026. Receive your confirmation and digital visitor pass instantly.",
  alternates: { canonical: "/visit/register" },
};

export default function VisitorRegisterPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Visit", href: "/visit" }, { label: "Visitor Registration", href: "/visit/register" }]} />
      <PageHero
        eyebrow="Visit"
        title="Visitor Registration"
        description="Complete the form below to register as a trade visitor. You will receive a confirmation email and digital pass immediately after submitting."
        breadcrumbs={[{ label: "Visit", href: "/visit" }, { label: "Visitor Registration" }]}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="rounded-xl border border-grey-light bg-white p-6 shadow-sm sm:p-10">
            <VisitorRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
