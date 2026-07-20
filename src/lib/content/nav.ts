export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About the Show", href: "/about" },
      { label: "Why Pune", href: "/about/why-pune" },
      { label: "About the Organizer", href: "/about/organizer" },
      { label: "Co-Located Shows", href: "/about/co-located-shows" },
    ],
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      { label: "Why Exhibit", href: "/exhibit" },
      { label: "Exhibitor Categories", href: "/exhibit/categories" },
      { label: "Book a Stand", href: "/exhibit/book-a-stand" },
      { label: "Sponsorship Opportunities", href: "/exhibit/sponsorship" },
      { label: "Exhibitor FAQs", href: "/exhibit/faqs" },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    children: [
      { label: "Why Visit", href: "/visit" },
      { label: "Visitor Registration", href: "/visit/register" },
      { label: "Visitor Profile", href: "/visit/visitor-profile" },
      { label: "Visitor Guide", href: "/visit/guide" },
      { label: "Visitor FAQs", href: "/visit/faqs" },
    ],
  },
  {
    label: "Media",
    href: "/media/gallery",
    // children: [
    //   { label: "Media Centre", href: "/media" },
    //   { label: "Photo Gallery", href: "/media/gallery" },
    // ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Registration Terms", href: "/registration-terms" },
  { label: "Cancellation & Refund Policy", href: "/cancellation-policy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Accessibility Statement", href: "/accessibility" },
];

export const footerQuickLinks = [
  { label: "Book a Stand", href: "/exhibit/book-a-stand" },
  { label: "Register to Visit", href: "/visit/register" },
  { label: "Sponsorship", href: "/exhibit/sponsorship" },
  { label: "Exhibitor Directory", href: "/exhibitors" },
  { label: "Media Centre", href: "/media" },
  { label: "Contact Us", href: "/contact" },
  { label: "Participant Login", href: "/login" },
];
