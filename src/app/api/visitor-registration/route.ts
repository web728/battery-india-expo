import { NextResponse } from "next/server";
import { visitorRegistrationSchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { visitorConfirmationEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { appendToSheet } from "@/lib/sheets"; // <-- NAYA IMPORT

export async function POST(request: Request) {
  const limit = checkRateLimit(`visitor-reg:${getClientKey(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = visitorRegistrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission", issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;

  const recaptchaOk = await verifyRecaptcha(data.recaptchaToken);
  if (!recaptchaOk) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }

  try {
    const { referenceNumber } = await submitLead(
      "registrations",
      {
        name: data.name,
        designation: data.designation,
        business_email: data.businessEmail,
        mobile_number: data.mobileNumber,
        company_name: data.companyName,
        country: data.country || null,
        state: data.state || null,
        city: data.city || null,
        company_website: data.companyWebsite || null,
        areas_of_interest: data.areasOfInterest ?? [],
        pass_type: "Trade Visitor",
      },
      "VIS"
    );

    // ---- NAYA CODE YAHA SE ----
    await appendToSheet({
      Platform: "Visitor Form",
      "Register As": "Visitor",
      "Company Name": data.companyName,
      "Contact Person": data.name,
      Designation: data.designation,
      "Email Id": data.businessEmail,
      "Mobile No.": data.mobileNumber,
      Country: data.country || "",
      Address: [data.city, data.state].filter(Boolean).join(", "),
      Website: data.companyWebsite || "",
      "Area of Interest": (data.areasOfInterest ?? []).join(", "),
    });
    // ---- NAYA CODE YAHA TAK ----

    await sendEmail({
      to: data.businessEmail,
      ...visitorConfirmationEmail({ firstName: data.name.split(" ")[0], referenceNumber }),
    });

    await notifyAll({
      formName: "Visitor Form",
      referenceNumber,
      fields: {
        "Register As": "Visitor",
        "Contact Person": data.name,
        Designation: data.designation,
        "Email Id": data.businessEmail,
        "Mobile No.": data.mobileNumber,
        "Company Name": data.companyName,
        Country: data.country || "",
        State: data.state || "",
        City: data.city || "",
        "Company Website": data.companyWebsite || "",
        "Areas of Interest": data.areasOfInterest ?? [],
      },
    });

    return NextResponse.json({ ok: true, referenceNumber });
  } catch {
    return NextResponse.json({ error: "Unable to complete registration. Please try again." }, { status: 500 });
  }
}