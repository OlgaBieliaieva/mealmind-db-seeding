import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";

export type RecipeInput = {
  recipe: {
    title: string;
    description: string;

    recipe_type_id?: string;
    recipe_author_id?: string; // ✅ ДОДАТИ

    base_servings: number;
    output_weight_mode: "auto" | "manual";
    base_output_weight_g: number;

    difficulty?: RecipeDifficulty | null;

    prep_time_min?: number;
    cook_time_min?: number;

    photo_url?: string; // ✅ ДОДАТИ
  };

  ingredients: {
    product_id: string;
    quantity_g: number;
    is_optional: boolean;
    order_index: number;
  }[];

  steps: {
    step_number: number;
    instruction: string;
  }[];

  cuisine_ids: string[];
  dietary_tag_ids: string[];

  videos?: {
    platform: "youtube" | "instagram" | "tiktok" | "other";
    url: string;
    recipe_author_id?: string;
  }[];
};
