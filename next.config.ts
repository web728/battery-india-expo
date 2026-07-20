import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "batteryindiaexpo.com",
      },
    ],
  },
};

export default nextConfig;