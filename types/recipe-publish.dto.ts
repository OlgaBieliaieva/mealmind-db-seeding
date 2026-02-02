import { z } from "zod";

export const RecipePublishSchema = z.object({
  recipe_id: z.string().uuid(),
});

export type RecipePublishInput = z.infer<typeof RecipePublishSchema>;
