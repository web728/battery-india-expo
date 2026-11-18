
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { exhibitors } from "@/lib/content/exhibitors";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   ADVANCED XML SITEMAP
   Route: /sitemap.xml

   FEATURES:
   - Canonical absolute URLs
   - Static page discovery
   - Dynamic exhibitor profiles
   - URL normalization
   - Duplicate URL protection
   - Strict slug validation
   - Verified lastModified support
   - Next.js typed sitemap metadata

   SEO RULES:
   - Only public indexable pages
   - No query parameters
   - No hash fragments
   - No fake modification dates
   - No duplicate canonical URLs
================================================== */

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: string;
};

/* --------------------------------------------------
   SITE CONFIGURATION
-------------------------------------------------- */

const configuredUrl = siteConfig.siteUrl.trim();

const parsedSiteUrl = new URL(configuredUrl);

if (
  !["http:", "https:"].includes(parsedSiteUrl.protocol)
) {
  throw new Error("Invalid sitemap site URL.");
}

const SITE_URL = parsedSiteUrl.origin;

/* --------------------------------------------------
   STATIC PAGE ROUTES

   Include only pages that:
   - Actually exist
   - Return HTTP 200
   - Are publicly accessible
   - Are intended for indexing
   - Have self-referencing canonical URLs
-------------------------------------------------- */

const STATIC_ROUTES: readonly SitemapRoute[] = [
  /* HOME */

  {
    path: "/",
    priority: 1.0,
    changeFrequency: "weekly",
  },

  /* ABOUT */

  {
    path: "/about",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/about/why-pune",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/about/organizer",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    path: "/about/co-located-shows",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* EXHIBIT */

  {
    path: "/exhibit",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/exhibit/categories",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/exhibit/book-a-stand",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/exhibit/sponsorship",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/exhibit/faqs",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* VISIT */

  {
    path: "/visit",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/visit/register",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/visit/visitor-profile",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/visit/guide",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/visit/faqs",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* EXHIBITORS */

  {
    path: "/exhibitors",
    priority: 0.8,
    changeFrequency: "weekly",
  },

  /* VENUE */

  {
    path: "/venue",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/venue/travel",
    priority: 0.7,
    changeFrequency: "monthly",
  },

  /* MEDIA */

  {
    path: "/media",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/media/gallery",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/media/downloads",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* CONTACT */

  {
    path: "/contact",
    priority: 0.7,
    changeFrequency: "monthly",
  },

  /* LEGAL & POLICY */

  {
    path: "/privacy-policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/registration-terms",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/cancellation-policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/cookies",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/accessibility",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

/* --------------------------------------------------
   CANONICAL URL BUILDER

   - Absolute HTTPS production URLs
   - Normalized paths
   - No duplicate slashes
   - No query parameters
   - No hash fragments
-------------------------------------------------- */

function createCanonicalUrl(path: string): string {
  const cleanedPath = path.trim();

  const withLeadingSlash = cleanedPath.startsWith("/")
    ? cleanedPath
    : `/${cleanedPath}`;

  const normalizedPath =
    withLeadingSlash === "/"
      ? "/"
      : withLeadingSlash
          .replace(/\/{2,}/g, "/")
          .replace(/\/+$/, "");

  const url = new URL(normalizedPath, `${SITE_URL}/`);

  url.search = "";
  url.hash = "";

  return url.toString();
}

/* --------------------------------------------------
   LAST MODIFIED VALIDATION

   Accept:
   - YYYY-MM-DD
   - Valid ISO 8601 datetime

   Reject:
   - Invalid dates
   - Future dates
   - Arbitrary date strings
-------------------------------------------------- */

function getValidLastModified(
  value?: string | null
): string | undefined {
  if (!value || typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

  const dateTimePattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/;

  if (
    !dateOnlyPattern.test(trimmed) &&
    !dateTimePattern.test(trimmed)
  ) {
    return undefined;
  }

  const timestamp = Date.parse(
    dateOnlyPattern.test(trimmed)
      ? `${trimmed}T00:00:00.000Z`
      : trimmed
  );

  if (Number.isNaN(timestamp)) {
    return undefined;
  }

  const date = new Date(timestamp);

  // Prevent invalid calendar dates such as February 31.
  if (dateOnlyPattern.test(trimmed)) {
    if (date.toISOString().slice(0, 10) !== trimmed) {
      return undefined;
    }
  }

  // Do not publish future modification dates.
  if (timestamp > Date.now()) {
    return undefined;
  }

  return date.toISOString();
}

/* --------------------------------------------------
   STATIC SITEMAP ENTRIES
-------------------------------------------------- */

function getStaticEntries(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: createCanonicalUrl(route.path),

      changeFrequency: route.changeFrequency,

      priority: route.priority,
    };

    const lastModified = getValidLastModified(
      route.lastModified
    );

    if (lastModified) {
      entry.lastModified = lastModified;
    }

    return entry;
  });
}

/* --------------------------------------------------
   EXHIBITOR SLUG VALIDATION

   Valid:
   - company-name
   - abc-company
   - company-123

   Invalid:
   - -company
   - company-
   - company name
   - company/name
   - company--name
-------------------------------------------------- */

function isValidExhibitorSlug(
  slug: unknown
): slug is string {
  if (typeof slug !== "string") {
    return false;
  }

  const normalized = slug.trim();

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(
    normalized
  );
}

/* --------------------------------------------------
   DYNAMIC EXHIBITOR ENTRIES

   Source: exhibitors content data

   Only valid slugs are included.
-------------------------------------------------- */

function getExhibitorEntries(): MetadataRoute.Sitemap {
  return exhibitors
    .filter((exhibitor) =>
      isValidExhibitorSlug(exhibitor.slug)
    )
    .map((exhibitor) => {
      const slug = exhibitor.slug.trim();

      const entry: MetadataRoute.Sitemap[number] = {
        url: createCanonicalUrl(
          `/exhibitors/${slug}`
        ),

        changeFrequency: "monthly",

        priority: 0.6,
      };

      /*
       * Add lastModified only when your exhibitor
       * content has a verified updatedAt field.
       *
       * Never use the current date as a substitute.
       */

      return entry;
    });
}

/* --------------------------------------------------
   DUPLICATE URL PROTECTION

   Deduplicate after canonical URL normalization.
-------------------------------------------------- */

function removeDuplicateUrls(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    const normalizedUrl = entry.url;

    if (seen.has(normalizedUrl)) {
      return false;
    }

    seen.add(normalizedUrl);

    return true;
  });
}

/* ==================================================
   NEXT.JS SITEMAP EXPORT

   Route:
   /sitemap.xml
================================================== */

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = getStaticEntries();

  const exhibitorEntries = getExhibitorEntries();

  const allEntries: MetadataRoute.Sitemap = [
    ...staticEntries,
    ...exhibitorEntries,
  ];

  return removeDuplicateUrls(allEntries);
}
