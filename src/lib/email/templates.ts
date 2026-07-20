import { siteConfig } from "@/lib/site-config";

function baseTemplate(heading: string, bodyHtml: string) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#F4F6F8; padding:32px 0;">
    <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden;">
      <div style="background:#071D3A; padding:24px 32px;">
        <p style="margin:0; color:#ffffff; font-size:18px; font-weight:bold;">India Battery International Show 2026</p>
        <p style="margin:4px 0 0; color:#C7CDD6; font-size:13px;">${siteConfig.dates.display} · ${siteConfig.venue.city}, ${siteConfig.venue.state}</p>
      </div>
      <div style="padding:32px;">
        <h1 style="margin:0 0 16px; font-size:20px; color:#071D3A;">${heading}</h1>
        <div style="font-size:14px; line-height:1.6; color:#333;">${bodyHtml}</div>
      </div>
      <div style="padding:20px 32px; background:#F4F6F8; font-size:12px; color:#667085;">
        <p style="margin:0;">Organised by ${siteConfig.organizer.name} · ${siteConfig.venue.full}</p>
        <p style="margin:4px 0 0;">Questions? Contact ${siteConfig.contacts[0].email}</p>
      </div>
    </div>
  </div>`;
}

export function visitorConfirmationEmail(params: { firstName: string; referenceNumber: string }) {
  return {
    subject: "Your Visitor Registration is Confirmed — India Battery International Show 2026",
    html: baseTemplate(
      `Thank you, ${params.firstName}`,
      `<p>Your registration for India Battery International Show 2026 has been received.</p>
       <p><strong>Reference number:</strong> ${params.referenceNumber}</p>
       <p>Your visitor pass with QR code is available in your <a href="${siteConfig.siteUrl}/dashboard">participant dashboard</a>. Please bring it with you (digital or printed) for quick entry.</p>
       <p>We look forward to welcoming you at the Auto Cluster Exhibition Center, ${siteConfig.venue.city}.</p>`
    ),
  };
}

export function exhibitorEnquiryAckEmail(params: { contactPerson: string; referenceNumber: string }) {
  return {
    subject: "We've Received Your Exhibitor Enquiry — India Battery International Show 2026",
    html: baseTemplate(
      `Thank you, ${params.contactPerson}`,
      `<p>Thank you for your interest in exhibiting at India Battery International Show 2026.</p>
       <p><strong>Enquiry reference:</strong> ${params.referenceNumber}</p>
       <p>A member of our exhibitor sales team will contact you shortly with stand options and rates.</p>`
    ),
  };
}

export function sponsorEnquiryAckEmail(params: { contactPerson: string; referenceNumber: string }) {
  return {
    subject: "We've Received Your Sponsorship Enquiry — India Battery International Show 2026",
    html: baseTemplate(
      `Thank you, ${params.contactPerson}`,
      `<p>Thank you for your interest in sponsorship opportunities at India Battery International Show 2026.</p>
       <p><strong>Enquiry reference:</strong> ${params.referenceNumber}</p>
       <p>Our partnerships team will be in touch with a tailored proposal.</p>`
    ),
  };
}

export function contactAckEmail(params: { name: string; referenceNumber: string }) {
  return {
    subject: "We've Received Your Message — India Battery International Show 2026",
    html: baseTemplate(
      `Thank you, ${params.name}`,
      `<p>We have received your enquiry (reference ${params.referenceNumber}) and will respond as soon as possible.</p>`
    ),
  };
}

export function newsletterWelcomeEmail(params: { name: string }) {
  return {
    subject: "You're Subscribed — India Battery International Show 2026 Updates",
    html: baseTemplate(
      `Welcome, ${params.name}`,
      `<p>You will now receive exhibitor announcements, conference updates and registration information for India Battery International Show 2026.</p>`
    ),
  };
}
