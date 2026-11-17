
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bypass Next.js image optimization.
    // Fixes image loading failures caused by
    // hosting image optimization quota limits.
    unoptimized: true,

    // Preserve existing allowed remote image hosts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "batteryindiaexpo.com",
      },
      {
        protocol: "https",
        hostname: "info.batteryindiaexpo.com",
      },
      {
        protocol: "https",
        hostname: "**.batteryindiaexpo.com",
      },
    ],
  },
};

export default nextConfig;
