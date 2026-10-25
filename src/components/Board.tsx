"use client";

import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import type { CaseState, Dict } from "@/content/site";
import { BrandIcon } from "./Icons";

const CYCLE_MS = 4200;

function stateOf(i: number, active: number, n: number): CaseState {
  if (i === active) return "new";
  if (i === (active - 1 + n) % n) return "due";
  return "watching";
}

function useBogotaNow(lang: string) {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
      timeZone: "America/Bogota",
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [lang]);
  return now;
}

export default function Board({
  t,
  lang,
  actions,
}: {
  t: Dict["board"];
  lang: string;
  actions: React.ReactNode;
}) {
  const n = t.rows.length;
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const now = useBogotaNow(lang);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches || paused) return;
    // On phones only the first three rows are hung on the board, so the cycle skips the fourth.
    const id = setInterval(() => {
      const visible = window.matchMedia("(min-width: 40rem)").matches ? n : Math.min(n, 3);
      setActive((a) => (a + 1) % visible);
      setTick((k) => k + 1);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [n, paused]);

  const pick = (i: number) => {
    setActive(i);
    setTick((k) => k + 1);
    setPaused(true);
  };

  const row = t.rows[active];

  // On phones the action plaques hang between the board and the alert, so they sit inside the first screen.
  return (
    <div
      className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <section className="plaque order-1 px-5 pt-5 pb-4 sm:px-8 sm:pt-8 sm:pb-5" aria-labelledby="board-title">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-[3px] border-tinta pb-3">
          <h2 id="board-title" className="lettering text-[clamp(1.9rem,4.6vw,3.1rem)]">
            {t.title}
          </h2>
          <p className="tabular min-h-[1.6em] text-[0.95rem] font-semibold text-tinta-soft first-letter:uppercase">
            {now}
          </p>
        </div>

        <ul className="mt-1 divide-y-2 divide-dashed divide-tinta/35">
          {t.rows.map((r, i) => {
            const s = stateOf(i, active, n);
            return (
              <li key={r.radicado} className={i > 2 ? "max-sm:hidden" : undefined}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === active}
                  className="group grid w-full cursor-pointer grid-cols-1 gap-x-4 gap-y-1 py-2.5 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-3.5"
                >
                  <span className="min-w-0">
                    <span className="tabular block text-[1.02rem] font-bold tracking-tight text-tinta group-hover:underline">
                      {r.radicado}
                    </span>
                    <span className="block text-[0.93rem] leading-snug text-tinta-soft">{r.court}</span>
                  </span>
                  <span key={s === "new" ? `new-${tick}` : s} className={`tag tag-${s} justify-self-start ${s === "new" ? "hang" : ""}`}>
                    {t.states[s]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-2 border-t-[3px] border-tinta pt-3 text-[0.95rem] leading-snug text-tinta-soft sm:mt-3">
          <span className="sign-caps mr-2 inline-block rounded-[3px] bg-tinta px-1.5 py-1 text-[0.62rem] text-crema align-[0.12em]">
            {t.sample}
          </span>
          <span className="max-sm:hidden lg:hidden">{t.caption}</span>
        </p>
      </section>

      <div className="order-2 lg:order-3 lg:col-span-2">{actions}</div>

      <section className="plaque plaque-cobalto order-3 flex flex-col px-5 pt-6 pb-6 sm:px-7 sm:pt-7 lg:order-2" aria-labelledby="alert-title">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 id="alert-title" className="lettering-cream text-[clamp(1.35rem,2.6vw,1.8rem)]">
            {t.alertTitle}
          </h2>
          <span className="sign-caps rounded-[3px] bg-lamina px-1.5 py-1 text-[0.62rem] text-tinta">{t.sample}</span>
        </div>

        <div key={tick} className="brush mt-5 flex flex-1 flex-col gap-4">
          <div className="rounded-lg border-[3px] border-tinta bg-crema p-4 text-tinta shadow-[0_10px_16px_-10px_rgb(20_17_15/0.6)]">
            <p className="sign-caps flex items-center gap-2 text-[0.78rem] text-rojo-deep">
              <BrandIcon slug="whatsapp" className="size-4" />
              {t.viaWhatsapp}
            </p>
            <p className="mt-2 font-semibold leading-snug">{t.alertLead}</p>
            <p className="tabular mt-1 text-[0.98rem] font-bold">{row.radicado}</p>
            <p className="mt-2 leading-snug">{row.action}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded border-2 border-tinta px-2 py-1 text-[0.9rem] font-semibold">
              {t.alertTerm}: {row.term}
            </p>
          </div>
          <div className="rounded-lg border-[3px] border-tinta bg-crema p-4 text-tinta shadow-[0_10px_16px_-10px_rgb(20_17_15/0.6)]">
            <p className="sign-caps flex items-center gap-2 text-[0.78rem] text-rojo-deep">
              <Mail className="size-4" strokeWidth={2.5} aria-hidden="true" />
              {t.viaEmail}
            </p>
            <p className="mt-2 text-[0.95rem] leading-snug">
              <span className="font-semibold">{t.emailSubject}:</span> {t.alertLead} ·{" "}
              <span className="tabular whitespace-nowrap">{row.radicado}</span>
            </p>
          </div>
          <p className="mt-auto hidden pt-2 text-[0.95rem] leading-snug text-crema lg:block">{t.caption}</p>
        </div>
      </section>
    </div>
  );
}
