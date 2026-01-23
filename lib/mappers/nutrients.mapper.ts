import { NutrientsMap } from "@/types/nutrients";
import { generateUUID } from "@/lib/uuid";

export function mapNutrientsToRows(
  productId: string,
  nutrients?: NutrientsMap,
) {
  if (!nutrients) return [];

  const now = new Date().toISOString();

  return Object.entries(nutrients).map(([nutrientCode, data]) => [
    generateUUID(), // product_nutrient_id
    productId, // product_id
    nutrientCode, // nutrient_id (тимчасово code)
    data.value, // value_per_100g
    null, // value_per_serving
    data.unit ?? null, // unit
    "manual", // source
    false, // is_estimated
    now, // created_at
    now, // updated_at
  ]);
}
