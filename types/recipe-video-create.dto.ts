import { z } from "zod";

export const RecipeVideoItemSchema = z.object({
  platform: z.enum(["youtube", "instagram", "tiktok"]),
  url: z.string().url(),
  recipe_author_id: z.string().uuid().nullable(),
});

export const RecipeVideoCreateSchema = z.object({
  recipe_id: z.string().uuid(),
  videos: z.array(RecipeVideoItemSchema),
});

export type RecipeVideoCreateInput = z.infer<typeof RecipeVideoCreateSchema>;
