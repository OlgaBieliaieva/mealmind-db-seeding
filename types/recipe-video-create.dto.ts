import { z } from "zod";

export const RecipeVideoCreateSchema = z.object({
  recipe_id: z.string().uuid(),
  platform: z.enum(["youtube", "instagram", "tiktok"]),
  url: z.string().url(),
  author_name: z.string().min(1).optional(),
  author_url: z.string().url().optional(),
});

export type RecipeVideoCreateInput = z.infer<typeof RecipeVideoCreateSchema>;
