import { ArrowUpRight, Mail } from "lucide-react";
import { contact, stack, type Dict, type Entry } from "@/content/site";
import Board from "./Board";
import { BrandIcon, Flourish, LinkedInIcon } from "./Icons";
import StackMap from "./StackMap";

const plaqueLink =
  "plaque-sm inline-flex min-h-13 cursor-pointer items-center justify-center gap-2.5 px-5 py-3 text-center transition-transform duration-200 ease-[var(--ease-settle)] hover:-translate-y-0.5 active:translate-y-0";

function Hanger() {
  return (
    <svg viewBox="0 0 120 34" className="mx-auto -mb-1 block h-8 w-28 text-tinta" aria-hidden="true">
      <circle cx="60" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M57 8 22 32M63 8l35 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Ledger({ items }: { items: Entry[] }) {
  return (
    <ul className="divide-y-2 divide-dashed divide-tinta/35">
      {items.map((e) => (
        <li key={e.title} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-4 sm:gap-x-6">
          <h4 className="min-w-0 text-[1.08rem] font-bold leading-snug">{e.title}</h4>
          <p className="tabular row-span-2 text-right text-[0.95rem] font-semibold">
            {e.from} – {e.to}
            {e.length && <span className="block font-normal text-tinta-soft">{e.length}</span>}
          </p>
          <p className="col-span-2 text-[0.95rem] text-tinta-soft sm:col-span-1">{e.place}</p>
          {e.points && (
            <ul className="col-span-2 mt-1.5 space-y-1 text-[0.97rem] leading-snug">
              {e.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-rojo" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Portfolio({ t }: { t: Dict }) {
  return (
    <div className="filete relative m-2 min-h-[calc(100dvh-1rem)] sm:m-3">
      <Flourish className="pointer-events-none absolute top-2 left-2 size-10 sm:size-14" />
      <Flourish className="pointer-events-none absolute top-2 right-2 size-10 -scale-x-100 sm:size-14" />
      <Flourish className="pointer-events-none absolute bottom-2 left-2 size-10 -scale-y-100 sm:size-14" />
      <Flourish className="pointer-events-none absolute right-2 bottom-2 size-10 -scale-100 sm:size-14" />
      <div className="mx-auto max-w-[1240px] px-4 pb-10 sm:px-8 lg:px-10">
        {/* First viewport: the sign, the board at work, the plaques to act on. */}
        <header className="pt-8 sm:pt-10">
          <div className="flex items-start justify-between gap-3">
          <h1 className="lettering min-w-0 text-[clamp(2.9rem,8.6vw,6rem)] text-tinta">{t.name}</h1>
          <a
            href={t.switchHref}
            hrefLang={t.lang === "es" ? "en" : "es"}
            aria-label={t.switchAria}
            className="sign-caps inline-flex min-h-11 shrink-0 items-center rounded-md border-[3px] border-tinta bg-cobalto px-4 py-2.5 text-[0.78rem] text-crema shadow-[0_10px_16px_-10px_rgb(20_17_15/0.6)] transition-colors duration-200 hover:bg-cobalto-deep"
          >
            {t.switchLabel}
          </a>
          </div>
          <p className="sign-caps mt-4 text-[clamp(1rem,2.2vw,1.45rem)] text-cobalto">{t.role}</p>
          <p className="mt-1.5 text-[1.02rem] font-semibold text-tinta-soft">{t.place}</p>
        </header>

        <div className="mt-6 sm:mt-8">
          <Board
            t={t.board}
            lang={t.lang}
            actions={
              <nav className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" aria-label={t.lang === "es" ? "Contacto" : "Contact"}>
                <a href={`mailto:${contact.email}`} className={`plaque plaque-rojo sign-caps col-span-2 text-[0.95rem] sm:col-span-1 ${plaqueLink}`}>
                  <Mail className="size-5" strokeWidth={2.5} aria-hidden="true" />
                  {t.actions.write}
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`plaque sign-caps text-[0.85rem] ${plaqueLink}`}>
                  <LinkedInIcon />
                  {t.actions.linkedin}
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className={`plaque sign-caps text-[0.85rem] ${plaqueLink}`}>
                  <BrandIcon slug="github" />
                  {t.actions.github}
                </a>
                <a href="#proyecto" className={`plaque plaque-cobalto sign-caps col-span-2 text-[0.85rem] sm:col-span-1 ${plaqueLink}`}>
                  {t.actions.project}
                </a>
              </nav>
            }
          />
        </div>
      </div>

      {/* The project board: the one thing that is built and running. */}
      <section id="proyecto" className="scroll-mt-4 border-y-[6px] border-tinta bg-cobalto text-crema" aria-labelledby="proyecto-title">
        <div className="h-3 bg-[repeating-linear-gradient(90deg,var(--color-rojo)_0_28px,var(--color-lamina)_28px_56px)]" aria-hidden="true" />
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 id="proyecto-title" className="lettering-cream text-[clamp(2.4rem,6.4vw,4.6rem)]">
                {t.project.title}
              </h2>
              <p className="mt-6 max-w-[60ch] text-[1.15rem] leading-relaxed">{t.project.lead}</p>
              <p className="mt-5">
                <span className="tag tag-new text-[0.7rem]">{t.project.since}</span>
              </p>
              <a
                href={contact.project}
                target="_blank"
                rel="noopener noreferrer"
                className={`plaque sign-caps mt-8 text-[0.82rem] text-tinta ${plaqueLink}`}
              >
                {t.project.visit}
                <ArrowUpRight className="size-5" strokeWidth={2.75} aria-hidden="true" />
              </a>
            </div>
            <div className="plaque px-6 pt-7 pb-6 text-tinta sm:px-8">
              <h3 className="sign-caps text-[1.15rem] text-rojo-deep">{t.project.did}</h3>
              <ul className="mt-4 space-y-3 text-[1.02rem] leading-snug">
                {t.project.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-[0.45em] size-2 shrink-0 rotate-45 bg-cobalto" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="lettering-cream mt-16 text-[clamp(1.6rem,3.6vw,2.4rem)] sm:mt-20">{t.project.mapTitle}</h3>
          <div className="mt-7">
            <StackMap t={t.project} stack={stack} />
          </div>
        </div>
        <div className="h-3 bg-[repeating-linear-gradient(90deg,var(--color-rojo)_0_28px,var(--color-lamina)_28px_56px)]" aria-hidden="true" />
      </section>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-8 lg:px-10">
        {/* The workshop: next builds, hung up but not finished. */}
        <section className="pt-16 sm:pt-24" aria-labelledby="taller-title">
          <h2 id="taller-title" className="lettering text-[clamp(2.2rem,5.6vw,4rem)]">
            {t.shop.title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[1.1rem] font-medium text-tinta-soft">{t.shop.note}</p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.shop.items.map((it, i) => (
              <li key={it.title} className={i % 2 ? "lg:mt-6" : ""}>
                <Hanger />
                <div className="plaque overflow-hidden px-6 pt-7 pb-6">
                  {it.href ? (
                    <span className="tag tag-new text-[0.62rem]">{t.shop.doneBadge}</span>
                  ) : (
                    <span className="sign-caps inline-block rounded-[3px] border-2 border-tinta bg-[repeating-linear-gradient(-45deg,var(--color-lamina)_0_8px,var(--color-tinta)_8px_16px)] p-[3px] text-[0.62rem]">
                      <span className="block rounded-[2px] bg-tinta px-1.5 py-1 text-lamina">{t.shop.badge}</span>
                    </span>
                  )}
                  <h3 className="mt-4 text-[1.2rem] font-extrabold leading-snug">{it.title}</h3>
                  <p className="mt-2 leading-snug text-tinta-soft">{it.detail}</p>
                  {it.href && (
                    <a href={it.href} className={`plaque plaque-cobalto sign-caps mt-5 text-[0.8rem] ${plaqueLink}`}>
                      {t.shop.open}
                      <ArrowUpRight className="size-4" strokeWidth={3} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* The ledger: real dates, real lengths, right-aligned like measures. */}
        <section className="pt-16 sm:pt-24" aria-labelledby="historia-title">
          <h2 id="historia-title" className="lettering text-[clamp(2.2rem,5.6vw,4rem)]">
            {t.history.title}
          </h2>
          <div className="plaque mt-8 grid gap-10 px-6 pt-8 pb-7 sm:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h3 className="sign-caps border-b-[3px] border-tinta pb-2 text-[1rem] text-cobalto">{t.history.work}</h3>
              <Ledger items={t.history.workItems} />
              <h3 className="sign-caps mt-8 border-b-[3px] border-tinta pb-2 text-[1rem] text-cobalto">{t.history.study}</h3>
              <Ledger items={t.history.studyItems} />
            </div>
            <div>
              <h3 className="sign-caps border-b-[3px] border-tinta pb-2 text-[1rem] text-cobalto">{t.history.certs}</h3>
              <ul className="divide-y-2 divide-dashed divide-tinta/35">
                {t.history.certItems.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="min-w-0">
                      <span className="block font-bold leading-snug">{c.name}</span>
                      <span className="block text-[0.93rem] text-tinta-soft">{c.issuer}</span>
                    </span>
                    <span className="tabular shrink-0 text-[0.93rem] font-semibold">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The close: one big red board to answer. */}
        <section className="pt-16 pb-6 sm:pt-24" aria-labelledby="hablamos-title">
          <div className="plaque plaque-rojo px-6 pt-10 pb-9 sm:px-12 sm:pt-14 sm:pb-12">
            <Flourish className="pointer-events-none absolute top-6 right-6 hidden size-20 -scale-x-100 [--color-rojo:var(--color-lamina)] sm:block" />
            <Flourish className="pointer-events-none absolute right-6 bottom-6 hidden size-20 -scale-100 [--color-rojo:var(--color-lamina)] sm:block" />
            <h2 id="hablamos-title" className="lettering-cream text-[clamp(1.9rem,8.2vw,6rem)] [text-shadow:0.05em_0.05em_0_var(--color-cobalto),0.075em_0.075em_0_var(--color-tinta)]">
              {t.close.title}
            </h2>
            <p className="mt-5 max-w-[56ch] text-[1.15rem] leading-relaxed">{t.close.lead}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-7 inline-flex max-w-full items-center gap-2.5 [overflow-wrap:anywhere] text-[clamp(1rem,4.3vw,1.9rem)] font-extrabold underline decoration-[3px] underline-offset-[0.22em] hover:decoration-lamina"
            >
              <Mail className="size-[1.1em] shrink-0" strokeWidth={2.5} aria-hidden="true" />
              {contact.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`plaque sign-caps text-[0.85rem] text-tinta ${plaqueLink}`}>
                <LinkedInIcon />
                LinkedIn
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className={`plaque sign-caps text-[0.85rem] text-tinta ${plaqueLink}`}>
                <BrandIcon slug="github" />
                GitHub
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-[0.95rem] font-semibold text-tinta-soft">
            {t.close.footer} · {new Date().getFullYear()}
          </p>
        </section>
      </div>
    </div>
  );
}
