export type RecipeCreatePayload = {
  title: string;
  description: string;
  recipe_type_id: number | null;

  base_servings: number;
  base_output_weight_g: number;
  container_weight_g?: number | null;

  visibility: "private" | "public";
  status: "ready";

  family_id?: string | null;
};
