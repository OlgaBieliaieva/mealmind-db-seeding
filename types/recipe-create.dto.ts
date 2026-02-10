import { z } from "zod";

export const RecipeDraftSchema = z.object({
  recipe_id: z.string().uuid().optional(),

  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
  recipe_type_id: z.number().nullable().optional(),

  base_servings: z.number().optional().default(1),
  base_output_weight_g: z.number().optional().default(0),
  container_weight_g: z.number().nullable().optional(),

  prep_time_min: z.number().optional().default(0),
  cook_time_min: z.number().optional().default(0),

  difficulty: z.enum(["easy", "medium", "hard"]).optional(),

  photo_url: z.string().url().optional(),
  photos: z
    .array(
      z.object({
        url: z.string().url(),
        objectName: z.string(),
      }),
    )
    .optional(),

  visibility: z.enum(["private", "public"]).optional().default("private"),
  family_id: z.string().uuid().nullable().optional(),
  recipe_author_id: z.string().uuid().nullable().optional(),
});

export type RecipeDraftInput = z.infer<typeof RecipeDraftSchema>;
