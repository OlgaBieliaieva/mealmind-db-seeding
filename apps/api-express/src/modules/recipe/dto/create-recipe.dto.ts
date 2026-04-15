import { RecipeDifficulty } from "../constants/recipe-model.constants";

export type CreateRecipeDTO = {
  recipe: {
    title: string;
    description?: string;

    recipe_type_id?: string;

    recipe_author_id?: string;
    photo_url?: string;

    base_servings: number;
    base_output_weight_g: number;

    difficulty?: RecipeDifficulty;

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
    timer_sec?: number;
  }[];

  cuisine_ids: string[];
  dietary_tag_ids: string[];
};
