import { RecipeStatus } from "./recipe-status";

export type RecipeDifficulty = "easy" | "medium" | "hard";

export type RecipeCreatePayload = {
  recipe_id?: string;
  title: string;
  description: string;
  recipe_type_id: number | null;

  base_servings: number;
  base_output_weight_g: number;
  container_weight_g: number | null;

  prep_time_min?: number;
  cook_time_min?: number;
  difficulty?: "easy" | "medium" | "hard";

  photos?: {
    url: string;
    objectName: string;
  }[];
  photo_url?: string;

  visibility: "private" | "public";
  status: RecipeStatus;
  family_id: string | null;

  recipe_author_id?: string | null;
  created_at?: Date;
};
