import { ImageResponse } from "next/og";
import { RiCodeSSlashLine } from "react-icons/ri";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#090e11",
        color: "#26d1bf",
      }}
    >
      <RiCodeSSlashLine size={110} />
    </div>,
    { ...size },
  );
}
