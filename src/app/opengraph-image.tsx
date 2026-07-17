import { ImageResponse } from "next/og";
import { SITE_CREATOR, SITE_NAME } from "@/lib/seo/site";

export const runtime = "edge";
export const alt = `${SITE_CREATOR} — ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1025 45%, #0f172a 100%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c4b5fd",
          }}
        >
          ASKHAN
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            {SITE_CREATOR}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#cbd5e1",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            MERN Stack & Full-Stack Developer — Portfolio
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#94a3b8" }}>
          awaiskhanniazi.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
