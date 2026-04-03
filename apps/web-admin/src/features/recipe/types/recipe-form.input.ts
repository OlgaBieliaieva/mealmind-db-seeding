import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";

export type RecipeFormInput = {
  title: string;
  description: string;

  recipeTypeId?: number;

  servings: number;
  outputWeight?: number;
  containerWeight?: number;

  difficulty?: RecipeDifficulty;

  prepTime?: number;
  cookTime?: number;

  cuisineIds: number[];
  dietaryTagIds: number[];

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
