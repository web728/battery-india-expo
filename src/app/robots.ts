
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   SITE URL
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl
  .trim()
  .replace(/\/+$/, "");

/* --------------------------------------------------
   ROBOTS.TXT
   Route: /robots.txt
-------------------------------------------------- */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        "/api/",
      ],
    },

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
