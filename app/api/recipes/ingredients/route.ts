import { RecipeIngredientsPayloadSchema } from "@/types/recipe-ingredients.dto";
import { mapRecipeIngredientToRow } from "@/lib/mappers/recipe-ingredient.mapper";
import { appendRow } from "@/lib/sheets.helpers";
import { deleteRowsByRecipeId } from "@/lib/recipe-children.delete";

export async function POST(req: Request) {
  const body = await req.json();
  const { recipe_id, ingredients } = RecipeIngredientsPayloadSchema.parse(body);

  await deleteRowsByRecipeId("recipe_ingredients", recipe_id);

  for (const ingredient of ingredients) {
    const row = mapRecipeIngredientToRow(recipe_id, ingredient);
    await appendRow("recipe_ingredients", row);
  }

  return Response.json({ ok: true });
}
