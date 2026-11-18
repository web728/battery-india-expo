
/**
 * ==================================================
 * INDIA BATTERY INTERNATIONAL SHOW
 * CENTRAL WEBSITE CONFIGURATION
 *
 * Primary Domain:
 * https://www.indiabatteryshow.com
 *
 * Old Domain:
 * https://batteryindiaexpo.com
 * (301 Redirect to Primary Domain)
 * ==================================================
 */

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

export type EventContact = {
  name: string;
  phone: string;
  email: string;
};

export type SocialLinks = {
  linkedin: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
};

/* --------------------------------------------------
   DOMAIN CONFIGURATION

   Production canonical:
   https://www.indiabatteryshow.com

   Set NEXT_PUBLIC_SITE_URL in production
   to the same canonical URL.
-------------------------------------------------- */

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim();

const DEFAULT_SITE_URL =
  "https://www.indiabatteryshow.com";

const SITE_URL = (
  configuredSiteUrl || DEFAULT_SITE_URL
).replace(/\/+$/, "");

/* --------------------------------------------------
   SITE CONFIGURATION
-------------------------------------------------- */

export const siteConfig = {
  /* -----------------------------------------------
     EVENT IDENTITY
  ----------------------------------------------- */

  eventName: "2nd India Battery International Show",

  shortName: "2nd India Battery Show",

  eventYear: 2027,

  tagline:
    "Battery Manufacturing, Technology, Energy Storage & Power Solutions",

  marketingLine:
    "Where Battery Manufacturing, Energy Storage and E-Mobility Business Meet",

  /* -----------------------------------------------
     EVENT DATES
  ----------------------------------------------- */

  dates: {
    start: "2027-10-14",

    end: "2027-10-16",

    display: "14–16 October 2027",
  },

  /* -----------------------------------------------
     VISITOR HOURS
  ----------------------------------------------- */

  visitorHours: {
    opens: "10:00",

    closes: "18:00",

    display: "10:00 AM – 6:00 PM",

    timeZone: "Asia/Kolkata",

    timeZoneLabel: "IST",

    utcOffset: "+05:30",
  },

  /* -----------------------------------------------
     EVENT VENUE
  ----------------------------------------------- */

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

  /* -----------------------------------------------
     EVENT ORGANIZER
  ----------------------------------------------- */

  organizer: {
    name: "Futurex Trade Fair & Events Pvt. Ltd.",
  },

  /* -----------------------------------------------
     WEBSITE URLS
  ----------------------------------------------- */

  siteUrl: SITE_URL,

  /* -----------------------------------------------
     SEO CONFIGURATION

     Stable IDs for JSON-LD entities.
  ----------------------------------------------- */

  seo: {
    organizationId: `${SITE_URL}/#organization`,

    websiteId: `${SITE_URL}/#website`,

    eventId: `${SITE_URL}/#event-2027`,

    venueId: `${SITE_URL}/#venue`,

    // Verify file exists in public/images.
    eventImage: "/images/batt.webp",

    // Default social sharing image.
    socialImage: "/images/batt.webp",

    // Default social image dimensions.
    socialImageWidth: 1200,

    socialImageHeight: 630,

    language: "en-IN",
  },

  /* -----------------------------------------------
     DOWNLOADABLE DOCUMENTS

     Files are stored inside public/downloads.
     Do not add public/ to their browser URLs.
  ----------------------------------------------- */

  downloads: {
    brochure: {
      title: "2027 Event Brochure",

      fileName:
        "2nd_India_International_Battery_Expo_2027_Brochure.pdf",

      url:
        "/downloads/2nd_India_International_Battery_Expo_2027_Brochure.pdf",
    },

    postShowReport: {
      title: "2026 Post Show Report",

      fileName:
        "India_Internation_Battery_Expo_2026_Post_Show_Report.pdf",

      url:
        "/downloads/India_Internation_Battery_Expo_2026_Post_Show_Report.pdf",
    },
  },

  /* -----------------------------------------------
     CO-LOCATED SHOWS
  ----------------------------------------------- */

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

  /* -----------------------------------------------
     EVENT CONTACTS
  ----------------------------------------------- */

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

  /* -----------------------------------------------
     WHATSAPP
  ----------------------------------------------- */

  whatsapp: {
    number: "919871839040",

    message:
      "Hello, I would like more information about India Battery International Show 2027.",
  },

  /* -----------------------------------------------
     SOCIAL MEDIA
  ----------------------------------------------- */

  social: {
    linkedin: null as string | null,

    twitter: null as string | null,

    facebook: null as string | null,

    instagram: null as string | null,

    youtube: null as string | null,
  } satisfies SocialLinks,
} as const;

/* --------------------------------------------------
   EDITORIAL NOTE
-------------------------------------------------- */

export const editorialNote =
  "Content marked To Be Announced, Coming Soon, Proposed, or Subject to Confirmation is managed through the admin CMS and will be updated once confirmed by the organizer.";
