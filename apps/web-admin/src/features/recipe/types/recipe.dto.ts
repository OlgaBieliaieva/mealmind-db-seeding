import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";
import { RecipeStatus } from "@/features/recipe/constants/recipe-status.constants";
import { RecipeVisibility } from "@/features/recipe/constants/recipe-visibility.constants";
import { RecipeVideoPlatform } from "@/features/recipe/constants/recipe-video.constants";

export type RecipeDTO = {
  recipe: {
    recipe_id: string;
    title: string;
    description: string;
    status: RecipeStatus;
    visibility: RecipeVisibility;
    photo_url?: string | null;

    recipe_type_id: string | null;
    recipe_type_name: string | null;

    difficulty: RecipeDifficulty | null;
    prep_time_min: number | null;
    cook_time_min: number | null;

    base_servings: number;
    base_output_weight_g: number;
    output_weight_mode: "auto" | "manual";
    recipe_author_id: string | null;
  };

  ingredients: {
    id: string;
    product_id: string;
    product_name: string;
    brand_name?: string | null;
    quantity_g: number;
    is_optional: boolean;
    order: number;
  }[];

  steps: {
    id: string;
    order: number;
    text: string;
  }[];

  cuisines: {
    cuisine_id: number;
    name: string;
  }[];

  dietary_tags: {
    dietary_tag_id: number;
    name: string;
  }[];

  author: {
    recipe_author_id: string;
    display_name: string;
    type: "user" | "blogger" | "system";
    avatar_url: string | null;
    profile_url: string | null;
  } | null;

  videos: {
    recipe_video_id: string;
    platform: RecipeVideoPlatform;
    url: string;
    author: {
      recipe_author_id: string;
      display_name: string;
      profile_url: string | null;
    } | null;
  }[];

  nutrients: Record<string, { value: number; unit: string }>;
};
