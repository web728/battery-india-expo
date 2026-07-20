import { NextResponse } from "next/server";
import { sponsorEnquirySchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { sponsorEnquiryAckEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = checkRateLimit(`sponsor-enquiry:${getClientKey(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = sponsorEnquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission", issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;

  try {
    const { referenceNumber } = await submitLead(
      "sponsor_leads",
      {
        company_name: data.companyName,
        contact_person: data.contactPerson,
        business_email: data.businessEmail,
        phone: data.phone,
        package_interest: data.packageInterest,
        message: data.message || null,
        stage: "New",
      },
      "SPN"
    );

    await sendEmail({
      to: data.businessEmail,
      ...sponsorEnquiryAckEmail({ contactPerson: data.contactPerson, referenceNumber }),
    });

    await notifyAll({
      formName: "Sponsor Form",
      referenceNumber,
      fields: {
        "Register As": "Sponsor",
        "Company Name": data.companyName,
        "Contact Person": data.contactPerson,
        "Email Id": data.businessEmail,
        "Mobile No.": data.phone,
        "Package Interest": data.packageInterest,
        Message: data.message || "",
      },
    });

    return NextResponse.json({ ok: true, referenceNumber });
  } catch {
    return NextResponse.json({ error: "Unable to submit your enquiry. Please try again." }, { status: 500 });
  }
}