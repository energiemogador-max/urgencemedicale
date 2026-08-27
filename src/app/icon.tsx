import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: the green crescent — Morocco's pharmacy/health symbol, not the
 * European cross. Satori (which renders this) has no SVG path support, so
 * the crescent is carved by laying a background-coloured disc over a white
 * one rather than drawn as a path.
 */
export default function Icon() {
  const green = "#0c4a2c";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: green,
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 40, height: 40 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 40,
              height: 40,
              borderRadius: 20,
              background: "#ffffff",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 13,
              top: -4,
              width: 38,
              height: 38,
              borderRadius: 19,
              background: green,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
