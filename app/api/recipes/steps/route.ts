import { RecipeStepsPayloadSchema } from "@/types/recipe-steps.dto";
import { mapRecipeStepToRow } from "@/lib/mappers/recipe-step.mapper";
import { appendRow } from "@/lib/sheets.helpers";
import { deleteRowsByRecipeId } from "@/lib/recipe-children.delete";

export async function POST(req: Request) {
  const body = await req.json();
  const { recipe_id, steps } = RecipeStepsPayloadSchema.parse(body);

  await deleteRowsByRecipeId("recipe_steps", recipe_id);

  for (const step of steps) {
    const row = mapRecipeStepToRow(recipe_id, step);
    await appendRow("recipe_steps", row);
  }

  return Response.json({ ok: true });
}
