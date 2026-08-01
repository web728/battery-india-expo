import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1";
const HEADER_ANCHOR = "Company Name"; // koi bhi header text jo hamesha header row me milega

// tab naam me space/special chars hone par range fail hota hai,
// isliye naam ko single quotes me wrap karna zaroori hai
function quotedSheetRange(range: string): string {
  return `'${SHEET_NAME}'!${range}`;
}

function getAuth() {
  const privateKey = Buffer.from(
    process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64 || "",
    "base64"
  ).toString("utf-8");

  return new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// Format matches your sheet: "July 3, 2026 20:19"
function formatDateTime(date: Date = new Date()): string {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${datePart} ${timePart}`;
}

// Exact column order of your sheet (STATUS columns chhod diye, wo manual hain)
const COLUMNS = [
  "Date & Time",
  "Platform",
  "Register As",
  "Company Name",
  "Product profile",
  "Contact Person",
  "Designation",
  "Email Id",
  "Mobile No.",
  "Booth Size Requirement",
  "Products/Services to Display",
  "Sponsorship/Branding Opportunities Interest",
  "Website",
  "Address",
  "Country",
  "Area of Interest",
  "Info. Get From",
  "Message",
  "Corrections",
] as const;

export type SheetRowData = Partial<Record<(typeof COLUMNS)[number], string>>;

type SheetsClient = ReturnType<typeof google.sheets>;

// Header row ko dhoondo — anchor text scan karke (pehli ~10 rows me)
async function findHeaderRow(sheets: SheetsClient): Promise<number> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: quotedSheetRange("A1:ZZ10"),
  });
  const rows = res.data.values || [];

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].some((cell) => String(cell).trim() === HEADER_ANCHOR)) {
      return i + 1; // 1-indexed row number
    }
  }

  // Header nahi mila to safe default: row 1 ko hi header maan lo
  return 1;
}

// Header ke baad ka pehla khali row nikaalo (append() ka table-detection
// bug avoid karne ke liye — wo kabhi kabhi top pe insert kar deta hai)
async function getNextEmptyRow(
  sheets: SheetsClient,
  dataStartRow: number
): Promise<number> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: quotedSheetRange(`A${dataStartRow}:A`),
  });
  const rows = res.data.values || [];

  let lastFilled = 0;
  rows.forEach((r, idx) => {
    if (r.some((cell) => String(cell).trim() !== "")) lastFilled = idx + 1;
  });

  return dataStartRow + lastFilled;
}

export async function appendToSheet(data: SheetRowData) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const headerRow = await findHeaderRow(sheets);
    const dataStartRow = headerRow + 1;
    const nextRow = await getNextEmptyRow(sheets, dataStartRow);

    const row = COLUMNS.map((col) => {
      if (col === "Date & Time") return formatDateTime();
      return data[col] ?? "";
    });

    // append() ki jagah update() use kar rahe — exact row number pe likhte
    // hai, isliye kabhi bhi galti se top pe insert nahi hoga
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: quotedSheetRange(`A${nextRow}`),
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
  } catch (err) {
    // Sheet fail ho bhi jaye to form submission fail nahi hona chahiye
    console.error("Google Sheets append failed:", err);
  }
}