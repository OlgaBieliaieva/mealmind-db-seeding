import { RecipeStatus } from "./recipe-status";

export type RecipeCreatePayload = {
  recipe_id?: string;
  title: string;
  description: string;
  recipe_type_id: number | null;

  base_servings: number;
  base_output_weight_g: number;
  container_weight_g: number | null;

  visibility: "private" | "public";
  status: RecipeStatus;
  family_id: string | null;
};
