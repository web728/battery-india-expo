import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { JWT_SECRET, SESSION_COOKIE, isAdminRole } from "@/lib/auth";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

// This login is for the Admin CMS only. There is no separate
// visitor/exhibitor account system — registrations/enquiries are stored
// directly via submitLead() without needing a login.
export async function POST(request: Request) {
  if (!isMongoConfigured() || !JWT_SECRET) {
    return NextResponse.json({ error: "Login is not configured on this server yet." }, { status: 503 });
  }

  const rate = checkRateLimit(`login:${getClientKey(request)}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many attempts. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.toLowerCase()?.trim();
  const password = body?.password;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const db = await getDb();
  const user = await db!.collection("users").findOne({ email });

  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (!isAdminRole(user.role)) {
    return NextResponse.json({ error: "This login is for admin accounts only." }, { status: 403 });
  }

  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, JWT_SECRET, {
    expiresIn: "30d",
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}