import { NextResponse } from "next/server";
import { exhibitorEnquirySchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { exhibitorEnquiryAckEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = checkRateLimit(`exhibitor-enquiry:${getClientKey(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = exhibitorEnquirySchema.safeParse(body);

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
      "exhibitor_leads",
      {
        full_name: data.fullName,
        company_name: data.companyName,
        designation: data.designation,
        business_email: data.businessEmail,
        phone: data.phone,
        country: data.country,
        city: data.city,
        company_website: data.companyWebsite || null,
        sponsorship_interest: !!data.sponsorshipInterest,
        message: data.message || null,
        stage: "New",
      },
      "EXH"
    );

    await sendEmail({
      to: data.businessEmail,
      ...exhibitorEnquiryAckEmail({ contactPerson: data.fullName, referenceNumber }),
    });

    await notifyAll({
      formName: "Exhibitor Form",
      referenceNumber,
      fields: {
        "Register As": "Exhibitor",
        "Company Name": data.companyName,
        "Full Name": data.fullName,
        Designation: data.designation,
        "Email Id": data.businessEmail,
        "Mobile No.": data.phone,
        Country: data.country,
        City: data.city,
        "Website URL": data.companyWebsite || "",
        "Sponsorship Interest": data.sponsorshipInterest ? "Yes" : "No",
        Message: data.message || "",
      },
    });

    return NextResponse.json({ ok: true, referenceNumber });
  } catch {
    return NextResponse.json({ error: "Unable to submit your enquiry. Please try again." }, { status: 500 });
  }
}