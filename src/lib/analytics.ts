// Thin wrapper around gtag/dataLayer so tracking calls are a single import
// throughout the app. Analytics only fires once GA4/GTM env vars are set
// and the user has accepted cookies (see ConsentBanner).
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const consent = window.localStorage.getItem("bie-cookie-consent");
  if (consent !== "accepted") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export const AnalyticsEvents = {
  BOOK_STAND_CLICK: "book_stand_click",
  REGISTER_VISIT_CLICK: "register_visit_click",
  BROCHURE_DOWNLOAD: "brochure_download",
  SPONSOR_ENQUIRY: "sponsor_enquiry_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  PHONE_CLICK: "phone_click",
  EMAIL_CLICK: "email_click",
  EXHIBITOR_PROFILE_VIEW: "exhibitor_profile_view",
  MEETING_REQUEST: "meeting_request_submit",
  NEWSLETTER_SUBSCRIBE: "newsletter_subscribe",
  VISITOR_REG_START: "visitor_registration_start",
  VISITOR_REG_COMPLETE: "visitor_registration_complete",
  EXHIBITOR_ENQUIRY_SUBMIT: "exhibitor_enquiry_submit",
  FORM_ABANDON: "form_abandon",
} as const;
