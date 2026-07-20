import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { getCurrentProfile, isAdminRole } from "@/lib/auth";
import { adminModules } from "@/lib/admin-modules";

async function requireAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || !isAdminRole(profile.role)) return null;
  return profile;
}

// Never trust a table/collection name from the request directly — always
// resolve it through the adminModules whitelist by slug.
function resolveTable(moduleSlug: string) {
  return adminModules.find((m) => m.slug === moduleSlug)?.table ?? null;
}

export async function POST(request: Request, { params }: { params: Promise<{ module: string }> }) {
  const profile = await requireAdmin();
  if (!profile) return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  if (!isMongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { module } = await params;
  const table = resolveTable(module);
  if (!table) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { _id, ...rest } = body as Record<string, unknown>;
  const db = await getDb();
  const result = await db!.collection(table).insertOne({ ...rest, created_at: new Date() });

  return NextResponse.json({ ok: true, id: result.insertedId.toString() });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ module: string }> }) {
  const profile = await requireAdmin();
  if (!profile) return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  if (!isMongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { module } = await params;
  const table = resolveTable(module);
  if (!table) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (!id || !body?.data || typeof body.data !== "object") {
    return NextResponse.json({ error: "id and data are required" }, { status: 400 });
  }

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { _id, ...data } = body.data as Record<string, unknown>;
  const db = await getDb();
  await db!.collection(table).updateOne({ _id: objectId }, { $set: { ...data, updated_at: new Date() } });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ module: string }> }) {
  const profile = await requireAdmin();
  if (!profile) return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  if (!isMongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { module } = await params;
  const table = resolveTable(module);
  if (!table) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  await db!.collection(table).deleteOne({ _id: objectId });

  return NextResponse.json({ ok: true });
}