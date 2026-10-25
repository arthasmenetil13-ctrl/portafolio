import type { Metadata, Viewport } from "next";
import { dict, siteUrl } from "@/content/site";
import { body, sign } from "../fonts";
import "../globals.css";

const t = dict.es;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: t.meta.title,
  description: t.meta.description,
  alternates: { languages: { en: "/en" } },
  openGraph: { title: t.meta.title, description: t.meta.description, locale: "es_CO", type: "website" },
};

export const viewport: Viewport = { themeColor: "#f6c419" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sign.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
