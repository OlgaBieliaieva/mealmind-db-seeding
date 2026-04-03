import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";

export type RecipeInput = {
  recipe: {
    title: string;
    description: string;

    recipe_type_id?: number;

    base_servings: number;
    base_output_weight_g: number;

    difficulty?: RecipeDifficulty | null;

    prep_time_min?: number;
    cook_time_min?: number;
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

  cuisine_ids: number[];
  dietary_tag_ids: number[];
};
