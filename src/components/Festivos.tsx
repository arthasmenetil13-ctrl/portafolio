"use client";

import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Dict } from "@/content/site";
import { addBusinessDays, easterSunday, holidays, toISO, type HolidayRule } from "@/lib/festivos";
import { Flourish } from "./Icons";

const SOURCE = "https://github.com/arthasmenetil13-ctrl/portafolio/blob/master/src/lib/festivos.ts";
const MIN_YEAR = 1984;
const MAX_YEAR = 2200;

// Same patterned tags as the HOY board: told apart by label and pattern, not colour alone.
const ruleTag: Record<HolidayRule, string> = { fijo: "tag-watching", emiliani: "tag-due", pascua: "tag-new" };

// The page is prerendered, so it opens on a fixed example instead of "today": three business days
// from 23 Dec 2026 have to jump Christmas and a weekend, which shows the whole rule at once.
const EXAMPLE_START = "2026-12-23";
const EXAMPLE_DAYS = "3";

export default function Festivos({ t, lang, home }: { t: Dict["tool"]; lang: "es" | "en"; home: string }) {
  const locale = lang === "es" ? "es-CO" : "en-US";
  const long = useMemo(
    () => new Intl.DateTimeFormat(locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    [locale],
  );
  const short = useMemo(
    () => new Intl.DateTimeFormat(locale, { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" }),
    [locale],
  );
  const fmt = (iso: string, f: Intl.DateTimeFormat) => f.format(new Date(`${iso}T00:00:00Z`));

  const [start, setStart] = useState(EXAMPLE_START);
  const [days, setDays] = useState(EXAMPLE_DAYS);
  const [year, setYear] = useState(Number(EXAMPLE_START.slice(0, 4)));

  const calc = useMemo(() => {
    const n = Number(days);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || Number(start.slice(0, 4)) < MIN_YEAR) return null;
    if (!Number.isInteger(n) || n < 0 || n > 3650) return null;
    try {
      return addBusinessDays(start, n);
    } catch {
      return null;
    }
  }, [start, days]);

  const list = useMemo(() => holidays(year), [year]);
  const easter = useMemo(() => toISO(easterSunday(year)), [year]);
  const api = `https://carlos-llanos.vercel.app/api`;

  const field =
    "mt-1.5 w-full min-h-12 rounded-md border-[3px] border-tinta bg-crema px-3 text-[1.05rem] font-semibold text-tinta tabular focus-visible:outline-lamina";

  return (
    <div className="filete relative m-2 min-h-[calc(100dvh-1rem)] sm:m-3">
      <Flourish className="pointer-events-none absolute top-2 left-2 size-10 sm:size-14" />
      <Flourish className="pointer-events-none absolute top-2 right-2 size-10 -scale-x-100 sm:size-14" />
      <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-12 sm:px-8 sm:pt-10 lg:px-10">
        <a href={home} className="sign-caps inline-flex min-h-11 items-center gap-2 text-[0.8rem] text-cobalto hover:underline">
          <ArrowLeft className="size-4" strokeWidth={3} aria-hidden="true" />
          {t.back}
        </a>
        <h1 className="lettering mt-5 max-w-[16ch] text-[clamp(2.3rem,6.6vw,5rem)] text-tinta">{t.title}</h1>
        <p className="mt-5 max-w-[62ch] text-[1.15rem] leading-relaxed font-medium text-tinta-soft">{t.lead}</p>

        <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Calculator: the deadline question a lawyer actually asks. */}
          <section className="plaque plaque-cobalto px-5 pt-7 pb-6 sm:px-8 lg:sticky lg:top-6 lg:self-start" aria-labelledby="calc-title">
            <h2 id="calc-title" className="lettering-cream text-[clamp(1.5rem,3vw,2.1rem)]">
              {t.calcTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <label className="block text-[0.95rem] font-semibold">
                {t.startLabel}
                <input type="date" value={start} min={`${MIN_YEAR}-01-01`} onChange={(e) => setStart(e.target.value)} className={field} />
              </label>
              <label className="block text-[0.95rem] font-semibold">
                {t.daysLabel}
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={3650}
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className={field}
                />
              </label>
            </div>
            <p className="mt-2 text-[0.88rem] text-crema/90">{t.countNote}</p>

            <div className="mt-5 rounded-lg border-[3px] border-tinta bg-crema p-4 text-tinta shadow-[0_10px_16px_-10px_rgb(20_17_15/0.6)]" aria-live="polite">
              {calc ? (
                <>
                  <p className="sign-caps text-[0.78rem] text-rojo-deep">{t.dueLabel}</p>
                  <p key={calc.result} className="brush mt-1 text-[clamp(1.25rem,2.6vw,1.6rem)] font-extrabold leading-tight first-letter:uppercase">
                    {fmt(calc.result, long)}
                  </p>
                  <p className="sign-caps mt-4 text-[0.72rem] text-tinta-soft">{t.skippedLabel}</p>
                  {calc.skipped.length === 0 ? (
                    <p className="mt-1.5 text-[0.95rem]">{t.noneSkipped}</p>
                  ) : (
                    <ul className="mt-2 flex max-h-44 flex-wrap gap-1.5 overflow-y-auto">
                      {calc.skipped.map((s) => (
                        <li key={s.date} className={`tag ${s.reason === "festivo" ? "tag-new" : "tag-watching"} text-[0.62rem]`}>
                          <span className="tabular font-[family-name:var(--font-body)] text-[0.78rem] font-bold tracking-normal normal-case">
                            {fmt(s.date, short)}
                          </span>
                          {s.reason === "festivo" ? (lang === "es" ? s.name : s.nameEn) : t.reasons[s.reason]}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="font-semibold">—</p>
              )}
            </div>
          </section>

          {/* Year board: the 18 holidays, each tagged with the rule that placed it. */}
          <section className="plaque px-5 pt-6 pb-5 sm:px-8" aria-labelledby="year-title">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-tinta pb-3">
              <h2 id="year-title" className="lettering text-[clamp(1.5rem,3vw,2.1rem)]">
                {t.yearTitle}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setYear((y) => Math.max(MIN_YEAR, y - 1))}
                  disabled={year <= MIN_YEAR}
                  aria-label={t.prevYear}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border-[3px] border-tinta bg-lamina hover:bg-lamina-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-5" strokeWidth={3} aria-hidden="true" />
                </button>
                <span className="sign-caps tabular min-w-[4ch] text-center text-[1.5rem]" aria-live="polite">
                  {year}
                </span>
                <button
                  type="button"
                  onClick={() => setYear((y) => Math.min(MAX_YEAR, y + 1))}
                  disabled={year >= MAX_YEAR}
                  aria-label={t.nextYear}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border-[3px] border-tinta bg-lamina hover:bg-lamina-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="size-5" strokeWidth={3} aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-[0.95rem] text-tinta-soft">
              {t.easter}: <span className="tabular font-bold text-tinta">{fmt(easter, long)}</span>
            </p>
            <ul className="mt-2 divide-y-2 divide-dashed divide-tinta/35">
              {list.map((h) => (
                <li key={h.date + h.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-2.5">
                  <span className="min-w-0">
                    <span className="tabular block text-[0.98rem] font-bold first-letter:uppercase">{fmt(h.date, short)}</span>
                    <span className="block text-[0.95rem] leading-snug">
                      {lang === "es" ? h.name : h.nameEn}
                      {h.original && (
                        <span className="text-tinta-soft">
                          {" "}
                          · {t.movedFrom} {fmt(h.original, short)}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className={`tag ${ruleTag[h.rule]}`}>{t.rules[h.rule]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2" aria-labelledby="how-title">
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
            <p className="mt-5 border-t-[3px] border-tinta pt-3 text-[0.95rem] text-tinta-soft">{t.testsNote}</p>
            <p className="mt-2 text-[0.95rem] text-tinta-soft">{t.limits}</p>
          </div>

          <div className="plaque plaque-rojo px-6 pt-7 pb-6 sm:px-8">
            <h2 className="lettering-cream text-[clamp(1.5rem,3vw,2.1rem)] [text-shadow:0.05em_0.05em_0_var(--color-cobalto),0.075em_0.075em_0_var(--color-tinta)]">
              {t.apiTitle}
            </h2>
            <p className="mt-2 text-[1.02rem]">{t.apiLead}</p>
            <div className="mt-4 space-y-3">
              {[`${api}/festivos/${year}`, `${api}/dias-habiles?desde=${start}&dias=${days || 0}`].map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border-[3px] border-tinta bg-crema px-3 py-2.5 font-mono text-[0.86rem] break-all text-tinta hover:bg-crema-deep"
                >
                  GET {url.replace("https://", "")}
                </a>
              ))}
            </div>
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="plaque plaque-sm sign-caps mt-6 inline-flex min-h-12 items-center gap-2 px-4 text-[0.8rem] text-tinta"
            >
              {t.source}
              <ArrowUpRight className="size-4" strokeWidth={3} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
