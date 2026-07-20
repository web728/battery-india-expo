import { notifyAdmins } from "@/lib/email/notify-admin";
import { appendToSheet } from "@/lib/google-sheets";

// Call this once from any form's route.ts after submitLead() succeeds.
// It fires off the admin emails and the Google Sheet row at the same time.
export async function notifyAll(params: {
  formName: string;
  referenceNumber: string;
  fields: Record<string, unknown>;
}) {
  await Promise.all([
    notifyAdmins(params),
    appendToSheet(params.formName, params.fields),
  ]);
}