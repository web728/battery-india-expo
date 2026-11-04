import type { Metadata } from "next";

import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { VisitorRegistrationForm } from "@/components/forms/visitor-registration-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const registrationUrl = "/visit/register";

export const metadata: Metadata = {
  title: {
    absolute: "Visitor Registration | India Battery International Show 2027",
  },
  description:
    "Register your interest in attending India Battery International Show 2027, taking place 14–16 October at Auto Cluster Exhibition Centre in Pune.",
  alternates: {
    canonical: "/visit/register",
  },
  openGraph: {
    type: "website",
    title: "Visitor Registration | India Battery International Show 2027",
    description:
      "Visitor registration information for the 2027 battery exhibition in Pune.",
    url: "/visit/register",
    images: ["/images/expo-floor-components-booth.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisitorRegisterPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/visit" },
          {
            label: "Visitor Registration",
            href: "/visit/register",
          },
        ]}
      />

      <PageHero
        eyebrow="Visit"
        title="Visitor Registration"
        description="Register to attend India Battery International Show 2027 in Pune, 14–16 October."
        breadcrumbs={[
          { label: "Visit", href: "/visit" },
          { label: "Visitor Registration" },
        ]}
        backgroundImage={{
          src: "/images/expo-floor-components-booth.jpg",
          alt: "Visitors at a previous industry exhibition",
        }}
      />

      <section className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
              Visitor Registration
            </p>

            <h2 className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-0.04em]">
              Register your
              <span className="text-[#ed3138]"> visit.</span>
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#696970]">
              Complete the visitor registration form with your contact and
              professional details. Follow the instructions provided after
              submission.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#e7e4e0] bg-white shadow-[0_16px_45px_rgba(0,0,0,0.035)]">
            <div className="border-b border-[#eeece9] px-6 py-6 sm:px-9">
              <h3 className="font-heading text-xl font-bold text-[#252529]">
                Visitor Registration Form
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#696970]">
                Enter your details below.
              </p>
            </div>

            <div className="px-5 py-7 sm:px-9 sm:py-9">
              <VisitorRegistrationForm />
            </div>
          </div>

        
        </Container>
      </section>
    </>
  );
}
