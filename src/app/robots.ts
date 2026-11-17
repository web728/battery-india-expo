
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const SITE_URL = siteConfig.siteUrl
  .trim()
  .replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
