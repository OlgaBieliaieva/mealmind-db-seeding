import { z } from "zod";

export const RecipeSearchQuerySchema = z.object({
  query: z.string().optional(),

  recipe_type_id: z.string().uuid().optional(),

  cuisine_id: z.string().uuid().optional(),

  dietary_tag_id: z.string().uuid().optional(),

  status: z.enum(["draft", "ready", "published", "archived"]).optional(),

  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type RecipeSearchQuery = z.infer<typeof RecipeSearchQuerySchema>;