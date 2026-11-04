
import { NextResponse } from "next/server";

import { exhibitorEnquirySchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { exhibitorEnquiryAckEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  checkRateLimit,
  getClientKey,
} from "@/lib/rate-limit";
import { appendToSheet } from "@/lib/sheets";

export async function POST(request: Request) {
  const limit = checkRateLimit(
    `exhibitor-enquiry:${getClientKey(request)}`
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
  const parsed = exhibitorEnquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form details.",
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
      "[exhibitor-enquiry] reCAPTCHA failed:",
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

  const boothSize =
    data.preferredBoothSize?.trim() || "";

  const enquiryDetails = [
    `Products & Services: ${data.productsServices}`,
    `Preferred Booth Size: ${
      boothSize || "Not specified"
    }`,
  ].join("\n");

  let referenceNumber: string;

  // Primary operation: save exhibitor lead.
  try {
    const result = await submitLead(
      "exhibitor_leads",
      {
        full_name: data.contactPerson,
        company_name: data.companyName,
        designation: data.designation,
        business_email: data.businessEmail,
        phone: data.mobileNumber,
        country: data.country,

        // Existing DB columns retained.
        city: "",
        company_website: null,
        sponsorship_interest: false,

        // New fields preserved in existing message column.
        message: enquiryDetails,
        stage: "New",
      },
      "EXH"
    );

    referenceNumber = result.referenceNumber;
  } catch (error) {
    console.error(
      "[exhibitor-enquiry] Database error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to save your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }

  // Secondary operations run independently.
  const tasks = [
    {
      name: "Google Sheets",
      run: () =>
        appendToSheet("Exhibitor Form", {
          "Register As": "Exhibitor",
          "Company Name": data.companyName,
          "Contact Person": data.contactPerson,
          Designation: data.designation,
          "Email Id": data.businessEmail,
          "Mobile No.": data.mobileNumber,
          Country: data.country,
          Address: "",
          Website: "",
          "Sponsorship/Branding Opportunities Interest":
            "",
          "Products & Services": data.productsServices,
          "Preferred Booth Size":
            boothSize || "Not specified",
          Message: enquiryDetails,
        }),
    },
    {
      name: "Acknowledgement Email",
      run: () =>
        sendEmail({
          to: data.businessEmail,
          ...exhibitorEnquiryAckEmail({
            contactPerson: data.contactPerson,
            referenceNumber,
          }),
        }),
    },
    {
      name: "Admin Notification",
      run: () =>
        notifyAll({
          formName: "Exhibitor Form",
          referenceNumber,
          fields: {
            "Register As": "Exhibitor",
            "Company Name": data.companyName,
            "Contact Person": data.contactPerson,
            Designation: data.designation,
            "Email Id": data.businessEmail,
            "Mobile No.": data.mobileNumber,
            Country: data.country,
            "Products & Services":
              data.productsServices,
            "Preferred Booth Size":
              boothSize || "Not specified",
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
        `[exhibitor-enquiry] ${tasks[index].name} failed:`,
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
