import { readSheet } from "@/lib/sheets.read";

export async function GET() {
  /**
   * nutrients_reference columns:
   * A nutrient_id
   * B code
   * C name_en
   * D name_ua
   * E default_unit
   * F nutrient_group
   * G sort_order
   */
  const rows = await readSheet("nutrients_reference!A2:G");

  const items = rows
    .map((row) => ({
      nutrient_id: row[0],
      code: row[1],
      name: {
        en: row[2],
        ua: row[3],
      },
      default_unit: row[4],
      nutrient_group: row[5],
      sort_order: Number(row[6]) || 0,
    }))
    .sort((a, b) => a.sort_order - b.sort_order);

  return Response.json({ items });
}
