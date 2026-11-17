
export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const BOOK_STAND_URL =
  "https://app.warpbay.com/LmfC1aDd";

export const REGISTER_URL =
  "https://app.warpbay.com/qPMIy6ii";

export const CONFERENCE_URL =
  "https://bharatemmsummit.com/";

export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About the Show",
        href: "/about",
      },
      {
        label: "Why Pune",
        href: "/about/why-pune",
      },
      {
        label: "About the Organizer",
        href: "/about/organizer",
      },
      {
        label: "Co-Located Shows",
        href: "/about/co-located-shows",
      },
      {
        label: "Past Participants",
        href: "/about/past-participants",
      },
    ],
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      {
        label: "Why Exhibit",
        href: "/exhibit",
      },
      {
        label: "Exhibitor Categories",
        href: "/exhibit/categories",
      },
      {
        label: "Book a Stand",
        href: "/exhibit/book-a-stand",
      },
      {
        label: "Sponsorship Opportunities",
        href: "/exhibit/sponsorship",
      },
       
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    children: [
      {
        label: "Why Visit",
        href: "/visit",
      },
      {
        label: "Visitor Registration",
        href: "/visit/register",
      },
      {
        label: "Visitor Profile",
        href: "/visit/visitor-profile",
      },
    ],
  },
  {
    label: "Media",
    href: "/media/gallery",
  },
  {
    label: "Conference",
    href: CONFERENCE_URL,
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerQuickLinks: NavLink[] = [
  {
    label: "About the Show",
    href: "/about",
  },
  {
    label: "Exhibitor Categories",
    href: "/exhibit/categories",
  }, 
  {
    label: "Visitor Profile",
    href: "/visit/visitor-profile",
  },
  {
    label: "Co-Located Shows",
    href: "/about/co-located-shows",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export const footerParticipationLinks: NavLink[] = [
  {
    label: "Book a Stand",
    href: "/exhibit/book-a-stand",
  },
  {
    label: "Register to Visit",
    href: "/visit/register",
  },
  {
    label: "Sponsorship Opportunities",
    href: "/exhibit/sponsorship",
  },
  {
    label: "Planning Your Visit",
    href: "/visit#plan-your-visit",
  },
  
  {
    label: "Conference",
    href: CONFERENCE_URL,
  },
];

export const footerLegalLinks: NavLink[] = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href);
}

export function normalizePath(path: string) {
  if (path === "/") return "/";

  return path.replace(/\/+$/, "") || "/";
}

export function isExactActive(
  pathname: string,
  href: string
) {
  if (isExternalLink(href)) return false;

  const cleanHref = href.split(/[?#]/)[0];
  return (
    normalizePath(pathname) ===
    normalizePath(cleanHref)
  );
}

export function isNavGroupActive(
  pathname: string,
  item: NavItem
) {
  if (isExternalLink(item.href)) return false;

  const parent = normalizePath(item.href);
  const current = normalizePath(pathname);

  if (parent === "/") {
    return current === "/";
  }

  return (
    current === parent ||
    current.startsWith(`${parent}/`)
  );
}
