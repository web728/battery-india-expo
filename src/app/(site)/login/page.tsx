import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { LoginForm } from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Participant Login",
  description: "Log in to your India Battery International Show 2026 participant dashboard.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Participant Login"
        title="Log In to Your Dashboard"
        description="Registered visitors and exhibitors can access their dashboard here."
        breadcrumbs={[{ label: "Login" }]}
          backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-md">
          <div className="rounded-xl border border-grey-light bg-white p-6 shadow-sm sm:p-10">
            <LoginForm />
          </div>
          <p className="mt-6 text-center text-sm text-grey-medium">
            Not registered yet?{" "}
            <Button href="/visit/register" variant="ghost" size="sm">
              Register to Visit
            </Button>
          </p>
        </Container>
      </section>
    </>
  );
}
