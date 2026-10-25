import { Archivo, Bungee } from "next/font/google";

// Bungee was drawn for street signage; it carries the painted block caps.
export const sign = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

// Archivo (Omnibus Type, Buenos Aires) is the reading face; wdth gives the condensed data columns.
export const body = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
