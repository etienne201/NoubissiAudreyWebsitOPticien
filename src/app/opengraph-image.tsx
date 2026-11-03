import { ImageResponse } from "next/og";

export const alt = "Audrey Noubissi, opticienne-lunetière à Douala";
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
          padding: 90,
          background: "#0E1B33",
          color: "#F7F5F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              border: "8px solid #F7F5F0",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              border: "8px solid #F7F5F0",
              marginLeft: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: "#C9A96E",
                display: "flex",
              }}
            />
          </div>
        </div>
        <div style={{ fontSize: 80, fontWeight: 600, display: "flex" }}>
          Audrey Noubissi
        </div>
        <div style={{ fontSize: 38, color: "#C9A96E", marginTop: 14, display: "flex" }}>
          Opticienne-Lunetière à Douala • 3+ ans d&apos;expérience
        </div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 26, display: "flex" }}>
          Bilan visuel, visagisme, montures & verres de précision.
        </div>
      </div>
    ),
    size
  );
}
