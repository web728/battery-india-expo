import { google } from "googleapis";

// All forms write into ONE tab called "Website Enquiries" in this sheet.
// Required in .env.local:
//   GOOGLE_SHEET_ID=the-long-id-from-the-sheet-url
//   GOOGLE_SERVICE_ACCOUNT_EMAIL=xxxx@xxxx.iam.gserviceaccount.com
//   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Website Enquiries";

function isSheetsConfigured() {
  return !!(SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);
}

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function ensureHeaders(
  sheets: Awaited<ReturnType<typeof getSheetsClient>>,
  keys: string[]
): Promise<string[]> {
  const headerRange = `${SHEET_NAME}!1:1`;
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: headerRange });
  const existing: string[] = res.data.values?.[0] || [];

  if (existing.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: { values: [keys] },
    });
    return keys;
  }

  const missing = keys.filter((k) => !existing.includes(k));
  if (missing.length > 0) {
    const updated = [...existing, ...missing];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: { values: [updated] },
    });
    return updated;
  }

  return existing;
}

// fields should use human-readable labels as keys, e.g. { "Company Name": "...", "Email Id": "..." }
export async function appendToSheet(formName: string, fields: Record<string, unknown>) {
  if (!isSheetsConfigured()) {
    console.info("[sheets] not configured — skipping", formName);
    return;
  }

  try {
    const sheets = await getSheetsClient();
    const dateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });

    const allKeys = ["Date & Time", "Platform", ...Object.keys(fields)];
    const headers = await ensureHeaders(sheets, allKeys);

    const row = headers.map((h) => {
      if (h === "Date & Time") return dateTime;
      if (h === "Platform") return formName;
      const val = fields[h];
      if (val === undefined || val === null) return "";
      if (Array.isArray(val)) return val.join(", ");
      return String(val);
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.error("[sheets] append failed", error);
  }
}