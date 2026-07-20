import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { DashboardShell, DashboardCard } from "@/components/dashboard/dashboard-shell";
import { getCurrentProfile, isSupabaseConfigured } from "@/lib/auth";
import { QrCode, Users, FileDown, UserCircle, Building2, Upload, Ticket, LifeBuoy } from "lucide-react";

export const metadata: Metadata = {
  title: "Participant Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHero
          eyebrow="Dashboard"
          title="Participant Dashboard"
          description="Role-based dashboards for visitors and exhibitors."
          breadcrumbs={[{ label: "Dashboard" }]}
        //     backgroundImage={{
        //   src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
        //   alt: "Futurex branding at a previous edition of the show",
        // }}
        />
        <section className="py-16 sm:py-20">
          <Container>
            <EmptyState
              title="Dashboard Available Once Accounts Are Enabled"
              description="This environment does not yet have Supabase configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable participant accounts and dashboards — see the README for setup instructions."
              action={<Button href="/visit/register">Register to Visit</Button>}
            />
          </Container>
        </section>
      </>
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const name = profile.full_name ?? "Participant";

  if (profile.role === "exhibitor") {
    return (
      <DashboardShell roleLabel="Exhibitor" name={name}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Company Profile">
            <p className="flex items-center gap-2 text-sm text-grey-medium"><Building2 className="h-4 w-4" /> {profile.company ?? "Not set"}</p>
          </DashboardCard>
          <DashboardCard title="Logo & Product Upload">
            <p className="flex items-center gap-2 text-sm text-grey-medium"><Upload className="h-4 w-4" /> No uploads yet</p>
          </DashboardCard>
          <DashboardCard title="Stand Information">
            <p className="text-sm text-grey-medium">Stand allocation confirmed by the sales team</p>
          </DashboardCard>
          <DashboardCard title="Exhibitor Passes">
            <p className="flex items-center gap-2 text-sm text-grey-medium"><Ticket className="h-4 w-4" /> Pass allocation confirmed at booking</p>
          </DashboardCard>
          <DashboardCard title="Support">
            <p className="flex items-center gap-2 text-sm text-grey-medium"><LifeBuoy className="h-4 w-4" /> Contact our sales team for assistance</p>
          </DashboardCard>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell roleLabel="Visitor" name={name}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Registration Pass">
          <p className="flex items-center gap-2 text-sm text-grey-medium"><QrCode className="h-4 w-4" /> View your pass on the confirmation page</p>
        </DashboardCard>
        <DashboardCard title="Saved Exhibitors">
          <p className="flex items-center gap-2 text-sm text-grey-medium"><Users className="h-4 w-4" /> No exhibitors saved yet</p>
        </DashboardCard>
        <DashboardCard title="Profile">
          <p className="flex items-center gap-2 text-sm text-grey-medium"><UserCircle className="h-4 w-4" /> {profile.company ?? "Update your profile"}</p>
        </DashboardCard>
        <DashboardCard title="Downloads">
          <p className="flex items-center gap-2 text-sm text-grey-medium"><FileDown className="h-4 w-4" /> Event brochure available</p>
        </DashboardCard>
      </div>
    </DashboardShell>
  );
}
