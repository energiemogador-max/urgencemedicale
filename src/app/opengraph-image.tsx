import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Médecin à domicile à ${content.cities.map((c) => c.name).join(", ")} — 24h/24 et 7j/7`;

/**
 * Site-wide share card, generated at build time — what a link pasted into
 * WhatsApp looks like, and WhatsApp is this market's primary channel.
 *
 * WHY IT WAS REBUILT
 *
 * It was still dark green (#0c4a2c / #4ec08a), left over from before the
 * navy-and-red identity, so every shared link showed a brand the site no
 * longer uses — while a competitor's card is a polished, on-brand photo card.
 *
 * It now carries the brand (navy, the red crescent, the red band) and the
 * facts that decide a tap, all read from the content layer so they cannot
 * drift: arrival time, cities, named doctors, the published starting price,
 * and the number. No star rating: this site has no reviews to show yet, and a
 * row of stars without them would be exactly the invented claim the brief
 * forbids.
 *
 * Satori (the renderer behind ImageResponse) needs display:flex on every
 * element with more than one child, and has no path-based SVG here — the
 * crescent is two overlapping discs.
 */
export default function OpengraphImage() {
  const { business, cities, doctors, pricing } = content;
  const NAVY = "#002454";
  const RED = "#e20102";
  const RED_ON_NAVY = "#ff6b6b";
  const MUTED = "#a9bdd4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: NAVY,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
            padding: "60px 72px 48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex", position: "relative", width: 58, height: 58 }}>
                <div
                  style={{ position: "absolute", left: 0, top: 0, width: 58, height: 58, borderRadius: 29, background: RED }}
                />
                <div
                  style={{ position: "absolute", left: 17, top: -3, width: 52, height: 52, borderRadius: 26, background: NAVY }}
                />
              </div>
              <div style={{ display: "flex", color: "#ffffff", fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>
                URGENCE MÉDICALE
              </div>
            </div>
            <div
              style={{
                display: "flex",
                background: RED,
                color: "#ffffff",
                fontSize: 26,
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 10,
              }}
            >
              24H/24 · 7J/7
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#ffffff", fontSize: 76, fontWeight: 700, lineHeight: 1.04 }}>
              Un médecin chez vous
            </div>
            <div style={{ display: "flex", color: RED_ON_NAVY, fontSize: 76, fontWeight: 700, lineHeight: 1.04 }}>
              {`en ${business.defaultResponseTimeMinutes} minutes`}
            </div>
            <div style={{ display: "flex", color: MUTED, fontSize: 28, marginTop: 22 }}>
              {cities.map((c) => c.name).join(" · ")}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", color: "#ffffff", fontSize: 56, fontWeight: 700 }}>{business.phoneDisplay}</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ display: "flex", color: "#ffffff", fontSize: 26, fontWeight: 700 }}>
                {`${doctors.length} médecins inscrits à l'Ordre`}
              </div>
              <div style={{ display: "flex", color: MUTED, fontSize: 26, marginTop: 6 }}>
                {`Consultation dès ${pricing.tiers[0]?.amountMad} ${pricing.currency}`}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", height: 12, background: RED }} />
      </div>
    ),
    size
  );
}
