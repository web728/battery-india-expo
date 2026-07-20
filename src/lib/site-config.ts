// Central, editable source of truth for confirmed event facts.
// Update this file (or wire it to the `event_settings` table via the admin CMS)
// to change event details site-wide.

export const siteConfig = {
  eventName: "India Battery International Show 2026",
  shortName: "Battery India Expo",
  tagline:
    "Complete Platform for Advanced Batteries, Technology, Energy Storage Systems & Innovative Power Solutions",
  marketingLine:
    "Where Battery Manufacturing, Energy Storage and E-Mobility Business Meet",
  dates: {
    start: "2026-10-02",
    end: "2026-10-04",
    display: "2–4 October 2026",
  },
  venue: {
    name: "Auto Cluster Exhibition Center",
    line1: "Auto Cluster Exhibition Center",
    line2: "Chinchwad, Pimpri-Chinchwad",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    full: "Auto Cluster Exhibition Center, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra, India",
    mapQuery: "Auto Cluster Exhibition Center, Chinchwad, Pimpri-Chinchwad, Pune",
  },
  organizer: {
    name: "Futurex",
  },
 // Replace line 29:
siteUrl: (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== "")
  ? process.env.NEXT_PUBLIC_SITE_URL 
  : "https://www.batteryindiaexpo.com",
  coLocatedShows: [
    {
      name: "India EV International Show",
      slug: "india-ev-international-show",
      url: null as string | null,
    },
    {
      name: "India Solar International Show",
      slug: "india-solar-international-show",
      url: null as string | null,
    },
  ],
  contacts: [
    {
      name: "Ms. Nidhi Sharma",
      // role: "Exhibitor & Partnership Enquiries",
      phone: "+91 98718 39040",
      email: "nidhi@futurextrade.com",
    },
    {
      name: "Mr. Namit Gupta",
      // role: "Sales & General Enquiries",
      phone: "+91 9810855697",
      email: "namit@futurextrade.co",
    },
  ],
  whatsapp: {
    number: "919871839040",
    message:
      "Hello, I would like more information about India Battery International Show 2026.",
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
