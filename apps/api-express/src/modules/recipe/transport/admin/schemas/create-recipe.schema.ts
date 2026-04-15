import { z } from "zod";
import { RECIPE_DIFFICULTY } from "../../../constants/recipe-model.constants";

export const createRecipeSchema = z.object({
  recipe: z.object({
    title: z.string().min(1),
    description: z.string().optional(),

    recipe_type_id: z.string().uuid().optional(),

    base_servings: z.number().min(1),
    base_output_weight_g: z.number().min(0),
    output_weight_mode: z.enum(["auto", "manual"]).default("auto"),

    difficulty: z
      .enum([
        RECIPE_DIFFICULTY.EASY,
        RECIPE_DIFFICULTY.MEDIUM,
        RECIPE_DIFFICULTY.HARD,
      ])
      .optional(),

    prep_time_min: z.number().optional(),
    cook_time_min: z.number().optional(),

    recipe_author_id: z.string().uuid().optional(),
    photo_url: z.string().url().optional(),
  }),

  ingredients: z.array(
    z.object({
      product_id: z.string().uuid(),
      quantity_g: z.number().positive(),
      is_optional: z.boolean(),
      order_index: z.number(),
    }),
  ),

  steps: z.array(
    z.object({
      step_number: z.number(),
      instruction: z.string(),
      timer_sec: z.number().optional(),
    }),
  ),

  cuisine_ids: z.array(z.string().uuid()),
  dietary_tag_ids: z.array(z.string().uuid()),
});
