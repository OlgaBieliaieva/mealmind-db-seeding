import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";
import { RecipeStatus } from "@/features/recipe/constants/recipe-status.constants";
import { RecipeVisibility } from "@/features/recipe/constants/recipe-visibility.constants";
import { RecipeVideoPlatform } from "@/features/recipe/constants/recipe-video.constants";

export type RecipeDetailsVM = {
  id: string;
  title: string;
  description: string;

  status: RecipeStatus;
  visibility: RecipeVisibility;

  photoUrl: string | null;

  type: string | null;
  difficulty: RecipeDifficulty | null;

  prepTime: number | null;
  cookTime: number | null;

  servings: number;
  output_weight_mode: "auto" | "manual";
  outputWeight: number;

  author: {
    name: string;
    avatarUrl: string | null;
    profileUrl: string | null;
    type: "user" | "blogger" | "system";
  } | null;

  cuisines: string[];
  dietaryTags: string[];

  ingredients: {
    id: string;
    name: string;
    brand?: string | null;
    quantity: number;
    isOptional: boolean;
  }[];

  steps: {
    id: string;
    text: string;
  }[];

  nutrients: Record<
    string,
    {
      value: number;
      unit: string;
    }
  >;

  videos: {
    id: string;
    platform: RecipeVideoPlatform;
    url: string;
    author?: {
      name: string;
      profileUrl: string | null;
    };
  }[];
};
