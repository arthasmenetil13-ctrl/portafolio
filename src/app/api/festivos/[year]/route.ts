import { holidays } from "@/lib/festivos";

// GET /api/festivos/2026 → the 18 Colombian holidays of that year.
export async function GET(_req: Request, ctx: RouteContext<"/api/festivos/[year]">) {
  const { year } = await ctx.params;
  const y = Number(year);
  try {
    return Response.json(
      { year: y, count: holidays(y).length, holidays: holidays(y) },
      { headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000", "Access-Control-Allow-Origin": "*" } },
    );
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
