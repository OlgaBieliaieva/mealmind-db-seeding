import { z } from "zod";

export const RecipeIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export type RecipeIdParams = z.infer<typeof RecipeIdParamsSchema>;
