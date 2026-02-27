import { readSheet } from "@/lib/sheets.read";
import { parseSheetBoolean } from "@/lib/utils/sheetBoolean";

export type RecipeIngredientRow = {
  recipe_ingredient_id: string;
  recipe_id: string;
  product_id: string;
  quantity_g: number;
  is_optional: boolean;
  order_index: number;
};

export async function getRecipeIngredients(
  recipeId: string,
): Promise<RecipeIngredientRow[]> {
  const rows = await readSheet("recipe_ingredients!A2:F");

  return rows
    .filter((row) => row[1] === recipeId)
    .map((row) => ({
      recipe_ingredient_id: String(row[0]),
      recipe_id: String(row[1]),
      product_id: String(row[2]),
      quantity_g: Number(row[3]) || 0,
      is_optional: parseSheetBoolean(String(row[4])),
      order_index: Number(row[5]) || 0,
    }));
}
