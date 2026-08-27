import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the pharmacy cross on the site's deep green. Generated at build time. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c4a2c",
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 38, height: 38 }}>
          <div
            style={{
              position: "absolute",
              left: 13,
              top: 0,
              width: 12,
              height: 38,
              background: "#ffffff",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 13,
              width: 38,
              height: 12,
              background: "#ffffff",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
