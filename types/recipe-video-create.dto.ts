import { z } from "zod";

export const RecipeVideoSchema = z.object({
  platform: z.enum(["youtube", "instagram", "tiktok"]),
  url: z.string().url(),
  author_name: z.string().nullable().optional(),
  author_url: z.string().url().nullable().optional(),
});

export const RecipeVideoCreateSchema = z.object({
  recipe_id: z.string().uuid(),
  videos: z.array(RecipeVideoSchema).min(1),
});

export type RecipeVideoCreateInput = z.infer<typeof RecipeVideoCreateSchema>;
