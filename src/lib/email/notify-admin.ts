import { sendEmail } from "./send";

const ADMIN_RECIPIENTS = ["info@futurextrade.com", "admin@futurextrade.com"];

function fieldsTable(fields: Record<string, unknown>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([label, value]) => {
      const display = Array.isArray(value) ? value.join(", ") : String(value);
      return `<tr>
        <td style="padding:10px 14px; background:#F4F6F8; font-weight:bold; font-size:13px; color:#071D3A; border-bottom:1px solid #E4E7EC; width:200px; vertical-align:top;">${label}</td>
        <td style="padding:10px 14px; font-size:13px; color:#333; border-bottom:1px solid #E4E7EC; vertical-align:top;">${display}</td>
      </tr>`;
    })
    .join("");
  return `<table style="width:100%; border-collapse:collapse;">${rows}</table>`;
}

export async function notifyAdmins(params: {
  formName: string;
  referenceNumber: string;
  fields: Record<string, unknown>;
}) {
  const { formName, referenceNumber, fields } = params;

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#F4F6F8; padding:32px 0;">
    <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
      <div style="background:#071D3A; padding:24px 32px;">
        <p style="margin:0; color:#ffffff; font-size:18px; font-weight:bold;">New ${formName}</p>
        <p style="margin:4px 0 0; color:#C7CDD6; font-size:13px;">Reference: ${referenceNumber}</p>
      </div>
      <div style="padding:24px 32px;">
        ${fieldsTable(fields)}
      </div>
      <div style="padding:18px 32px; background:#F4F6F8; font-size:12px; color:#667085;">
        <p style="margin:0;">India Battery International Show 2026 — Website Notification</p>
      </div>
    </div>
  </div>`;

  const subject = `New ${formName} — ${referenceNumber}`;

  await Promise.all(
    ADMIN_RECIPIENTS.map((to) => sendEmail({ to, subject, html }))
  );
}