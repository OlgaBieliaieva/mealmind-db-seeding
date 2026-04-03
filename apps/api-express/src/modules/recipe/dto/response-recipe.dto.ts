import {
  RecipeStatus,
  RecipeVisibility,
  RecipeDifficulty,
} from "../constants/recipe-model.constants";

export type RecipeDTO = {
  id: string;
  title: string;
  description?: string;

  status: RecipeStatus;
  visibility: RecipeVisibility;

  difficulty?: RecipeDifficulty;

  base_servings: number;
  base_output_weight_g: number;

  prep_time_min?: number;
  cook_time_min?: number;

  photo_url?: string | null;
};
