export type AdminModule = {
  slug: string;
  title: string;
  table: string;
  description: string;
  group: "Content" | "Leads & Registrations" | "Settings";
};

export const adminModules: AdminModule[] = [
  { slug: "homepage-content", title: "Homepage Content", table: "page_content", description: "Hero, section copy and CTAs for the homepage.", group: "Content" },
  { slug: "event-settings", title: "Event Settings", table: "event_settings", description: "Dates, venue, statistics and global event fields.", group: "Settings" },
  { slug: "exhibitors", title: "Exhibitors", table: "exhibitors", description: "Exhibitor directory listings and profiles.", group: "Content" },
  { slug: "sponsors", title: "Sponsors", table: "sponsors", description: "Confirmed sponsor logos.", group: "Content" },
  { slug: "galleries", title: "Galleries", table: "gallery_items", description: "Photo gallery images and captions.", group: "Content" },
  { slug: "downloads", title: "Downloads", table: "downloads", description: "Brochure and download assets.", group: "Content" },
  { slug: "faqs", title: "FAQs", table: "faqs", description: "Exhibitor and visitor FAQ content.", group: "Content" },
  { slug: "registrations", title: "Visitor Registrations", table: "registrations", description: "Trade visitor registration submissions.", group: "Leads & Registrations" },
  { slug: "exhibitor-leads", title: "Exhibitor Leads", table: "exhibitor_leads", description: "Exhibitor enquiry pipeline and stages.", group: "Leads & Registrations" },
  { slug: "sponsor-leads", title: "Sponsor Leads", table: "sponsor_leads", description: "Sponsorship enquiry pipeline.", group: "Leads & Registrations" },
  { slug: "contact-enquiries", title: "Contact Enquiries", table: "contact_enquiries", description: "General contact form submissions.", group: "Leads & Registrations" },
  { slug: "newsletter-subscribers", title: "Newsletter Subscribers", table: "newsletter_subscribers", description: "Newsletter opt-ins.", group: "Leads & Registrations" },
  { slug: "website-statistics", title: "Website Statistics", table: "event_settings", description: "Homepage statistic cards (exhibitors, visitors).", group: "Settings" },
  { slug: "legal-pages", title: "Legal Pages", table: "page_content", description: "Privacy, terms and policy page content.", group: "Settings" },
  { slug: "seo-fields", title: "SEO Fields", table: "seo_metadata", description: "Per-page title, description and canonical URL.", group: "Settings" },
  { slug: "testimonials", title: "Testimonials", table: "testimonials", description: "Participant testimonials pending or approved for publish.", group: "Content" },
];
