import { generateUUID } from "@/domains/shared/utils/uuid";
import { appendRows, deleteRowsRecipeId } from "@/lib/v1/sheets.helpers";
import { getRecipeIngredients } from "@/lib/v1/recipes/recipe-ingredients.read";
import { getProductNutrientsMap } from "@/lib/v1/nutrition/nutrition.read";
import { aggregateRecipeNutrients } from "@/lib/v1/recipe-nutrients.aggregate";

export async function recalculateRecipeNutrients(recipeId: string) {
  // 1️⃣ Отримати інгредієнти
  const ingredients = await getRecipeIngredients(recipeId);

  if (!ingredients.length) return;

  // 2️⃣ Отримати нутрієнти продуктів
  const productIds = ingredients.map((i) => i.product_id);

  const productNutrientsMap = await getProductNutrientsMap(productIds);

  // 3️⃣ Агрегувати
  const aggregated = aggregateRecipeNutrients(
    ingredients.map((i) => ({
      product_id: i.product_id,
      quantity_g: i.quantity_g,
    })),
    productNutrientsMap,
  );

  // 4️⃣ Видалити старі записи
  // ⚠ recipe_id знаходиться у колонці B → index 1
  await deleteRowsRecipeId("recipe_nutrients", recipeId, 1);

  // 5️⃣ Підготувати нові рядки
  const rows = Object.entries(aggregated).map(([nutrientId, data]) => [
    generateUUID(), // recipe_nutrient_id
    recipeId, // recipe_id
    nutrientId, // nutrient_id
    data.value, // value_total
    data.unit, // unit
    new Date().toISOString(), // updated_at
  ]);

  // 6️⃣ Додати нові
  if (rows.length > 0) {
    await appendRows("recipe_nutrients", rows);
  }
}
