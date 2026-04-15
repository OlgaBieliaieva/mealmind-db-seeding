import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";

export type RecipeFormInput = {
  title: string;
  description: string;

  recipeTypeId?: string;

  servings: number;
  output_weight_mode: "auto" | "manual";
  outputWeight?: number;
  containerWeight?: number;

  difficulty?: RecipeDifficulty;

  prepTime?: number;
  cookTime?: number;

  cuisineIds: string[];
  dietaryTagIds: string[];

  ingredients: {
    id: string;
    productId: string | null;
    quantity: number;
    isOptional: boolean;
  }[];

  steps: {
    id: string;
    text: string;
  }[];
};
