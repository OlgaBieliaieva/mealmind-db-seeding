import { z } from "zod";

export const RecipeDraftSchema = z.object({
  recipe_id: z.string().uuid().optional(),

  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
  recipe_type_id: z.number().nullable().optional(),

  base_servings: z.number().optional().default(1),
  base_output_weight_g: z.number().optional().default(0),
  container_weight_g: z.number().nullable().optional(),

  visibility: z.enum(["private", "public"]).optional().default("private"),
  family_id: z.string().uuid().nullable().optional(),
});

export type RecipeDraftInput = z.infer<typeof RecipeDraftSchema>;
