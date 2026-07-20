export type Exhibitor = {
  slug: string;
  companyName: string;
  country: string;
  categories: string[];
  chemistry: string[];
  hall: string | null;
  standNumber: string | null;
  isStartup: boolean;
  isInternational: boolean;
  hasNewProduct: boolean;
  shortDescription: string;
  website: string | null;
};

// No exhibitor listings are published until confirmed and approved by the
// organizer. Populate this array (or the `exhibitors` table) via the admin
// CMS once bookings are confirmed.
export const exhibitors: Exhibitor[] = [];

export type Testimonial = {
  id: string;
  personName: string;
  designation: string;
  company: string;
  quote: string;
  imageUrl: string | null;
  approvalStatus: "Pending" | "Approved";
};

// No testimonials are published until approved by the named participant.
export const testimonials: Testimonial[] = [];
