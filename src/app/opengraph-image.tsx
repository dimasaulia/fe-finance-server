import { ImageResponse } from "next/og";

export const alt = "FinApp — Personal Finance Workspace";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          background: "#071a15",
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 48,
            background: "#052e22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 150,
              height: 108,
              borderRadius: 24,
              background: "#10b981",
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -6,
                top: 30,
                width: 60,
                height: 48,
                borderRadius: 14,
                background: "#052e22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: "#10b981",
                  display: "flex",
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#f0fdf4",
            }}
          >
            FinApp
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#6ee7b7",
            }}
          >
            Personal Finance Workspace
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
