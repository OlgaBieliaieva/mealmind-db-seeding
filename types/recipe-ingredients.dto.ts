import { z } from "zod";

export const RecipeIngredientSchema = z.object({
  recipe_ingredient_id: z.string().uuid().optional(),
  product_id: z.string().min(1),
  quantity_g: z.number().positive(),
  is_optional: z.boolean().default(false),
  order_index: z.number(),
});

export const RecipeIngredientsPayloadSchema = z.object({
  recipe_id: z.string().uuid(),
  ingredients: z.array(RecipeIngredientSchema),
});

export type RecipeIngredientInput = z.infer<typeof RecipeIngredientSchema>;
export type RecipeIngredientsPayload = z.infer<
  typeof RecipeIngredientsPayloadSchema
>;
