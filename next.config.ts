import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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