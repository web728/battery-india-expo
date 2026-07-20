// Run this from your terminal to create (or reset the password of) an admin
// login. Admin accounts are intentionally NOT created through any public
// signup form — only through this script, run by someone with server/DB
// access.
//
// Usage:
//   npx tsx scripts/create-admin.ts admin@example.com "StrongPass123!" "Admin Name" super_admin
//
// Roles available: super_admin, content_editor, exhibitor_sales,
// visitor_marketing, conference_manager, media_manager, finance_viewer,
// data_export_user

import "dotenv/config";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

async function main() {
  const [, , email, password, fullName, role] = process.argv;

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> ["Full Name"] [role]');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "battery_india_expo");

  const passwordHash = await bcrypt.hash(password, 10);

  await db.collection("users").updateOne(
    { email: email.toLowerCase() },
    {
      $set: {
        email: email.toLowerCase(),
        passwordHash,
        full_name: fullName || "Admin",
        role: role || "super_admin",
        company: null,
      },
      $setOnInsert: { created_at: new Date() },
    },
    { upsert: true }
  );

  console.log(`Admin user ready: ${email} (role: ${role || "super_admin"})`);
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});