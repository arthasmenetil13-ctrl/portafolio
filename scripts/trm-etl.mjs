// ETL for the TRM page: extract from datos.gov.co, clean, analyse, load into src/data/trm.json.
// Run with: npm run data:trm
import { mkdir, writeFile } from "node:fs/promises";
import { analyse, clean } from "../src/lib/trm.ts";

const SOURCE = "https://www.datos.gov.co/resource/32sa-8pi3.json";
const OUT = new URL("../src/data/trm.json", import.meta.url);

const url = `${SOURCE}?$limit=50000&$order=vigenciadesde%20ASC`;
const res = await fetch(url, { headers: { Accept: "application/json" } });
if (!res.ok) throw new Error(`datos.gov.co respondió ${res.status}`);
const rows = await res.json();

const { points, quality } = clean(rows);
if (quality.kept < 8000) throw new Error(`Muy pocos datos después de limpiar (${quality.kept}); no se sobrescribe el archivo.`);

const analysis = analyse(points, quality);
await mkdir(new URL("../src/data/", import.meta.url), { recursive: true });
await writeFile(
  OUT,
  JSON.stringify({ source: SOURCE, extractedAt: new Date().toISOString(), ...analysis }, null, 1) + "\n",
);

console.log(
  `TRM: ${quality.rawRows} filas, ${quality.kept} válidas, ${quality.invalid} inválidas, ${quality.duplicates} duplicadas, ` +
    `${quality.firstDate} → ${quality.lastDate}. Último valor ${analysis.latest.value} (${analysis.latest.date}).`,
);
