import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Kothar Cleaning Services: Clean Spaces. Healthier Lives.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-lockup.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 72px",
          color: "white",
          background: "linear-gradient(160deg, #0a5a9b 0%, #076ebb 55%, #0b467a 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Clean spaces.</div>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Healthier lives.</div>
          <div style={{ width: 220, height: 12, borderRadius: 6, background: "#f37b0b", marginTop: 26 }} />
          <div style={{ fontSize: 30, marginTop: 30, color: "#e0f0fb", lineHeight: 1.35 }}>
            Commercial, office, end of lease, disability house, glass and carpet cleaning.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            background: "white",
            borderRadius: 40,
            padding: 34,
            boxShadow: "0 30px 60px rgba(7,29,56,0.4)",
          }}
        >
          <img src={logoSrc} width={380} height={257} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
