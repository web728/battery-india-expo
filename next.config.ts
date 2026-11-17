
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Preserve the production image 402 workaround.
    unoptimized: true,

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

  // Ensure the private brochure PDF is included
  // with the brochure download API deployment.
  outputFileTracingIncludes: {
    "/api/brochure-download": [
      "./private/brochure.pdf",
    ],
  },
};

export default nextConfig;
