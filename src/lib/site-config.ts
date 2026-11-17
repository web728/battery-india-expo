
/**
 * INDIA BATTERY INTERNATIONAL SHOW
 * Central website configuration
 */

export type EventContact = {
  name: string;
  phone: string;
  email: string;
};

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim();

const SITE_URL = (
  configuredSiteUrl ||
  "https://www.indiabatteryshow.com"
).replace(/\/+$/, "");

export const siteConfig = {
  eventName: "2nd India Battery International Show",

  shortName: "2nd India Battery Show",

  eventYear: 2027,

  tagline:
    "Battery Manufacturing, Technology, Energy Storage & Power Solutions",

  marketingLine:
    "Where Battery Manufacturing, Energy Storage and E-Mobility Business Meet",

  dates: {
    start: "2027-10-14",
    end: "2027-10-16",
    display: "14–16 October 2027",
  },

  visitorHours: {
    opens: "10:00",
    closes: "18:00",
    display: "10:00 AM – 6:00 PM",
    timeZone: "Asia/Kolkata",
    timeZoneLabel: "IST",
    utcOffset: "+05:30",
  },

  venue: {
    name: "Auto Cluster Exhibition Centre",

    line1: "Auto Cluster Exhibition Centre",
    line2: "Chinchwad, Pimpri-Chinchwad",

    city: "Pune",
    state: "Maharashtra",
    country: "India",

    full:
      "Auto Cluster Exhibition Centre, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra, India",

    mapQuery:
      "Auto Cluster Exhibition Centre, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra, India",
  },

  organizer: {
    name: "Futurex Trade Fair & Events Pvt. Ltd.",
  },

  siteUrl: SITE_URL,

  // Stable canonical IDs for structured data.
  seo: {
    organizationId: `${SITE_URL}/#organization`,
    websiteId: `${SITE_URL}/#website`,
    eventId: `${SITE_URL}/#event-2027`,
    venueId: `${SITE_URL}/#venue`,

    // Verify that this file exists in public/images.
    eventImage: "/images/batt.webp",
  },

  coLocatedShows: [
    {
      name: "India International EV Show",
      slug: "india-EV-international-show",
      url: null as string | null,
    },
    {
      name: "India International Solar Show",
      slug: "india-solar-international-show",
      url: null as string | null,
    },
  ],

  contacts: [
    {
      name: "Mr. Namit Gupta",
      phone: "+91 9810855697",
      email: "namit@futurextrade.co",
    },
    {
      name: "Ms. Nidhi Sharma",
      phone: "+91 98718 39040",
      email: "nidhi@futurextrade.com",
    },
  ] satisfies EventContact[],

  whatsapp: {
    number: "919871839040",

    message:
      "Hello, I would like more information about India Battery International Show 2027.",
  },

  social: {
    linkedin: null as string | null,
    twitter: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },
} as const;

export const editorialNote =
  "Content marked To Be Announced, Coming Soon, Proposed, or Subject to Confirmation is managed through the admin CMS and will be updated once confirmed by the organizer.";
