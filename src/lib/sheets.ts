import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1";

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

export async function appendToSheet(data: SheetRowData) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const row = COLUMNS.map((col) => {
      if (col === "Date & Time") return formatDateTime();
      return data[col] ?? "";
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });
  } catch (err) {
    // Sheet fail ho bhi jaye to form submission fail nahi hona chahiye
    console.error("Google Sheets append failed:", err);
  }
}