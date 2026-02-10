import { z } from "zod";

export const RecipeAuthorCreateSchema = z.object({
  type: z.enum(["user", "blogger", "system"]),
  display_name: z.string().min(1),
  avatar_url: z.string().url().optional().nullable(),
  profile_url: z.string().url().optional().nullable(),
});

export type RecipeAuthorCreateInput = z.infer<typeof RecipeAuthorCreateSchema>;
