import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

// Creates a visitor/exhibitor login account. This is separate from the
// `registrations` collection (the actual visit/registration form data) —
// call this alongside submitLead() if you want registrants to also get a
// dashboard login. Never creates admin roles: those are seeded via
// scripts/create-admin.ts only.
export async function POST(request: Request) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Signup is not configured on this server yet." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.toLowerCase()?.trim();
  const password = body?.password;
  const fullName = body?.fullName ?? null;
  const company = body?.company ?? null;
  const role = body?.role === "exhibitor" ? "exhibitor" : "visitor";

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Email and a password of at least 8 characters are required." },
      { status: 400 }
    );
  }

  const db = await getDb();
  const existing = await db!.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db!.collection("users").insertOne({
    email,
    passwordHash,
    full_name: fullName,
    company,
    role,
    created_at: new Date(),
  });

  return NextResponse.json({ ok: true });
}