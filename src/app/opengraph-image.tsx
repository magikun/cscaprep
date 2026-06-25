import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#060f1a",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Prepify
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            lineHeight: 1.05,
            maxWidth: 960,
            color: "rgba(255,255,255,0.96)",
          }}
        >
          Ace the CSCA exam on your first try.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 900,
          }}
        >
          Real-format practice tests, study materials & analytics for math, physics & chemistry.
        </div>
      </div>
    ),
    { ...size }
  );
}
