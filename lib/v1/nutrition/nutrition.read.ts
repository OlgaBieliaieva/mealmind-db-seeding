import { readSheet } from "@/lib/v1/sheets.read";
import { NutrientsMap } from "@/domains/nutrition/types/nutrient-value.types";

export async function getProductNutrientsMap(
  productIds: string[],
): Promise<Record<string, NutrientsMap>> {
  if (productIds.length === 0) return {};

  const rows = await readSheet("product_nutrients!A2:J");

  const map: Record<string, NutrientsMap> = {};

  for (const row of rows) {
    const product_id = String(row[1]);
    const nutrient_id = String(row[2]);

    if (!productIds.includes(product_id)) continue;

    const raw = String(row[3] ?? "0");
    const value = Number(raw.replace(",", "."));

    const unit = String(row[5] ?? "");

    if (!Number.isFinite(value)) continue;

    if (!map[product_id]) {
      map[product_id] = {};
    }

    // ✅ КЛЮЧ = nutrient_id (НЕ code!)
    map[product_id][nutrient_id] = {
      value,
      unit,
    };
  }

  return map;
}
