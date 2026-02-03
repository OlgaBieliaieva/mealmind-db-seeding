import { RecipeStepInput } from "@/types/recipe-steps.dto";
import { generateUUID } from "@/lib/uuid";

export function mapRecipeStepToRow(recipeId: string, step: RecipeStepInput) {
  return [
    step.step_id ?? generateUUID(), // A
    recipeId, // B
    step.step_number, // C
    step.instruction, // D
    step.timer_sec ?? null, // E
  ];
}
