import { Resend } from "resend";

// Sends transactional email via Resend when RESEND_API_KEY is configured.
// Without it, the email is logged server-side so the full submission flow
// (including acknowledgement content) can still be verified in development.
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM_ADDRESS ?? "India Battery International Show <noreply@batteryindiaexpo.com>";

  if (!apiKey) {
    console.info("[email] RESEND_API_KEY not configured — logging email only", { to, subject });
    return { sent: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject, html });

  if (error) {
    console.error("[email] send failed", error);
    return { sent: false };
  }

  return { sent: true };
}
