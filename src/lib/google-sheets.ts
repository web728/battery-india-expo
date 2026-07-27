import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Website Enquiries";
const HEADER_ANCHOR = "Company Name"; // any column name that will ALWAYS be in the header row

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

// Finds the header row by scanning first ~10 rows for the anchor text
async function findHeaderRow(
  sheets: Awaited<ReturnType<typeof getSheetsClient>>
): Promise<{ rowNumber: number; headers: string[] }> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A1:ZZ10`, // scan first 10 rows only
  });
  const rows = res.data.values || [];

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].some((cell) => String(cell).trim() === HEADER_ANCHOR)) {
      return { rowNumber: i + 1, headers: rows[i] };
    }
  }
  throw new Error(`Header row not found — could not locate "${HEADER_ANCHOR}"`);
}

async function getNextEmptyRow(
  sheets: Awaited<ReturnType<typeof getSheetsClient>>,
  dataStartRow: number
): Promise<number> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A${dataStartRow}:ZZ`,
  });
  const rows = res.data.values || [];
  // find last row that actually has any non-empty cell (skip fully blank rows in between)
  let lastFilled = 0;
  rows.forEach((r, idx) => {
    if (r.some((cell) => String(cell).trim() !== "")) lastFilled = idx + 1;
  });
  return dataStartRow + lastFilled;
}

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

    const { rowNumber: headerRow, headers } = await findHeaderRow(sheets);
    const dataStartRow = headerRow + 1;
    const nextRow = await getNextEmptyRow(sheets, dataStartRow);

    const row = headers.map((h) => {
      if (h === "Date & Time") return dateTime;
      if (h === "Platform") return formName;
      const val = fields[h];
      if (val === undefined || val === null) return "";
      if (Array.isArray(val)) return val.join(", ");
      return String(val);
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${nextRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.error("[sheets] append failed", error);
  }
}