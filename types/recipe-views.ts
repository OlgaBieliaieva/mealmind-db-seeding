import { RecipeIngredientView } from "@/types/recipe-ingredient";
import { RecipeStepDraft } from "@/types/recipe-step";

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

export type RecipeFull = {
  recipe: {
    recipe_id: string;
    title: string;
    description: string;
    status: "draft" | "ready" | "published" | "archived";
    visibility: "private" | "public";
    photo_url?: string | null;
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

  authors: {
    platform: string;
    url: string;
  }[];
};
