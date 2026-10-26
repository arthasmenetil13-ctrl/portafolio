import assert from "node:assert/strict";
import { test } from "node:test";
import { analyse, clean } from "../src/lib/trm.ts";

const row = (date, valor) => ({ valor: String(valor), unidad: "COP", vigenciadesde: `${date}T00:00:00.000` });

test("clean drops invalid rows, keeps the last duplicate and sorts", () => {
  const { points, quality } = clean([
    row("2024-01-03", 4000),
    row("2024-01-02", 3900),
    row("2024-01-03", 4010), // duplicate date: last one wins
    { valor: "abc", vigenciadesde: "2024-01-04T00:00:00.000" },
    { valor: "-5", vigenciadesde: "2024-01-05T00:00:00.000" },
    { valor: "4100", unidad: "USD", vigenciadesde: "2024-01-06T00:00:00.000" },
    row("2024-01-20", 4050),
  ]);
  assert.deepEqual(points.map((p) => [p.date, p.value]), [
    ["2024-01-02", 3900],
    ["2024-01-03", 4010],
    ["2024-01-20", 4050],
  ]);
  assert.equal(quality.invalid, 3);
  assert.equal(quality.duplicates, 1);
  assert.deepEqual(quality.longGaps, [{ from: "2024-01-03", to: "2024-01-20", days: 17 }]);
});

test("analyse finds extremes, moves, yearly stats and the one-year change", () => {
  const { points, quality } = clean([
    row("2023-06-01", 4000),
    row("2023-12-29", 3800),
    row("2024-06-03", 4000),
    row("2024-06-04", 4200), // +5 %
    row("2024-06-05", 3990), // -5 %
    row("2024-12-30", 4400),
  ]);
  const a = analyse(points, quality, 2);

  assert.deepEqual(a.allTimeMax, { date: "2024-12-30", value: 4400 });
  assert.deepEqual(a.allTimeMin, { date: "2023-12-29", value: 3800 });
  assert.deepEqual(a.latest, { date: "2024-12-30", value: 4400 });

  assert.equal(a.topRises[0].date, "2024-12-30"); // 3990 → 4400 = +10.3 %
  assert.equal(a.topFalls[0].date, "2024-06-05");
  assert.equal(a.topFalls[0].change, -5);

  const y2024 = a.years.find((y) => y.year === 2024);
  assert.equal(y2024.days, 4);
  assert.equal(y2024.change, 10);
  assert.equal(y2024.avg, 4147.5);
  assert.ok(y2024.volatility > 0);

  // One year before 2024-12-30 the closest earlier value is 2023-12-29 (3800).
  assert.equal(a.change1y, 15.79);
  assert.deepEqual(a.monthly.map((m) => m.month), ["2023-06", "2023-12", "2024-06", "2024-12"]);
  assert.equal(a.monthly[2].avg, 4063.33);
});

test("analyse refuses a series too short to compare", () => {
  const { points, quality } = clean([row("2024-01-02", 3900)]);
  assert.throws(() => analyse(points, quality));
});
