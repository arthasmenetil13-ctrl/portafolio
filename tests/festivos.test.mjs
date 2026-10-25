import assert from "node:assert/strict";
import { test } from "node:test";
import {
  addBusinessDays,
  businessDaysBetween,
  easterSunday,
  holidays,
  isBusinessDay,
  toISO,
} from "../src/lib/festivos.ts";

// Official calendars published for each year (Ministerio del Interior / Banco de la República).
const OFFICIAL = {
  2024: [
    "2024-01-01", "2024-01-08", "2024-03-25", "2024-03-28", "2024-03-29", "2024-05-01",
    "2024-05-13", "2024-06-03", "2024-06-10", "2024-07-01", "2024-07-20", "2024-08-07",
    "2024-08-19", "2024-10-14", "2024-11-04", "2024-11-11", "2024-12-08", "2024-12-25",
  ],
  2025: [
    "2025-01-01", "2025-01-06", "2025-03-24", "2025-04-17", "2025-04-18", "2025-05-01",
    "2025-06-02", "2025-06-23", "2025-06-30", "2025-07-20", "2025-08-07", "2025-08-18",
    "2025-10-13", "2025-11-03", "2025-11-17", "2025-12-08", "2025-12-25",
  ],
  2026: [
    "2026-01-01", "2026-01-12", "2026-03-23", "2026-04-02", "2026-04-03", "2026-05-01",
    "2026-05-18", "2026-06-08", "2026-06-15", "2026-06-29", "2026-07-20", "2026-08-07",
    "2026-08-17", "2026-10-12", "2026-11-02", "2026-11-16", "2026-12-08", "2026-12-25",
  ],
};

test("Easter Sunday matches known dates", () => {
  const known = {
    2019: "2019-04-21", 2024: "2024-03-31", 2025: "2025-04-20", 2026: "2026-04-05",
    2027: "2027-03-28", 2038: "2038-04-25", 2285: "2285-03-22",
  };
  for (const [year, iso] of Object.entries(known)) {
    assert.equal(toISO(easterSunday(Number(year))), iso, `Easter ${year}`);
  }
});

for (const [year, expected] of Object.entries(OFFICIAL)) {
  test(`holidays ${year} match the official calendar`, () => {
    const dates = [...new Set(holidays(Number(year)).map((h) => h.date))];
    assert.deepEqual(dates, expected);
  });
}

test("every year has 18 named holidays", () => {
  for (let y = 1984; y <= 2100; y++) assert.equal(holidays(y).length, 18, `year ${y}`);
});

test("2025: San Pedro and Sagrado Corazón share Monday 30 June", () => {
  const onDay = holidays(2025).filter((h) => h.date === "2025-06-30").map((h) => h.name);
  assert.deepEqual(onDay.sort(), ["Sagrado Corazón", "San Pedro y San Pablo"]);
});

test("Emiliani holidays record the original date only when moved", () => {
  const reyes2026 = holidays(2026).find((h) => h.name === "Reyes Magos");
  assert.equal(reyes2026.original, "2026-01-06");
  const raza2026 = holidays(2026).find((h) => h.name === "Día de la Raza");
  assert.equal(raza2026.original, undefined); // 12 Oct 2026 is already a Monday
});

test("business days skip weekends and holidays", () => {
  assert.equal(isBusinessDay("2026-12-25"), false);
  assert.equal(isBusinessDay("2026-12-26"), false);
  assert.equal(isBusinessDay("2026-12-28"), true);

  const christmas = addBusinessDays("2026-12-23", 3);
  assert.equal(christmas.result, "2026-12-29");
  assert.deepEqual(
    christmas.skipped.map((s) => s.reason),
    ["festivo", "sabado", "domingo"],
  );

  const doubleMonday = addBusinessDays("2025-06-27", 1);
  assert.equal(doubleMonday.result, "2025-07-01");
  assert.equal(doubleMonday.skipped.filter((s) => s.reason === "festivo").length, 1);

  assert.equal(addBusinessDays("2026-10-23", 0).result, "2026-10-23");
});

test("business days between two dates", () => {
  assert.equal(businessDaysBetween("2026-12-23", "2026-12-29"), 3);
  assert.equal(businessDaysBetween("2026-12-29", "2026-12-23"), -3);
  assert.equal(businessDaysBetween("2026-01-01", "2026-12-31"), 365 - 104 - 18 + countWeekendHolidays(2026));
});

function countWeekendHolidays(year) {
  return holidays(year).filter((h) => {
    const dow = new Date(`${h.date}T00:00:00Z`).getUTCDay();
    return dow === 0 || dow === 6;
  }).length;
}

test("rejects years before the Emiliani law and bad day counts", () => {
  assert.throws(() => holidays(1983), RangeError);
  assert.throws(() => addBusinessDays("2026-01-01", -1), RangeError);
  assert.throws(() => addBusinessDays("2026-01-01", 1.5), RangeError);
});
