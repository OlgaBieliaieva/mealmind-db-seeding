"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RecipeCreateSchema,
  RecipeCreateInput,
} from "../schemas/recipe.create.schema";
import { mapRecipeFormToInput } from "../adapters/recipe-form.adapter";

import { createRecipe } from "@/shared/api/recipes/recipes.api";

export function useRecipeForm() {
  const form = useForm<RecipeCreateInput>({
    resolver: zodResolver(RecipeCreateSchema),

    defaultValues: {
      recipe: {
        title: "",
        description: "",
        base_servings: 1,
        base_output_weight_g: 100,
      },
      ingredients: [],
      steps: [],
      cuisine_ids: [],
      dietary_tag_ids: [],
    },
  });

  async function onSubmit(values: RecipeCreateInput) {
    const input = mapRecipeFormToInput(values);

    return createRecipe(input);
  }

  return {
    form,
    onSubmit,
  };
}
