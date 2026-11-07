import { ImageResponse } from "next/og";

export const alt = "Veyra — Web Development Agency in Beirut, Lebanon";
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
          background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #10b981 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4 }}>Veyra</div>
        <div style={{ fontSize: 48, fontWeight: 600, marginTop: 16 }}>
          Web Development, Web Design & SEO Agency
        </div>
        <div style={{ fontSize: 34, marginTop: 24, opacity: 0.9 }}>
          Beirut, Lebanon · veyra.website
        </div>
      </div>
    ),
    size
  );
}
