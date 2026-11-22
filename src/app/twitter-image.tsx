import { ImageResponse } from "next/og";
import { SITE_CREATOR, SITE_NAME } from "@/lib/seo/site";

export const runtime = "edge";
export const alt = `${SITE_CREATOR} — ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10140f",
          color: "#eef1ea",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#37b67c",
          }}
        >
          Awais Khan
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {SITE_CREATOR}
          </div>
          <div style={{ fontSize: 30, color: "rgba(238,241,234,0.72)", maxWidth: 900 }}>
            Full-Stack Engineer shipping production Applied AI — Portfolio
          </div>
        </div>
        <div style={{ fontSize: 22, color: "rgba(238,241,234,0.5)" }}>
          awaiskhanniazi.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
