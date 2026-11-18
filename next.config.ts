
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Preserving your existing production workaround.
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "indiabatteryshow.com",
      },
      {
        protocol: "https",
        hostname: "www.indiabatteryshow.com",
      },
    ],
  },
};

export default nextConfig;
