import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export type Profile = {
  id: string;
  full_name: string | null;
  role: string;
  company: string | null;
};

const adminRoles = new Set([
  "super_admin",
  "content_editor",
  "exhibitor_sales",
  "visitor_marketing",
  "conference_manager",
  "media_manager",
  "finance_viewer",
  "data_export_user",
]);

export const SESSION_COOKIE = "session";
export const JWT_SECRET = process.env.JWT_SECRET as string;

type SessionPayload = { sub: string; role: string };

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isMongoConfigured() || !JWT_SECRET) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  let payload: SessionPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    // expired / tampered token
    return null;
  }

  const db = await getDb();
  if (!db) return null;

  let user;
  try {
    user = await db.collection("users").findOne({ _id: new ObjectId(payload.sub) });
  } catch {
    return null;
  }
  if (!user) return null;

  return {
    id: user._id.toString(),
    full_name: user.full_name ?? null,
    role: user.role ?? "visitor",
    company: user.company ?? null,
  };
}

export function isAdminRole(role: string | undefined) {
  return !!role && adminRoles.has(role);
}

// Kept the old name so layout.tsx / page.tsx that import
// `isSupabaseConfigured` keep working without edits — it now checks Mongo.
export function isSupabaseConfigured() {
  return isMongoConfigured();
}