import { z } from "zod";

export const MealEntryCreateSchema = z
  .object({
    date: z.string(),

    userId: z.string().uuid(),
    mealTypeId: z.string().uuid(),

    recipeId: z.string().uuid().optional(),
    productId: z.string().uuid().optional(),

    amount: z.number().positive(),
  })
  .refine((data) => data.recipeId || data.productId, {
    message: "Either recipeId or productId is required",
  })
  .refine((data) => !(data.recipeId && data.productId), {
    message: "Only one of recipeId or productId allowed",
  });
