// Analysis of the official Colombian exchange rate (TRM, pesos per US dollar).
//
// Input rows come from datos.gov.co (dataset 32sa-8pi3): one value per publication,
// valid from `vigenciadesde` to `vigenciahasta` (a Friday value usually covers the weekend).
// Everything here is pure so the ETL script and the tests share one implementation.

export type RawRow = { valor?: string; unidad?: string; vigenciadesde?: string; vigenciahasta?: string };

export type Point = { date: string; value: number };

export type Quality = {
  rawRows: number;
  kept: number;
  invalid: number;
  duplicates: number;
  firstDate: string;
  lastDate: string;
  // Gaps between consecutive publications longer than 5 calendar days.
  longGaps: { from: string; to: string; days: number }[];
};

export type YearStat = {
  year: number;
  avg: number;
  min: Point;
  max: Point;
  first: number;
  last: number;
  change: number; // % from the first to the last value of the year
  volatility: number; // annualised std dev of daily log returns, in %
  days: number;
};

export type Move = { date: string; from: number; to: number; change: number };

export type Analysis = {
  quality: Quality;
  latest: Point;
  allTimeMax: Point;
  allTimeMin: Point;
  monthly: { month: string; avg: number }[];
  years: YearStat[];
  topRises: Move[];
  topFalls: Move[];
  change1y: number | null;
};

const DAY = 86_400_000;
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

// Clean: valid COP values, one point per start date (last publication wins), sorted by date.
export function clean(rows: RawRow[]): { points: Point[]; quality: Quality } {
  let invalid = 0;
  const byDate = new Map<string, number>();
  let duplicates = 0;
  for (const r of rows) {
    const value = Number(r.valor);
    const date = (r.vigenciadesde ?? "").slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(value) || value <= 0 || (r.unidad && r.unidad !== "COP")) {
      invalid++;
      continue;
    }
    if (byDate.has(date)) duplicates++;
    byDate.set(date, value);
  }
  const points = [...byDate.entries()]
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const longGaps: Quality["longGaps"] = [];
  for (let i = 1; i < points.length; i++) {
    const days = (Date.parse(points[i].date) - Date.parse(points[i - 1].date)) / DAY;
    if (days > 5) longGaps.push({ from: points[i - 1].date, to: points[i].date, days });
  }

  return {
    points,
    quality: {
      rawRows: rows.length,
      kept: points.length,
      invalid,
      duplicates,
      firstDate: points[0]?.date ?? "",
      lastDate: points.at(-1)?.date ?? "",
      longGaps,
    },
  };
}

function stdDev(xs: number[]): number {
  if (xs.length < 2) return 0;
  const mean = xs.reduce((s, x) => s + x, 0) / xs.length;
  return Math.sqrt(xs.reduce((s, x) => s + (x - mean) ** 2, 0) / (xs.length - 1));
}

export function analyse(points: Point[], quality: Quality, topN = 5): Analysis {
  if (points.length < 2) throw new Error("Se necesitan al menos dos valores para analizar la serie.");

  let allTimeMax = points[0];
  let allTimeMin = points[0];
  for (const p of points) {
    if (p.value > allTimeMax.value) allTimeMax = p;
    if (p.value < allTimeMin.value) allTimeMin = p;
  }

  // Monthly average of published values.
  const months = new Map<string, number[]>();
  for (const p of points) {
    const k = p.date.slice(0, 7);
    (months.get(k) ?? months.set(k, []).get(k)!).push(p.value);
  }
  const monthly = [...months.entries()].map(([month, vs]) => ({
    month,
    avg: round(vs.reduce((s, v) => s + v, 0) / vs.length),
  }));

  // Daily moves between consecutive publications.
  const moves: Move[] = [];
  const logReturnsByYear = new Map<number, number[]>();
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    moves.push({ date: b.date, from: a.value, to: b.value, change: round(((b.value - a.value) / a.value) * 100, 3) });
    const y = Number(b.date.slice(0, 4));
    (logReturnsByYear.get(y) ?? logReturnsByYear.set(y, []).get(y)!).push(Math.log(b.value / a.value));
  }
  const sorted = [...moves].sort((x, y) => y.change - x.change);
  const topRises = sorted.slice(0, topN);
  const topFalls = sorted.slice(-topN).reverse();

  // Yearly statistics.
  const byYear = new Map<number, Point[]>();
  for (const p of points) {
    const y = Number(p.date.slice(0, 4));
    (byYear.get(y) ?? byYear.set(y, []).get(y)!).push(p);
  }
  const years: YearStat[] = [...byYear.entries()].map(([year, ps]) => {
    let min = ps[0];
    let max = ps[0];
    for (const p of ps) {
      if (p.value < min.value) min = p;
      if (p.value > max.value) max = p;
    }
    const first = ps[0].value;
    const last = ps.at(-1)!.value;
    return {
      year,
      avg: round(ps.reduce((s, p) => s + p.value, 0) / ps.length),
      min,
      max,
      first,
      last,
      change: round(((last - first) / first) * 100),
      volatility: round(stdDev(logReturnsByYear.get(year) ?? []) * Math.sqrt(252) * 100),
      days: ps.length,
    };
  });

  // Change against the value closest to one year before the latest one.
  const latest = points.at(-1)!;
  const target = Date.parse(latest.date) - 365 * DAY;
  let yearAgo: Point | null = null;
  for (const p of points) {
    if (Date.parse(p.date) <= target) yearAgo = p;
    else break;
  }
  const change1y = yearAgo ? round(((latest.value - yearAgo.value) / yearAgo.value) * 100) : null;

  return { quality, latest, allTimeMax, allTimeMin, monthly, years, topRises, topFalls, change1y };
}
