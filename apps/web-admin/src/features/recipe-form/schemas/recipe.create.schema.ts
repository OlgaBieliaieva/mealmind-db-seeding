import { z } from "zod";
import { RECIPE_DIFFICULTY } from "@/features/recipe/constants/recipe-difficulty.constants";

// helper
const RECIPE_DIFFICULTY_VALUES = Object.values(RECIPE_DIFFICULTY) as [
  string,
  ...string[],
];

export const RecipeCreateSchema = z.object({
  recipe: z.object({
    title: z.string().min(1),
    description: z.string().optional(),

    recipe_type_id: z.string().uuid().optional(),

    recipe_author_id: z.string().uuid().optional(),

    base_servings: z.number().min(1),
    output_weight_mode: z.enum(["auto", "manual"]).default("auto"),
    base_output_weight_g: z.number().min(0),

    container_weight_g: z.number().optional(),

    difficulty: z.enum(RECIPE_DIFFICULTY_VALUES).optional(),

    prep_time_min: z.number().optional(),
    cook_time_min: z.number().optional(),
  }),

  ingredients: z.array(
    z.object({
      product_id: z.string().uuid(),
      quantity_g: z.number().positive(),
      is_optional: z.boolean(),
      order_index: z.number(),

      product_name: z.string().optional(),
      product_brand: z.string().nullable().optional(),
      product_unit: z.string().optional(),
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

// export type RecipeCreateInput = z.infer<typeof RecipeCreateSchema>;
export type RecipeCreateInput = z.input<typeof RecipeCreateSchema>; // для форми
export type RecipeCreateOutput = z.infer<typeof RecipeCreateSchema>; // для API
