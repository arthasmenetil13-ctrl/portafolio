import { addBusinessDays, businessDaysBetween } from "@/lib/festivos";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/dias-habiles?desde=2026-12-23&dias=3  → date reached after 3 business days
// GET /api/dias-habiles?desde=2026-12-23&hasta=2026-12-29 → business days between both dates
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const desde = q.get("desde") ?? "";
  const hasta = q.get("hasta");
  const dias = q.get("dias");
  const headers = { "Access-Control-Allow-Origin": "*" };

  if (!ISO.test(desde)) {
    return Response.json({ error: "Falta 'desde' con formato AAAA-MM-DD." }, { status: 400, headers });
  }
  try {
    if (hasta !== null) {
      if (!ISO.test(hasta)) {
        return Response.json({ error: "'hasta' debe tener formato AAAA-MM-DD." }, { status: 400, headers });
      }
      return Response.json({ desde, hasta, diasHabiles: businessDaysBetween(desde, hasta) }, { headers });
    }
    if (dias === null) {
      return Response.json({ error: "Envía 'dias' (cuántos días hábiles sumar) o 'hasta'." }, { status: 400, headers });
    }
    const { result, skipped } = addBusinessDays(desde, Number(dias));
    return Response.json({ desde, dias: Number(dias), resultado: result, omitidos: skipped }, { headers });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400, headers });
  }
}
