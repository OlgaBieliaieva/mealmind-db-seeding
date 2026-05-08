import { z } from "zod";

export const MealEntryCreateSchema = z
  .object({
    date: z.string(),

    userId: z.string().uuid(),
    mealTypeId: z.string().uuid(),

    recipeId: z.string().uuid().optional(),
    productId: z.string().uuid().optional(),

    amount: z.number().positive(),
    unit: z.enum(["g", "ml", "portion"]),
  })
  .refine((data) => data.recipeId || data.productId, {
    message: "Either recipeId or productId is required",
  })
  .refine((data) => !(data.recipeId && data.productId), {
    message: "Only one of recipeId or productId allowed",
  });

export const MealEntriesBulkCreateSchema = z.object({
  entries: z.array(MealEntryCreateSchema).min(1),
});
