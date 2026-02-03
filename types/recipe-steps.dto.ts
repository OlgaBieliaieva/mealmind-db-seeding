import { z } from "zod";

export const RecipeStepSchema = z.object({
  step_id: z.string().uuid().optional(),
  step_number: z.number(),
  instruction: z.string().min(1),
  timer_sec: z.number().nullable().optional(),
});

export const RecipeStepsPayloadSchema = z.object({
  recipe_id: z.string().uuid(),
  steps: z.array(RecipeStepSchema),
});

export type RecipeStepInput = z.infer<typeof RecipeStepSchema>;
export type RecipeStepsPayload = z.infer<typeof RecipeStepsPayloadSchema>;
