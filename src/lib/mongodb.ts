import { MongoClient } from "mongodb";

// Set these in .env.local (see .env.example):
//   MONGODB_URI=mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/
//   MONGODB_DB=battery_india_expo
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "battery_india_expo";

let clientPromise: Promise<MongoClient> | null = null;

export function isMongoConfigured() {
  return !!uri;
}

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (clientPromise) return clientPromise;

  if (process.env.NODE_ENV === "development") {
    // Reuse the same client across Next.js hot-reloads in dev so we don't
    // open a new connection pool on every file save.
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

// Returns null when MONGODB_URI isn't set, so the site keeps working (forms
// fall back to a "logged but not persisted" flow) before a database is
// connected — same fallback behaviour the old Supabase helpers had.
export async function getDb() {
  const promise = getClientPromise();
  if (!promise) return null;
  const client = await promise;
  return client.db(dbName);
}