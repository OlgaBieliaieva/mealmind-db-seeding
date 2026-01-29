import { readSheet } from "@/lib/sheets.read";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  /**
   * product_nutrients columns:
   * A product_nutrient_id
   * B product_id
   * C nutrient_id
   * D value_per_100g
   * E value_per_serving
   * F unit
   */
  const rows = await readSheet("product_nutrients!A2:F");

  const nutrients = rows
    .filter((r) => r[1] === id)
    .reduce<Record<string, { value: number; unit: string }>>((acc, r) => {
      acc[r[2]] = {
        value: Number(r[3]),
        unit: r[5],
      };
      return acc;
    }, {});

  return Response.json({ nutrients });
}
