"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Dict } from "@/content/site";
import data from "@/data/trm.json";
import type { Analysis } from "@/lib/trm";
import { Flourish } from "./Icons";

const trm = data as unknown as Analysis & { source: string; extractedAt: string };
const CODE = "https://github.com/arthasmenetil13-ctrl/portafolio/blob/master/src/lib/trm.ts";
const PORTAL = "https://www.datos.gov.co/Econom-a-y-Finanzas/Tasa-de-Cambio-Representativa-del-Mercado-Historic/32sa-8pi3";

// Line chart geometry (viewBox units).
const LW = 1000;
const LH = 380;
const L = { l: 104, r: 20, t: 28, b: 44 };
const Y_MAX = 5500;

// Volatility bars geometry.
const BW = 1000;
const BH = 240;
const B = { l: 92, r: 12, t: 40, b: 40 };

export default function Dolar({ t, lang, home }: { t: Dict["trm"]; lang: "es" | "en"; home: string }) {
  const locale = lang === "es" ? "es-CO" : "en-US";
  const money = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "COP", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale],
  );
  const money0 = useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency: "COP", maximumFractionDigits: 0 }), [locale]);
  const pct = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2, signDisplay: "exceptZero" }), [locale]);
  const num = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const day = useMemo(() => new Intl.DateTimeFormat(locale, { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" }), [locale]);
  const month = useMemo(() => new Intl.DateTimeFormat(locale, { timeZone: "UTC", month: "long", year: "numeric" }), [locale]);
  const d = (iso: string) => day.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
  const m = (ym: string) => month.format(new Date(`${ym}-01T00:00:00Z`));

  // ---- Monthly line ----
  const months = trm.monthly;
  const n = months.length;
  const px = (i: number) => L.l + (i / (n - 1)) * (LW - L.l - L.r);
  const py = (v: number) => LH - L.b - (v / Y_MAX) * (LH - L.t - L.b);
  const path = useMemo(
    () => months.map((p, i) => `${i ? "L" : "M"}${px(i).toFixed(1)} ${py(p.avg).toFixed(1)}`).join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const yearTicks = months.flatMap((p, i) => (p.month.endsWith("-01") && Number(p.month.slice(0, 4)) % 5 === 0 ? [{ i, y: p.month.slice(0, 4) }] : []));
  const maxIdx = months.findIndex((p) => p.month === trm.allTimeMax.date.slice(0, 7));
  const minIdx = months.findIndex((p) => p.month === trm.allTimeMin.date.slice(0, 7));
  const [hover, setHover] = useState<number | null>(null);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * LW;
    const i = Math.round(((x - L.l) / (LW - L.l - L.r)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setHover((h) => Math.max(0, Math.min(n - 1, (h ?? n - 1) + (e.key === "ArrowRight" ? 1 : -1))));
  };

  // ---- Volatility bars ----
  const years = trm.years.filter((y) => y.days >= 60);
  const vMax = Math.ceil(Math.max(...years.map((y) => y.volatility)) / 5) * 5;
  const slot = (BW - B.l - B.r) / years.length;
  const bx = (i: number) => B.l + i * slot + 2;
  const bwid = slot - 4;
  const by = (v: number) => BH - B.b - (v / vMax) * (BH - B.t - B.b);
  const topVol = years.reduce((a, y) => (y.volatility > a.volatility ? y : a), years[0]);
  const [hoverYear, setHoverYear] = useState<number | null>(null);
  const shownYear = years.find((y) => y.year === hoverYear) ?? topVol;

  const plaqueTitle = "lettering text-[clamp(1.5rem,3vw,2.1rem)]";

  return (
    <div className="filete relative m-2 min-h-[calc(100dvh-1rem)] sm:m-3">
      <Flourish className="pointer-events-none absolute top-2 left-2 size-10 sm:size-14" />
      <Flourish className="pointer-events-none absolute top-2 right-2 size-10 -scale-x-100 sm:size-14" />
      <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-12 sm:px-8 sm:pt-10 lg:px-10">
        <a href={home} className="sign-caps inline-flex min-h-11 items-center gap-2 text-[0.8rem] text-cobalto hover:underline">
          <ArrowLeft className="size-4" strokeWidth={3} aria-hidden="true" />
          {t.back}
        </a>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <h1 className="lettering max-w-[14ch] text-[clamp(2.3rem,6.6vw,5rem)] text-tinta">{t.title}</h1>
            <p className="mt-5 max-w-[60ch] text-[1.15rem] leading-relaxed font-medium text-tinta-soft">{t.lead}</p>
          </div>

          {/* The casa de cambio board: the numbers a passer-by reads first. */}
          <section className="plaque px-6 pt-6 pb-5 sm:px-8" aria-labelledby="board-title">
            <h2 id="board-title" className="sign-caps border-b-[3px] border-tinta pb-2 text-[1rem] text-rojo-deep">
              {t.boardTitle}
            </h2>
            <dl className="divide-y-2 divide-dashed divide-tinta/35">
              <div className="py-3">
                <dt className="text-[0.95rem] font-semibold text-tinta-soft">
                  {t.latest} {d(trm.latest.date)}
                </dt>
                <dd className="lettering tabular mt-1 text-[clamp(2rem,4.4vw,3rem)]">{money.format(trm.latest.value)}</dd>
              </div>
              {trm.change1y !== null && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[0.95rem] font-semibold">{t.vsYear}</dt>
                  <dd className={`tag ${trm.change1y < 0 ? "tag-due" : "tag-new"} text-[0.72rem]`}>{pct.format(trm.change1y)} %</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[0.95rem] font-semibold">{t.max}</dt>
                <dd className="tabular text-right font-bold">
                  {money.format(trm.allTimeMax.value)}
                  <span className="block text-[0.85rem] font-normal text-tinta-soft">{d(trm.allTimeMax.date)}</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[0.95rem] font-semibold">{t.min}</dt>
                <dd className="tabular text-right font-bold">
                  {money.format(trm.allTimeMin.value)}
                  <span className="block text-[0.85rem] font-normal text-tinta-soft">{d(trm.allTimeMin.date)}</span>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Monthly line with a crosshair readout. */}
        <section className="plaque mt-10 px-4 pt-6 pb-5 sm:px-8" aria-labelledby="line-title">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
            <h2 id="line-title" className={plaqueTitle}>
              {t.chartTitle}
            </h2>
            <p className="tabular min-h-[1.6em] text-[1rem] font-bold first-letter:uppercase" aria-live="polite">
              {hover !== null ? `${m(months[hover].month)} · ${money.format(months[hover].avg)}` : ""}
            </p>
          </div>
          <p className="mt-1 text-[0.95rem] text-tinta-soft">{t.chartNote}</p>
          <svg
            viewBox={`0 0 ${LW} ${LH}`}
            className="chart mt-4 block h-auto w-full touch-none select-none"
            role="img"
            aria-label={`${t.chartTitle}: ${money0.format(months[0].avg)} (${m(months[0].month)}) → ${money0.format(months[n - 1].avg)} (${m(months[n - 1].month)})`}
            tabIndex={0}
            onPointerMove={onMove}
            onPointerDown={onMove}
            onPointerLeave={() => setHover(null)}
            onKeyDown={onKey}
            onBlur={() => setHover(null)}
          >
            {[1000, 2000, 3000, 4000, 5000].map((v) => (
              <g key={v}>
                <line x1={L.l} x2={LW - L.r} y1={py(v)} y2={py(v)} stroke="var(--color-tinta)" strokeOpacity="0.14" strokeWidth="1" />
                <text x={L.l - 10} y={py(v) + 5} textAnchor="end" fontSize="15" fill="var(--color-tinta-soft)" className="tabular">
                  {num.format(v)}
                </text>
              </g>
            ))}
            <line x1={L.l} x2={LW - L.r} y1={py(0)} y2={py(0)} stroke="var(--color-tinta)" strokeWidth="2" />
            {yearTicks.map(({ i, y }) => (
              <text key={y} x={px(i)} y={LH - 10} textAnchor="middle" fontSize="15" fill="var(--color-tinta-soft)" className="tabular">
                {y}
              </text>
            ))}

            <path d={path} fill="none" stroke="var(--color-cobalto)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

            {/* Direct labels on the two records only. */}
            {maxIdx >= 0 && (
              <g>
                <circle cx={px(maxIdx)} cy={py(months[maxIdx].avg)} r="6" fill="var(--color-rojo-placa)" stroke="var(--color-crema)" strokeWidth="2" />
                <text x={px(maxIdx) - 12} y={py(months[maxIdx].avg) - 12} textAnchor="end" fontSize="15" fontWeight="700" fill="var(--color-tinta)">
                  {t.max}: {money0.format(trm.allTimeMax.value)}
                  <tspan className="chart-wide"> · {d(trm.allTimeMax.date)}</tspan>
                </text>
              </g>
            )}
            {minIdx >= 0 && (
              <g>
                {/* Lifted clear of the line, which stays under 3.000 until about 2014. */}
                <line x1={px(minIdx)} x2={px(minIdx)} y1={py(months[minIdx].avg) - 8} y2={py(3400) + 8} stroke="var(--color-tinta)" strokeWidth="1.5" />
                <circle cx={px(minIdx)} cy={py(months[minIdx].avg)} r="6" fill="var(--color-rojo-placa)" stroke="var(--color-crema)" strokeWidth="2" />
                <text x={px(minIdx) - 4} y={py(3400)} fontSize="15" fontWeight="700" fill="var(--color-tinta)">
                  {t.min}: {money0.format(trm.allTimeMin.value)}
                </text>
              </g>
            )}

            {hover !== null && (
              <g pointerEvents="none">
                <line x1={px(hover)} x2={px(hover)} y1={L.t} y2={LH - L.b} stroke="var(--color-tinta)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx={px(hover)} cy={py(months[hover].avg)} r="7" fill="var(--color-cobalto)" stroke="var(--color-crema)" strokeWidth="2.5" />
              </g>
            )}
          </svg>
        </section>

        <div className="mt-8 grid gap-6">
          {/* Volatility by year. */}
          <section className="plaque px-4 pt-6 pb-5 sm:px-8" aria-labelledby="vol-title">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
              <h2 id="vol-title" className={plaqueTitle}>
                {t.volTitle}
              </h2>
              <p className="tabular text-[1rem] font-bold" aria-live="polite">
                {shownYear.year} · {pct.format(shownYear.volatility).replace("+", "")} %
              </p>
            </div>
            <p className="mt-1 text-[0.95rem] text-tinta-soft">{t.volNote}</p>
            <svg viewBox={`0 0 ${BW} ${BH}`} className="chart mt-4 block h-auto w-full" role="img" aria-label={`${t.volTitle}. ${topVol.year}: ${topVol.volatility} %`}>
              {Array.from({ length: Math.floor(vMax / 10) }, (_, k) => (k + 1) * 10).map((v) => (
                <g key={v}>
                  <line x1={B.l} x2={BW - B.r} y1={by(v)} y2={by(v)} stroke="var(--color-tinta)" strokeOpacity="0.14" />
                  <text x={B.l - 8} y={by(v) + 5} textAnchor="end" fontSize="15" fill="var(--color-tinta-soft)">
                    {v} %
                  </text>
                </g>
              ))}
              {years.map((y, i) => {
                const top = by(y.volatility);
                const h = BH - B.b - top;
                const r = Math.min(4, h / 2);
                const x = bx(i);
                const isTop = y.year === topVol.year;
                const active = y.year === hoverYear;
                return (
                  <g
                    key={y.year}
                    onPointerEnter={() => setHoverYear(y.year)}
                    onPointerLeave={() => setHoverYear(null)}
                    onFocus={() => setHoverYear(y.year)}
                    onBlur={() => setHoverYear(null)}
                    tabIndex={0}
                    role="img"
                    aria-label={`${y.year}: ${y.volatility} %`}
                    className="cursor-pointer outline-none"
                  >
                    <rect x={x - 1} y={B.t} width={bwid + 2} height={BH - B.t - B.b} fill="transparent" />
                    <path
                      d={`M${x} ${BH - B.b} V${top + r} Q${x} ${top} ${x + r} ${top} H${x + bwid - r} Q${x + bwid} ${top} ${x + bwid} ${top + r} V${BH - B.b} Z`}
                      fill={isTop ? "var(--color-rojo-placa)" : "var(--color-cobalto)"}
                      opacity={hoverYear === null || active ? 1 : 0.45}
                    />
                    {isTop && (
                      <text x={x + bwid / 2} y={top - 8} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--color-tinta)">
                        {y.year}
                      </text>
                    )}
                    {y.year % 5 === 0 && (
                      <text x={x + bwid / 2} y={BH - 8} textAnchor="middle" fontSize="15" fill="var(--color-tinta-soft)">
                        {y.year}
                      </text>
                    )}
                  </g>
                );
              })}
              <line x1={B.l} x2={BW - B.r} y1={BH - B.b} y2={BH - B.b} stroke="var(--color-tinta)" strokeWidth="2" />
            </svg>
          </section>

          {/* Biggest one-day moves. */}
          <section
            className="plaque plaque-cobalto grid gap-6 px-6 pt-6 pb-5 sm:px-8 lg:grid-cols-2 lg:gap-10"
            aria-label={`${t.risesTitle} / ${t.fallsTitle}`}
          >
            {[
              { title: t.risesTitle, list: trm.topRises, tag: "tag-new" },
              { title: t.fallsTitle, list: trm.topFalls, tag: "tag-due" },
            ].map(({ title, list, tag }) => (
              <div key={title}>
                <h2 className="sign-caps border-b-[3px] border-lamina pb-2 text-[0.95rem] text-lamina">{title}</h2>
                <ul className="divide-y-2 divide-dashed divide-crema/30">
                  {list.map((mv) => (
                    <li key={mv.date} className="flex items-center justify-between gap-3 py-2">
                      <span className="min-w-0">
                        <span className="tabular block font-bold">{d(mv.date)}</span>
                        <span className="tabular block text-[0.88rem] text-crema/90">
                          {money0.format(mv.from)} → {money0.format(mv.to)}
                        </span>
                      </span>
                      <span className={`tag ${tag} border-crema`}>{pct.format(mv.change)} %</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        {/* The table view behind the charts. */}
        <details className="plaque mt-8 px-5 py-4 sm:px-8">
          <summary className="sign-caps min-h-11 cursor-pointer content-center text-[0.95rem] text-cobalto">{t.tableTitle}</summary>
          <div className="mt-3 overflow-x-auto">
            <table className="tabular w-full min-w-[560px] text-left text-[0.95rem]">
              <thead>
                <tr className="border-b-[3px] border-tinta">
                  {Object.values(t.cols).map((c, i) => (
                    <th key={c} className={`py-2 pr-3 font-bold ${i ? "text-right" : ""}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...trm.years].reverse().map((y) => (
                  <tr key={y.year} className="border-b border-dashed border-tinta/30">
                    <td className="py-1.5 pr-3 font-bold">{y.year}</td>
                    <td className="py-1.5 pr-3 text-right">{money0.format(y.avg)}</td>
                    <td className="py-1.5 pr-3 text-right">{money0.format(y.min.value)}</td>
                    <td className="py-1.5 pr-3 text-right">{money0.format(y.max.value)}</td>
                    <td className="py-1.5 pr-3 text-right">{pct.format(y.change)} %</td>
                    <td className="py-1.5 text-right">{y.days >= 60 ? `${pct.format(y.volatility).replace("+", "")} %` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <section className="mt-8 grid gap-6 lg:grid-cols-2" aria-labelledby="how-title">
          <div className="plaque px-6 pt-7 pb-6 sm:px-8">
            <h2 id="how-title" className="sign-caps text-[1.15rem] text-rojo-deep">
              {t.howTitle}
            </h2>
            <ol className="mt-4 space-y-3 text-[1.02rem] leading-snug">
              {t.how.map((step, i) => (
                <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                  <span className="sign-caps inline-flex size-7 items-center justify-center rounded-[4px] bg-cobalto text-[0.8rem] text-crema">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="plaque plaque-rojo px-6 pt-7 pb-6 sm:px-8">
            <h2 className="lettering-cream text-[clamp(1.5rem,3vw,2.1rem)] [text-shadow:0.05em_0.05em_0_var(--color-cobalto),0.075em_0.075em_0_var(--color-tinta)]">
              {t.quality}
            </h2>
            <ul className="tabular mt-4 space-y-1.5 text-[1.02rem]">
              <li>
                <strong>{num.format(trm.quality.rawRows)}</strong> {t.rows} · <strong>{trm.quality.invalid}</strong> {t.invalidRows} ·{" "}
                <strong>{trm.quality.duplicates}</strong> {t.duplicateRows}
              </li>
              <li>
                {d(trm.quality.firstDate)} → {d(trm.quality.lastDate)}
              </li>
              <li>
                {t.gaps}: <strong>{trm.quality.longGaps.length}</strong>
                {trm.quality.longGaps.map((g) => ` (${d(g.from)} → ${d(g.to)})`)}
              </li>
              <li className="text-crema/90">
                {t.extracted} {d(trm.extractedAt)}
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={PORTAL} target="_blank" rel="noopener noreferrer" className="plaque plaque-sm sign-caps inline-flex min-h-12 items-center gap-2 px-4 text-[0.75rem] text-tinta">
                datos.gov.co
                <ArrowUpRight className="size-4" strokeWidth={3} aria-hidden="true" />
              </a>
              <a href={CODE} target="_blank" rel="noopener noreferrer" className="plaque plaque-sm sign-caps inline-flex min-h-12 items-center gap-2 px-4 text-[0.75rem] text-tinta">
                {t.code}
                <ArrowUpRight className="size-4" strokeWidth={3} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-5 text-[0.9rem] text-crema/90">
              {t.sourceLabel}. {t.disclaimer}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
