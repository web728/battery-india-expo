import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "../../(site)/globals.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile, isAdminRole, isSupabaseConfigured } from "@/lib/auth";
import { adminModules } from "@/lib/admin-modules";
import { Container } from "@/components/ui/container";
import { LayoutDashboard } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

const groups = ["Content", "Leads & Registrations", "Settings"] as const;

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
        <body className="flex min-h-full flex-col bg-white text-navy-dark">
          <div className="bg-grey-light py-20">
            <Container className="max-w-2xl text-center">
              <h1 className="font-heading text-2xl font-bold text-navy-dark">Admin CMS Not Yet Configured</h1>
              <p className="mt-4 text-sm text-grey-medium">
                Set <code className="rounded bg-white px-1.5 py-0.5">MONGODB_URI</code> and{" "}
                <code className="rounded bg-white px-1.5 py-0.5">JWT_SECRET</code>, then run{" "}
                <code className="rounded bg-white px-1.5 py-0.5">scripts/create-admin.ts</code>.
              </p>
            </Container>
          </div>
        </body>
      </html>
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin");
  if (!isAdminRole(profile.role)) redirect("/login");

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-navy-dark">
        <div className="flex min-h-screen flex-col lg:flex-row">
          {/* Sidebar: fixed height on desktop, its own scroll area, logout
              pinned in a shrink-0 footer so it's always visible on screen. */}
          <aside className="flex shrink-0 flex-col border-b border-grey-light bg-navy-dark lg:h-screen lg:w-64 lg:sticky lg:top-0 lg:border-b-0 lg:border-r">
            <div className="flex-1 overflow-y-auto p-6">
              <Link href="/admin" className="mb-6 flex items-center gap-2 text-white">
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                <span className="font-heading text-sm font-bold">Admin CMS</span>
              </Link>
              <nav aria-label="Admin navigation" className="flex flex-col gap-5">
                {groups.map((group) => (
                  <div key={group}>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-white/40">{group}</p>
                    <ul className="flex flex-col gap-1">
                      {adminModules.filter((m) => m.group === group).map((m) => (
                        <li key={m.slug}>
                          <Link href={`/admin/${m.slug}`} className="block rounded px-2 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                            {m.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            <div className="shrink-0 border-t border-white/10 p-4">
              <p className="mb-2 truncate text-xs text-white/50">{profile.full_name}</p>
              <LogoutButton />
            </div>
          </aside>
          <div className="flex-1 overflow-y-auto bg-grey-light">{children}</div>
        </div>
      </body>
    </html>
  );
}