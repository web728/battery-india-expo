import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/forms";
import { submitLead } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { newsletterWelcomeEmail } from "@/lib/email/templates";
import { notifyAll } from "@/lib/notify";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = checkRateLimit(`newsletter:${getClientKey(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission", issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;

  try {
    const { referenceNumber } = await submitLead(
      "newsletter_subscribers",
      {
        name: data.name,
        business_email: data.businessEmail,
        company: data.company || null,
        interests: data.interests ?? [],
        marketing_consent: true,
      },
      "NL"
    );

    await sendEmail({
      to: data.businessEmail,
      ...newsletterWelcomeEmail({ name: data.name }),
    });

    await notifyAll({
      formName: "Newsletter Form",
      referenceNumber,
      fields: {
        "Register As": "Subscriber",
        "Contact Person": data.name,
        "Email Id": data.businessEmail,
        Company: data.company || "",
        Interests: data.interests ?? [],
      },
    });

    return NextResponse.json({ ok: true, referenceNumber });
  } catch (error) {
    console.error("Newsletter API Error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}