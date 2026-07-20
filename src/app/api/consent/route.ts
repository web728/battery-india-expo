import { NextResponse } from "next/server";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export async function POST(request: Request) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || (!body.email && !body.phone)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const db = await getDb();
  await db!.collection("consent_records").insertOne({
    name: body.name ?? null,
    email: body.email ?? null,
    phone: body.phone ?? null,
    consent_type: body.consentType ?? "cookies",
    granted: true,
    created_at: new Date(),
  });

  return NextResponse.json({ ok: true });
}