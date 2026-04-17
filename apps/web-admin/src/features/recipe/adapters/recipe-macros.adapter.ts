import { RecipeNutrientRow } from "./recipe-nutrients.adapter";
import { isMacroNutrient } from "@/features/product-nutrients/lib/isMacroNutrient";

export function getMacroRows(rows: RecipeNutrientRow[]) {
  return rows.filter((r) => isMacroNutrient(r.code));
}
