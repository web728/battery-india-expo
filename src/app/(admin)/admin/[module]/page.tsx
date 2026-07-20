import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { adminModules } from "@/lib/admin-modules";
import { getDb } from "@/lib/mongodb";
import { ModuleRecords } from "@/components/admin/module-records";

export function generateStaticParams() {
  return adminModules.map((m) => ({ module: m.slug }));
}

export default async function AdminModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const mod = adminModules.find((m) => m.slug === module);
  if (!mod) notFound();

  const db = await getDb();
  let rows: Record<string, unknown>[] = [];
  let error: string | null = null;

  if (db) {
    try {
      const docs = await db
        .collection(mod.table)
        .find({})
        .sort({ created_at: -1 })
        .limit(50)
        .toArray();
      rows = docs.map((doc) => ({ ...doc, _id: doc._id.toString() }));
    } catch (e) {
      error = e instanceof Error ? e.message : "Unknown error";
    }
  } else {
    error = "Database not configured";
  }

  return (
    <Container className="py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-dark">{mod.title}</h1>
          <p className="mt-1 text-sm text-grey-medium">{mod.description}</p>
        </div>
        <Badge tone="navy">Collection: {mod.table}</Badge>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red/30 bg-red/5 p-4 text-sm text-red">
          Could not load data from &quot;{mod.table}&quot;: {error}
        </p>
      )}

      <ModuleRecords moduleSlug={mod.slug} table={mod.table} initialRows={rows as (Record<string, unknown> & { _id: string })[]} />
    </Container>
  );
}