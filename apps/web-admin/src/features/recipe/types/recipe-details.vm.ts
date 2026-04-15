import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";
import { RecipeStatus } from "@/features/recipe/constants/recipe-status.constants";
import { RecipeVisibility } from "@/features/recipe/constants/recipe-visibility.constants";

export type RecipeDetailsVM = {
  id: string;
  title: string;
  description: string;

  status: RecipeStatus;
  visibility: RecipeVisibility;

  photoUrl?: string | null;

  type?: string | null;
  difficulty?: RecipeDifficulty | null;

  prepTime?: number | null;
  cookTime?: number | null;

  servings: number;
  output_weight_mode: "auto" | "manual";
  outputWeight: number;

  ingredients: {
    id: string;
    name: string;
    quantity: number;
    isOptional: boolean;
  }[];

  steps: {
    id: string;
    text: string;
  }[];

  cuisines: string[];
  dietaryTags: string[];

  nutrients: Record<string, { value: number; unit: string }>;
};
