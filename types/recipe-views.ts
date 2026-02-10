import { RecipeIngredientView } from "@/types/recipe-ingredient";
import { RecipeStepDraft } from "@/types/recipe-step";
import { RecipeVideo } from "@/types/recipe-video";

export type RecipeViewRecipe = {
  recipe_id: string;
  title: string;
  description: string;
  status: "draft" | "ready" | "published" | "archived";
  visibility: "private" | "public";
  photo_url?: string | null;
};

export type RecipeViewIngredient = {
  product_id: string;
  quantity_g: number;
  is_optional: boolean;
  order_index: number;
};

export type RecipeViewStep = {
  step_number: number;
  instruction: string;
  timer_sec: number | null;
};

export type RecipeVideoView = Omit<RecipeVideo, "recipe_author_id"> & {
  author: {
    recipe_author_id: string;
    display_name: string;
    profile_url: string | null;
  } | null;
};

export type RecipeFull = {
  recipe: {
    recipe_id: string;
    title: string;
    description: string;
    status: "draft" | "ready" | "published" | "archived";
    visibility: "private" | "public";
    photo_url?: string | null;

    recipe_type_id: number | null;
    recipe_type_name: string | null;

    difficulty: "easy" | "medium" | "hard" | null;
    prep_time_min: number | null;
    cook_time_min: number | null;
    base_servings: number;
    base_output_weight_g: number;
    recipe_author_id: string | null;
  };

  ingredients: RecipeIngredientView[];
  steps: RecipeStepDraft[];

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

  videos: RecipeVideoView[];
};
