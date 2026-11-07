import { ImageResponse } from "next/og";
import { getProfile } from "@/data/queries";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours mirror the dark design tokens; share images are always dark.
export default async function Image() {
  const profile = await getProfile();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#090e11",
        padding: 72,
        color: "#eaf0f2",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 12,
            background: "#123530",
            color: "#26d1bf",
            fontSize: 28,
          }}
        >
          {"</>"}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9aaeb5" }}>
          {profile?.location ?? "Portfolio"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 1.05 }}>
          {profile?.name ?? "Portfolio"}
        </div>
        <div style={{ display: "flex", fontSize: 48, color: "#26d1bf" }}>
          {profile?.headline ?? ""}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#9aaeb5",
          maxWidth: 900,
        }}
      >
        {profile?.summary ?? ""}
      </div>
    </div>,
    { ...size },
  );
}
