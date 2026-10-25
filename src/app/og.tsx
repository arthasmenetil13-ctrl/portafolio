import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Lang } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

// The link card a recruiter sees on LinkedIn: the name painted on the yellow sign, one plaque with the proof.
const copy: Record<Lang, { role: string; board: string; proof: string; stack: string }> = {
  es: {
    role: "Desarrollador full stack · Sincelejo, Colombia",
    board: "Hoy se vigila",
    proof: "Estados Judiciales, en producción",
    stack: "Next.js · FastAPI · PostgreSQL · WhatsApp Cloud API",
  },
  en: {
    role: "Full stack developer · Sincelejo, Colombia",
    board: "Watching today",
    proof: "Estados Judiciales, live",
    stack: "Next.js · FastAPI · PostgreSQL · WhatsApp Cloud API",
  },
};

const YELLOW = "#f6c419";
const RED = "#d7261e";
const COBALT = "#1d3f9a";
const CREAM = "#f4ecd8";
const INK = "#14110f";

// The image renderer does not stack inset shadows, so each painted line of a frame is its own nested box.
function Ring({ color, width, radius = 0, children }: { color: string; width: number; radius?: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flex: 1, border: `${width}px solid ${color}`, borderRadius: radius }}>{children}</div>
  );
}

// Painted caps: the letters drawn three times, ink keyline, red shadow, then the face.
function Painted({ text, size, face, shadow }: { text: string; size: number; face: string; shadow: string }) {
  const off = Math.round(size * 0.05);
  const layer = (color: string, dx: number) => (
    <div style={{ position: "absolute", left: dx, top: dx, color, fontSize: size, lineHeight: 1 }}>{text}</div>
  );
  return (
    <div style={{ display: "flex", position: "relative", fontSize: size, lineHeight: 1 }}>
      {layer(INK, Math.round(off * 1.6))}
      {layer(shadow, off)}
      <div style={{ color: face, fontSize: size, lineHeight: 1 }}>{text}</div>
    </div>
  );
}

export async function renderOg(lang: Lang) {
  const bungee = await readFile(join(process.cwd(), "assets/Bungee-Regular.ttf"));
  const t = copy[lang];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: YELLOW, padding: 16, fontFamily: "Bungee" }}>
        <Ring color={RED} width={12}>
          <div style={{ display: "flex", flex: 1, padding: 8 }}>
            <Ring color={COBALT} width={5}>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "40px 56px 44px" }}>
                <Painted text="CARLOS LLANOS" size={112} face={INK} shadow={RED} />
                <div style={{ marginTop: 26, fontSize: 32, color: COBALT }}>{t.role.toUpperCase()}</div>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    background: INK,
                    borderRadius: 16,
                    padding: 5,
                    boxShadow: "0 18px 26px -12px rgba(20,17,15,0.6)",
                  }}
                >
                  <div style={{ display: "flex", flex: 1, background: CREAM, borderRadius: 12, padding: 8 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        border: `4px solid ${RED}`,
                        borderRadius: 8,
                        padding: "20px 30px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                        <Painted text={t.board.toUpperCase()} size={44} face={INK} shadow={RED} />
                        <div
                          style={{
                            fontSize: 22,
                            color: CREAM,
                            background: "#a8170f",
                            border: `3px solid ${INK}`,
                            borderRadius: 6,
                            padding: "6px 12px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t.proof.toUpperCase()}
                        </div>
                      </div>
                      <div style={{ marginTop: 16, fontSize: 24, color: "#3a3128" }}>{t.stack.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Ring>
          </div>
        </Ring>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Bungee", data: bungee, style: "normal", weight: 400 }] },
  );
}
