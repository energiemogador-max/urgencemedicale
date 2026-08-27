import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Médecin à domicile au Maroc, 24h/24 et 7j/7";

/**
 * Site-wide share card, generated at build time. Carries the three facts that
 * decide whether someone taps a link pasted into a WhatsApp thread: that a
 * doctor comes to you, that it runs around the clock, and the phone number.
 */
export default function OpengraphImage() {
  const { business } = content;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c4a2c",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
            <div
              style={{ position: "absolute", left: 19, top: 0, width: 18, height: 56, background: "#4ec08a" }}
            />
            <div
              style={{ position: "absolute", left: 0, top: 19, width: 56, height: 18, background: "#4ec08a" }}
            />
          </div>
          <div style={{ display: "flex", color: "#4ec08a", fontSize: 30, fontWeight: 700 }}>
            {business.legalName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            Un médecin chez vous,
          </div>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            jour et nuit.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 44, fontWeight: 700 }}>
            {business.phoneDisplay}
          </div>
          <div
            style={{
              display: "flex",
              color: "#0c4a2c",
              background: "#4ec08a",
              fontSize: 28,
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: 999,
            }}
          >
            {business.hoursOpen}
          </div>
        </div>
      </div>
    ),
    size
  );
}
