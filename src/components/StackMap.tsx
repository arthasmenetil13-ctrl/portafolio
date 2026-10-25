"use client";

import { ArrowDown, ArrowRight, CornerDownRight } from "lucide-react";
import { useState } from "react";
import type { Dict, Tech } from "@/content/site";
import { BrandIcon } from "./Icons";

// The main line the data travels, then the three services that hang off the API.
const LINE = ["source", "worker", "db", "api", "web"];
const BRANCH = ["alerts", "pay", "ai"];

export default function StackMap({ t, stack }: { t: Dict["project"]; stack: Tech[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const tech = stack.find((s) => s.id === sel) ?? null;
  const byId = Object.fromEntries(t.nodes.map((n) => [n.id, n]));

  const renderNode = (id: string) => {
    const node = byId[id];
    const lit = tech ? tech.powers.includes(id) : false;
    const quiet = tech !== null && !lit;
    return (
      <div
        key={id}
        className={`relative rounded-lg border-[3px] border-tinta px-3.5 py-3 transition-[background-color,box-shadow,transform] duration-300 ${
          lit
            ? "-translate-y-1 bg-lamina text-tinta shadow-[0_12px_18px_-10px_rgb(20_17_15/0.7)]"
            : quiet
              ? "bg-cobalto-deep text-crema/80"
              : "bg-crema text-tinta"
        }`}
      >
        <p className="sign-caps text-[0.82rem]">{node.title}</p>
        <p className="mt-1 text-[0.88rem] leading-snug">{node.detail}</p>
        {lit && (
          <span className="tag tag-new hang absolute -top-3 right-2 text-[0.6rem]">{tech!.name}</span>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {LINE.map((id, i) => (
          <div key={id} className="flex flex-col items-stretch gap-2 lg:flex-1 lg:flex-row lg:items-center">
            <div className="lg:flex-1 lg:self-stretch [&>div]:h-full">
              {renderNode(id)}
            </div>
            {i < LINE.length - 1 && (
              <span className="flex justify-center text-lamina" aria-hidden="true">
                <ArrowDown className="size-5 lg:hidden" strokeWidth={3} />
                <ArrowRight className="hidden size-5 lg:block" strokeWidth={3} />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 lg:ml-[calc(60%-1rem)] lg:mt-3">
        <p className="sign-caps flex items-center gap-2 text-[0.74rem] text-lamina">
          <CornerDownRight className="size-4" strokeWidth={3} aria-hidden="true" />
          {t.branchLabel}
        </p>
        <div className="mt-2 grid gap-2 border-l-[3px] border-dashed border-lamina pl-4 lg:grid-cols-3 lg:border-l-0 lg:border-t-[3px] lg:pt-3 lg:pl-0">
          {BRANCH.map((id) => renderNode(id))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[0.95rem] font-semibold text-crema" id="stack-hint">
          {t.mapHint}
        </p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-describedby="stack-hint">
          <button
            type="button"
            onClick={() => setSel(null)}
            aria-pressed={sel === null}
            className={`sign-caps min-h-11 cursor-pointer rounded-md border-[3px] border-tinta px-3.5 text-[0.78rem] transition-colors duration-200 ${
              sel === null ? "bg-lamina text-tinta" : "bg-crema text-tinta hover:bg-crema-deep"
            }`}
          >
            {t.mapAll}
          </button>
          {stack.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSel(sel === s.id ? null : s.id)}
              aria-pressed={sel === s.id}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-[3px] border-tinta px-3 text-[0.92rem] font-semibold transition-colors duration-200 ${
                sel === s.id ? "bg-lamina text-tinta" : "bg-crema text-tinta hover:bg-crema-deep"
              }`}
            >
              {s.icon && <BrandIcon slug={s.icon} className="size-4" />}
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
