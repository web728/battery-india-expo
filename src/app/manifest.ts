import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.eventName,
    short_name: siteConfig.shortName,
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#071D3A",
    theme_color: "#071D3A",
    icons: [],
  };
}
