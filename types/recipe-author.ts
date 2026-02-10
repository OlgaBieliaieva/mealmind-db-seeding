export type RecipeAuthorType = "user" | "blogger" | "system";

export type RecipeAuthor = {
  recipe_author_id: string;
  type: RecipeAuthorType;
  display_name: string;
  avatar_url: string | null;
  profile_url: string | null;
  created_at: string;
};
