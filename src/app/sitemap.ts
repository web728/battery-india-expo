
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { exhibitors } from "@/lib/content/exhibitors";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   ADVANCED XML SITEMAP
   Route: /sitemap.xml

   Features:
   - Canonical absolute URLs
   - Static page discovery
   - Dynamic exhibitor profiles
   - Duplicate URL protection
   - Invalid slug filtering
   - Optional real modification dates
   - Typed Next.js sitemap metadata

   IMPORTANT:
   Do not generate fake lastModified dates.
================================================== */

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

type ChangeFrequency =
  NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;

  /**
   * Set only when the page's significant
   * content was actually updated.
   *
   * Example:
   * lastModified: "2027-02-15"
   */
  lastModified?: string;
};

/* --------------------------------------------------
   SITE URL

   Must match the canonical production domain
   configured in siteConfig.siteUrl.
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl
  .trim()
  .replace(/\/+$/, "");

/* --------------------------------------------------
   STATIC PAGE ROUTES
-------------------------------------------------- */

const STATIC_ROUTES: readonly SitemapRoute[] = [
  /* HOME */

  {
    path: "/",
    priority: 1,
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

   - Ensures leading slash
   - Removes unnecessary trailing slash
   - Avoids duplicate separators
   - Removes query and hash fragments
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

  const url = new URL(normalizedPath, SITE_URL);

  url.search = "";
  url.hash = "";

  return url.toString();
}

/* --------------------------------------------------
   OPTIONAL LAST-MODIFIED DATE

   Only include a date if it is valid and known.
-------------------------------------------------- */

function getValidLastModified(
  value?: string | null
): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();

  if (
    !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(trimmed)
  ) {
    return undefined;
  }

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  if (date.getTime() > Date.now()) {
    return undefined;
  }

  return date.toISOString();
}

/* --------------------------------------------------
   STATIC ENTRIES
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
-------------------------------------------------- */

function isValidExhibitorSlug(
  slug: unknown
): slug is string {
  if (typeof slug !== "string") {
    return false;
  }

  const normalized = slug.trim();

  return /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(
    normalized
  );
}

/* --------------------------------------------------
   DYNAMIC EXHIBITOR ENTRIES

   Existing exhibitors data is the source.
   No fictional company URLs are created.
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
       * If your exhibitor data later contains
       * a verified updatedAt / lastModified field,
       * add it here after validating its date.
       *
       * Do not automatically use the current date.
       */

      return entry;
    });
}

/* --------------------------------------------------
   URL DEDUPLICATION

   Prevents repeated <loc> entries.
-------------------------------------------------- */

function removeDuplicateUrls(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
}

/* ==================================================
   NEXT.JS SITEMAP EXPORT
================================================== */

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = getStaticEntries();

  const exhibitorEntries = getExhibitorEntries();

  return removeDuplicateUrls([
    ...staticEntries,
    ...exhibitorEntries,
  ]);
}
