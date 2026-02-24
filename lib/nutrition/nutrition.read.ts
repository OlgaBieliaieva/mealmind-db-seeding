import { readSheet } from "@/lib/sheets.read";
import { NutrientsMap } from "@/types/nutrients";

export async function getProductNutrientsMap(
  productIds: string[],
): Promise<Record<string, NutrientsMap>> {
  if (productIds.length === 0) return {};

  const rows = await readSheet("product_nutrients!A2:J");

  const map: Record<string, NutrientsMap> = {};

  for (const row of rows) {
    const product_id = row[1];
    const nutrient_code = row[2];
    const value = Number(row[3] ?? 0);
    const unit = row[5] ?? "";

    if (!productIds.includes(product_id)) continue;

    if (!map[product_id]) {
      map[product_id] = {};
    }

    map[product_id][nutrient_code] = {
      value,
      unit,
    };
  }

  return map;
}
