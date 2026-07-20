import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = siteConfig.eventName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#031224",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(54,201,107,0.25), transparent 45%), radial-gradient(circle at 85% 10%, rgba(237,28,36,0.25), transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 12,
              backgroundColor: "#ED1C24",
              color: "white",
              fontSize: 34,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", color: "#36C96B", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
            {siteConfig.dates.display.toUpperCase()} · {siteConfig.venue.city.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", color: "white", fontSize: 58, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {siteConfig.eventName}
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.75)", fontSize: 28, marginTop: 24, maxWidth: 900 }}>
          {siteConfig.marketingLine}
        </div>
      </div>
    ),
    { ...size }
  );
}
