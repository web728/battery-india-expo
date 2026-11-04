
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME =
  process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1";

const HEADER_ANCHOR = "Company Name";

type SheetValue =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined;

export type SheetRowData = Record<string, SheetValue>;

type SheetsClient = ReturnType<typeof google.sheets>;

function quotedSheetRange(range: string): string {
  const safeName = SHEET_NAME.replace(/'/g, "''");
  return `'${safeName}'!${range}`;
}

function isConfigured(): boolean {
  return Boolean(
    SPREADSHEET_ID &&
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64
  );
}

function getAuth() {
  const privateKey = Buffer.from(
    process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64 || "",
    "base64"
  ).toString("utf-8");

  return new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
}

function formatDateTime(date = new Date()): string {
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

function formatValue(value: SheetValue): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value);
}

async function findHeaderRow(
  sheets: SheetsClient
): Promise<{
  rowNumber: number;
  headers: string[];
}> {
  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: quotedSheetRange("A1:ZZ20"),
    });

  const rows = response.data.values || [];

  for (let index = 0; index < rows.length; index++) {
    const headers = (rows[index] || []).map(
      (value) => String(value).trim()
    );

    if (headers.includes(HEADER_ANCHOR)) {
      return {
        rowNumber: index + 1,
        headers,
      };
    }
  }

  throw new Error(
    `Header row not found. Expected "${HEADER_ANCHOR}" in "${SHEET_NAME}".`
  );
}

async function getNextEmptyRow(
  sheets: SheetsClient,
  dataStartRow: number
): Promise<number> {
  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: quotedSheetRange(
        `A${dataStartRow}:ZZ`
      ),
    });

  const rows = response.data.values || [];

  let lastFilledIndex = -1;

  rows.forEach((row, index) => {
    const hasData = row.some(
      (cell) => String(cell ?? "").trim() !== ""
    );

    if (hasData) {
      lastFilledIndex = index;
    }
  });

  return dataStartRow + lastFilledIndex + 1;
}

function normalizeFields(
  formName: string,
  fields: SheetRowData
): SheetRowData {
  const normalized: SheetRowData = {
    ...fields,
    Platform: formName || fields.Platform || "",
  };

  // Exhibitor form aliases.
  if (
    normalized["Contact Person"] === undefined &&
    fields.fullName !== undefined
  ) {
    normalized["Contact Person"] = fields.fullName;
  }

  if (
    normalized["Products/Services to Display"] ===
    undefined
  ) {
    normalized["Products/Services to Display"] =
      fields["Products & Services"] ??
      fields.productsServices ??
      "";
  }

  if (
    normalized["Booth Size Requirement"] === undefined
  ) {
    normalized["Booth Size Requirement"] =
      fields["Preferred Booth Size"] ??
      fields.preferredBoothSize ??
      "";
  }

  // Visitor form aliases.
  if (
    normalized["Area of Interest"] === undefined
  ) {
    normalized["Area of Interest"] =
      fields["Business / Category"] ??
      fields.businessCategory ??
      "";
  }

  return normalized;
}

// Supports both:
//
// appendToSheet({ Platform: "...", ... })
//
// appendToSheet("Visitor Form", { ... })
//
export function appendToSheet(
  data: SheetRowData
): Promise<void>;

export function appendToSheet(
  formName: string,
  fields: SheetRowData
): Promise<void>;

export async function appendToSheet(
  formNameOrData: string | SheetRowData,
  fields?: SheetRowData
): Promise<void> {
  const formName =
    typeof formNameOrData === "string"
      ? formNameOrData
      : formatValue(formNameOrData.Platform);

  const inputFields: SheetRowData =
    typeof formNameOrData === "string"
      ? fields ?? {}
      : formNameOrData;

  if (!isConfigured()) {
    console.error(
      "[sheets] Missing Google Sheets configuration."
    );
    return;
  }

  const sheets = google.sheets({
    version: "v4",
    auth: getAuth(),
  });

  const normalized = normalizeFields(
    formName,
    inputFields
  );

  try {
    const { rowNumber, headers } =
      await findHeaderRow(sheets);

    const nextRow = await getNextEmptyRow(
      sheets,
      rowNumber + 1
    );

    const newRow = headers.map((header) => {
      if (header === "Date & Time") {
        return formatDateTime();
      }

      return formatValue(normalized[header]);
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: quotedSheetRange(`A${nextRow}`),
      valueInputOption: "RAW",
      requestBody: {
        values: [newRow],
      },
    });

    console.info(
      `[sheets] Saved "${formName}" at row ${nextRow}.`
    );
  } catch (error) {
    console.error(
      `[sheets] Failed to save "${formName}":`,
      error
    );

    throw error;
  }
}
