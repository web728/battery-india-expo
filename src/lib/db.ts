import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { generateReferenceNumber } from "@/lib/utils";

// Inserts a document into the given Mongo collection. When MONGODB_URI is
// not configured (local development without a database yet), the
// submission is logged to the server console and a reference number is
// still generated so the UI's success/QR-code flow can be verified end to
// end before a database is connected.
export async function submitLead<T extends Record<string, unknown>>(
  table: string,
  payload: T,
  referencePrefix: string
) {
  const referenceNumber = generateReferenceNumber(referencePrefix);

  if (!isMongoConfigured()) {
    console.info(`[db:${table}] Mongo not configured — logging submission only`, {
      referenceNumber,
      ...payload,
    });
    return { referenceNumber, persisted: false };
  }

  const db = await getDb();

  try {
    await db!.collection(table).insertOne({
      ...payload,
      reference_number: referenceNumber,
      created_at: new Date(),
    });
  } catch (error) {
    console.error(`[db:${table}] insert failed`, error);
    throw new Error("Unable to save submission");
  }

  return { referenceNumber, persisted: true };
}