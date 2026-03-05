import { readSheet } from "@/lib/v1/sheets.read";
import { NutrientsMap } from "@/types/nutrients";

export async function getRecipeNutrientsMap(
  recipeIds: string[],
): Promise<Record<string, NutrientsMap>> {
  if (!recipeIds.length) return {};

  const rows = await readSheet("recipe_nutrients!A2:F");

  const map: Record<string, NutrientsMap> = {};

  for (const row of rows) {
    const recipeId = row[1];
    const nutrientId = row[2];

    if (!recipeIds.includes(recipeId)) continue;

    const raw = String(row[3] ?? "0");
    const value = Number(raw.replace(",", "."));
    const unit = row[4];

    if (!map[recipeId]) {
      map[recipeId] = {};
    }

    map[recipeId][nutrientId] = {
      value,
      unit,
    };
  }

  return map;
}
