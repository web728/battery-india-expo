
import { NextResponse } from "next/server";

import { visitorRegistrationSchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { visitorConfirmationEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  checkRateLimit,
  getClientKey,
} from "@/lib/rate-limit";
import { appendToSheet } from "@/lib/sheets";

export async function POST(request: Request) {
  const limit = checkRateLimit(
    `visitor-reg:${getClientKey(request)}`
  );

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Too many requests. Please try again shortly.",
      },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = visitorRegistrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the registration details.",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  let recaptchaOk = false;

  try {
    recaptchaOk = await verifyRecaptcha(
      data.recaptchaToken
    );
  } catch (error) {
    console.error(
      "[visitor-registration] reCAPTCHA failed:",
      error
    );
  }

  if (!recaptchaOk) {
    return NextResponse.json(
      {
        error:
          "reCAPTCHA verification failed. Please try again.",
      },
      { status: 400 }
    );
  }

  const category =
    data.businessCategory?.trim() || "";

  let referenceNumber: string;

  // Primary operation: save visitor registration.
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

        // Retain existing database columns.
        state: null,
        city: null,
        company_website: null,

        // Optional Business / Category.
        areas_of_interest: category
          ? [category]
          : [],

        pass_type: "Trade Visitor",
      },
      "VIS"
    );

    referenceNumber = result.referenceNumber;
  } catch (error) {
    console.error(
      "[visitor-registration] Database error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to save your registration. Please try again.",
      },
      { status: 500 }
    );
  }

  const tasks = [
    {
      name: "Google Sheets",
      run: () =>
        appendToSheet("Visitor Form", {
          "Register As": "Visitor",
          "Company Name": data.companyName,
          "Contact Person": data.name,
          Designation: data.designation,
          "Email Id": data.businessEmail,
          "Mobile No.": data.mobileNumber,
          Country: data.country,
          Address: "",
          Website: "",
          "Business / Category": category,
          "Area of Interest": category,
        }),
    },
    {
      name: "Confirmation Email",
      run: () =>
        sendEmail({
          to: data.businessEmail,
          ...visitorConfirmationEmail({
            firstName:
              data.name.trim().split(/\s+/)[0] ||
              data.name,
            referenceNumber,
          }),
        }),
    },
    {
      name: "Admin Notification",
      run: () =>
        notifyAll({
          formName: "Visitor Form",
          referenceNumber,
          fields: {
            "Register As": "Visitor",
            "Full Name": data.name,
            "Company / Organisation":
              data.companyName,
            Designation: data.designation,
            "Mobile / WhatsApp":
              data.mobileNumber,
            "Email Id": data.businessEmail,
            "Business / Category":
              category || "Not specified",
            Country: data.country,
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
        `[visitor-registration] ${tasks[index].name} failed:`,
        outcome.reason
      );
    }
  });

  return NextResponse.json(
    {
      ok: true,
      referenceNumber,
    },
    { status: 200 }
  );
}
