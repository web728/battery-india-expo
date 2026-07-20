import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { contactAckEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = checkRateLimit(`contact:${getClientKey(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

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
      "contact_enquiries",
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        department: data.department,
        message: data.message,
        status: "New",
      },
      "CE"
    );

    await sendEmail({ to: data.email, ...contactAckEmail({ name: data.name, referenceNumber }) });

    await notifyAll({
      formName: "Contact Form",
      referenceNumber,
      fields: {
        "Register As": data.department,
        "Company Name": data.company || "",
        "Contact Person": data.name,
        Designation: "",
        "Email Id": data.email,
        "Mobile No.": data.phone || "",
        Interest: data.department,
        Message: data.message,
      },
    });

    return NextResponse.json({ ok: true, referenceNumber });
  } catch {
    return NextResponse.json({ error: "Unable to save your message. Please try again." }, { status: 500 });
  }
}