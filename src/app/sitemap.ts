import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { exhibitors } from "@/lib/content/exhibitors";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/why-pune", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about/organizer", priority: 0.4, changeFrequency: "monthly" },
  { path: "/about/co-located-shows", priority: 0.5, changeFrequency: "monthly" },
  { path: "/exhibit", priority: 0.9, changeFrequency: "weekly" },
  { path: "/exhibit/categories", priority: 0.7, changeFrequency: "weekly" },
  { path: "/exhibit/book-a-stand", priority: 0.9, changeFrequency: "weekly" },
  { path: "/exhibit/sponsorship", priority: 0.8, changeFrequency: "weekly" },
  { path: "/exhibit/faqs", priority: 0.5, changeFrequency: "monthly" },
  { path: "/visit", priority: 0.9, changeFrequency: "weekly" },
  { path: "/visit/register", priority: 0.9, changeFrequency: "weekly" },
  { path: "/visit/visitor-profile", priority: 0.5, changeFrequency: "monthly" },
  { path: "/visit/guide", priority: 0.5, changeFrequency: "monthly" },
  { path: "/visit/faqs", priority: 0.5, changeFrequency: "monthly" },
  { path: "/exhibitors", priority: 0.7, changeFrequency: "weekly" },
  { path: "/venue", priority: 0.6, changeFrequency: "monthly" },
  { path: "/venue/travel", priority: 0.6, changeFrequency: "monthly" },
  { path: "/media", priority: 0.5, changeFrequency: "monthly" },
  { path: "/media/gallery", priority: 0.4, changeFrequency: "monthly" },
  { path: "/media/downloads", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/registration-terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cancellation-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const exhibitorEntries: MetadataRoute.Sitemap = exhibitors.map((exhibitor) => ({
    url: `${siteConfig.siteUrl}/exhibitors/${exhibitor.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...exhibitorEntries];
}
