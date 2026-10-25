// Colombian public holidays and business-day arithmetic.
//
// Rules (Ley 51 de 1983, "Ley Emiliani", and Ley 35 de 1939):
// - Six holidays stay on their date: Jan 1, May 1, Jul 20, Aug 7, Dec 8, Dec 25.
// - Seven holidays move to the following Monday when they do not fall on one.
// - Five depend on Easter: Holy Thursday and Good Friday stay put; Ascension,
//   Corpus Christi and Sacred Heart are already defined as the Monday after.
//
// Dates are plain "YYYY-MM-DD" strings handled in UTC, so the result never
// depends on the time zone of the machine running it.

export type HolidayRule = "fijo" | "emiliani" | "pascua";

export type Holiday = {
  date: string;
  name: string;
  nameEn: string;
  rule: HolidayRule;
  // Calendar date before the Emiliani shift, when it was moved.
  original?: string;
};

const DAY = 86_400_000;

export function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * DAY);
}

// Anonymous Gregorian algorithm (Meeus/Jones/Butcher): Easter Sunday for any year from 1583.
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

// Next Monday on or after d (Monday stays).
function toMonday(d: Date): Date {
  const dow = d.getUTCDay(); // 0 Sunday … 6 Saturday
  const shift = (8 - dow) % 7;
  return addDays(d, shift);
}

const FIXED: [number, number, string, string][] = [
  [1, 1, "Año Nuevo", "New Year's Day"],
  [5, 1, "Día del Trabajo", "Labour Day"],
  [7, 20, "Día de la Independencia", "Independence Day"],
  [8, 7, "Batalla de Boyacá", "Battle of Boyacá"],
  [12, 8, "Inmaculada Concepción", "Immaculate Conception"],
  [12, 25, "Navidad", "Christmas Day"],
];

const MOVABLE: [number, number, string, string][] = [
  [1, 6, "Reyes Magos", "Epiphany"],
  [3, 19, "San José", "Saint Joseph's Day"],
  [6, 29, "San Pedro y San Pablo", "Saints Peter and Paul"],
  [8, 15, "Asunción de la Virgen", "Assumption of Mary"],
  [10, 12, "Día de la Raza", "Columbus Day"],
  [11, 1, "Todos los Santos", "All Saints' Day"],
  [11, 11, "Independencia de Cartagena", "Independence of Cartagena"],
];

// Offsets from Easter Sunday. The three Monday holidays are the Thursday/Friday feast moved forward.
const EASTER: [number, string, string][] = [
  [-3, "Jueves Santo", "Holy Thursday"],
  [-2, "Viernes Santo", "Good Friday"],
  [43, "Ascensión del Señor", "Ascension Day"],
  [64, "Corpus Christi", "Corpus Christi"],
  [71, "Sagrado Corazón", "Sacred Heart"],
];

const cache = new Map<number, Holiday[]>();

export function holidays(year: number): Holiday[] {
  if (!Number.isInteger(year) || year < 1984 || year > 9999) {
    throw new RangeError("El año debe estar entre 1984 y 9999 (la Ley Emiliani rige desde 1984).");
  }
  const hit = cache.get(year);
  if (hit) return hit;

  const list: Holiday[] = [];
  for (const [m, d, name, nameEn] of FIXED) {
    list.push({ date: toISO(new Date(Date.UTC(year, m - 1, d))), name, nameEn, rule: "fijo" });
  }
  for (const [m, d, name, nameEn] of MOVABLE) {
    const raw = new Date(Date.UTC(year, m - 1, d));
    const moved = toMonday(raw);
    const h: Holiday = { date: toISO(moved), name, nameEn, rule: "emiliani" };
    if (moved.getTime() !== raw.getTime()) h.original = toISO(raw);
    list.push(h);
  }
  const easter = easterSunday(year);
  for (const [offset, name, nameEn] of EASTER) {
    list.push({ date: toISO(addDays(easter, offset)), name, nameEn, rule: "pascua" });
  }

  list.sort((x, y) => (x.date < y.date ? -1 : x.date > y.date ? 1 : 0));
  cache.set(year, list);
  return list;
}

// Two holidays can land on the same Monday (2025: San Pedro and Sagrado Corazón on 30 June).
function holidaySet(year: number): Set<string> {
  return new Set(holidays(year).map((h) => h.date));
}

export function isHoliday(iso: string): boolean {
  return holidaySet(fromISO(iso).getUTCFullYear()).has(iso);
}

export function isBusinessDay(iso: string): boolean {
  const dow = fromISO(iso).getUTCDay();
  return dow !== 0 && dow !== 6 && !isHoliday(iso);
}

export type SkippedDay = { date: string; reason: "sabado" | "domingo" | "festivo"; name?: string; nameEn?: string };

export type AddResult = { result: string; skipped: SkippedDay[] };

// Counts n business days starting the day after `start`, the way procedural terms run in Colombia.
export function addBusinessDays(start: string, n: number): AddResult {
  if (!Number.isInteger(n) || n < 0 || n > 3650) {
    throw new RangeError("La cantidad de días debe ser un entero entre 0 y 3650.");
  }
  let d = fromISO(start);
  const skipped: SkippedDay[] = [];
  let counted = 0;
  while (counted < n) {
    d = addDays(d, 1);
    const iso = toISO(d);
    const dow = d.getUTCDay();
    if (dow === 6) skipped.push({ date: iso, reason: "sabado" });
    else if (dow === 0) skipped.push({ date: iso, reason: "domingo" });
    else if (isHoliday(iso)) {
      const h = holidays(d.getUTCFullYear()).find((x) => x.date === iso);
      skipped.push({ date: iso, reason: "festivo", name: h?.name, nameEn: h?.nameEn });
    } else counted++;
  }
  return { result: toISO(d), skipped };
}

// Business days strictly after `from` up to and including `to`.
export function businessDaysBetween(from: string, to: string): number {
  const a = fromISO(from);
  const b = fromISO(to);
  if (b < a) return -businessDaysBetween(to, from);
  let count = 0;
  for (let d = addDays(a, 1); d <= b; d = addDays(d, 1)) {
    if (isBusinessDay(toISO(d))) count++;
  }
  return count;
}
