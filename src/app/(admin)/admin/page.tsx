import Link from "next/link";
import { Container } from "@/components/ui/container";
import { adminModules } from "@/lib/admin-modules";
import { getDb } from "@/lib/mongodb";

async function getCount(collection: string) {
  const db = await getDb();
  if (!db) return null;
  return db.collection(collection).countDocuments();
}

export default async function AdminOverviewPage() {
  const leadTables = ["registrations", "exhibitor_leads", "sponsor_leads", "contact_enquiries"];
  const counts = await Promise.all(leadTables.map((t) => getCount(t)));

  return (
    <Container className="py-10">
      <h1 className="font-heading text-2xl font-bold text-navy-dark">Overview</h1>
      <p className="mt-2 text-sm text-grey-medium">Quick access to leads, registrations and site content.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {leadTables.map((table, i) => (
          <Link key={table} href={`/admin/${table.replace(/_/g, "-")}`} className="rounded-xl border border-grey-light bg-white p-5 shadow-sm hover:shadow-md">
            <p className="text-2xl font-bold text-navy-dark">{counts[i] ?? "—"}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-grey-medium">{table.replace(/_/g, " ")}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-10 font-heading text-lg font-bold text-navy-dark">All Modules</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminModules.map((m) => (
          <Link key={m.slug} href={`/admin/${m.slug}`} className="rounded-xl border border-grey-light bg-white p-5 shadow-sm hover:shadow-md">
            <h3 className="font-heading text-sm font-bold text-navy-dark">{m.title}</h3>
            <p className="mt-1.5 text-xs text-grey-medium">{m.description}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}