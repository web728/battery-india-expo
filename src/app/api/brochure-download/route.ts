
import { NextResponse } from "next/server";

import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { brochureDownloadSchema } from "@/lib/validations/brochure";

import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { notifyAll } from "@/lib/notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { appendToSheet } from "@/lib/sheets";

import {
  checkRateLimit,
  getClientKey,
} from "@/lib/rate-limit";

/* ==================================================
   PRIVATE BROCHURE DOWNLOAD API

   POST /api/brochure-download

   1. Rate limit
   2. Validate request
   3. Verify reCAPTCHA
   4. Check private PDF availability
   5. Save to MongoDB
   6. Sync Google Sheets
   7. Send email notifications
   8. Return PDF for download
================================================== */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BROCHURE_FILENAME =
  "India-Battery-International-Show-2027-Brochure.pdf";

const BROCHURE_PATH = path.join(
  process.cwd(),
  "private",
  "brochure.pdf"
);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { ok: false, error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(request: Request) {
  /* RATE LIMIT */

  const limit = checkRateLimit(
    `brochure-download:${getClientKey(request)}`
  );

  if (!limit.allowed) {
    return jsonError(
      "Too many requests. Please try again shortly.",
      429
    );
  }

  /* VALIDATE DATA */

  const body = await request.json().catch(() => null);

  const parsed = brochureDownloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form details.",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  /* RECAPTCHA */

  let recaptchaOk = false;

  try {
    recaptchaOk = await verifyRecaptcha(
      data.recaptchaToken
    );
  } catch (error) {
    console.error(
      "[brochure-download] reCAPTCHA error:",
      error
    );
  }

  if (!recaptchaOk) {
    return jsonError(
      "reCAPTCHA verification failed. Please try again.",
      400
    );
  }

  /* CHECK PDF BEFORE SAVING A LEAD */

  try {
    const fileInfo = await stat(BROCHURE_PATH);

    if (!fileInfo.isFile() || fileInfo.size === 0) {
      throw new Error("Invalid brochure file.");
    }
  } catch (error) {
    console.error(
      "[brochure-download] PDF unavailable:",
      error
    );

    return jsonError(
      "The brochure is temporarily unavailable. Please contact the organizing team.",
      503
    );
  }

  /* PRIMARY OPERATION: MONGODB ATLAS */

  let referenceNumber: string;

  try {
    const result = await submitLead(
      "registrations",
      {
        name: data.name,
        company_name: data.companyName,
        designation: data.designation,
        business_email: data.businessEmail,
        mobile_number: data.mobileNumber,
        country: data.country,

        // Existing registration collection fields.
        state: null,
        city: null,
        company_website: null,

        // Identify these records separately.
        areas_of_interest: [
          "2027 Event Brochure Download",
        ],
        pass_type: "Brochure Download",
      },
      "BRO"
    );

    referenceNumber = result.referenceNumber;
  } catch (error) {
    console.error(
      "[brochure-download] MongoDB error:",
      error
    );

    return jsonError(
      "Unable to save your details. Please try again.",
      500
    );
  }

  /* EMAIL CONTENT */

  const safeName = escapeHtml(data.name);

  const emailHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#191C21;line-height:1.7">
      <div style="border-top:4px solid #C62832;padding-top:25px">
        <h1 style="font-size:24px;margin:0 0 16px">
          Brochure Download Request
        </h1>

        <p>Dear ${safeName},</p>

        <p>
          Thank you for your interest in
          India Battery International Show 2027.
          Your brochure download request has been received.
        </p>

        <p>
          <strong>Event Dates:</strong>
          14–16 October 2027
        </p>

        <p>
          <strong>Venue:</strong>
          Auto Cluster Exhibition Centre,
          Chinchwad, Pune, India
        </p>

        <p>
          <strong>Reference Number:</strong>
          ${escapeHtml(referenceNumber)}
        </p>

        <p>
          Your brochure is provided through the
          website after successful form submission.
        </p>

        <p>
          Regards,<br />
          <strong>India Battery International Show Team</strong>
        </p>
      </div>
    </div>
  `;

  /* SHEETS + EMAIL NOTIFICATIONS */

  const tasks = [
    {
      name: "Google Sheets",
      run: () =>
        appendToSheet("Visitor Form", {
          "Register As": "Brochure Download",
          "Company Name": data.companyName,
          "Contact Person": data.name,
          Designation: data.designation,
          "Email Id": data.businessEmail,
          "Mobile No.": data.mobileNumber,
          Country: data.country,
          Address: "",
          Website: "",
          "Business / Category": "Brochure Download",
          "Area of Interest": "2027 Event Brochure",
        }),
    },
    {
      name: "Confirmation Email",
      run: () =>
        sendEmail({
          to: data.businessEmail,
          subject:
            "Your Brochure Request | India Battery International Show 2027",
          html: emailHtml,
        }),
    },
    {
      name: "Admin Notification",
      run: () =>
        notifyAll({
          formName: "Brochure Download Form",
          referenceNumber,
          fields: {
            "Request Type": "Brochure Download",
            "Full Name": data.name,
            "Company Name": data.companyName,
            Designation:
              data.designation || "Not specified",
            "Business Email": data.businessEmail,
            "Mobile Number": data.mobileNumber,
            Country: data.country,
            "Requested Document": BROCHURE_FILENAME,
          },
        }),
    },
  ];

  const outcomes = await Promise.allSettled(
    tasks.map((task) => task.run())
  );

  outcomes.forEach((outcome, index) => {
    if (outcome.status === "rejected") {
      console.error(
        `[brochure-download] ${tasks[index].name} failed:`,
        outcome.reason
      );
    }
  });

  /* READ AND RETURN THE PRIVATE PDF */

  try {
    const file = await readFile(BROCHURE_PATH);

    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `attachment; filename="${BROCHURE_FILENAME}"`,
        "Content-Length": String(file.byteLength),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Brochure-Reference": referenceNumber,
      },
    });
  } catch (error) {
    console.error(
      "[brochure-download] PDF read error:",
      error
    );

    return jsonError(
      "Your request was recorded, but the brochure could not be downloaded. Please contact the organizing team with your details.",
      500
    );
  }
}
