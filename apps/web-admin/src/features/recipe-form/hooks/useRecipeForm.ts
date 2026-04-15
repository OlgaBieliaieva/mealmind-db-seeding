"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RecipeCreateSchema } from "../schemas/recipe.create.schema";
import { useRecipeFormFlow } from "./useRecipeFormFlow";

type FormInput = z.input<typeof RecipeCreateSchema>;
type FormOutput = z.output<typeof RecipeCreateSchema>;

export function useRecipeForm() {
  const form = useForm<FormInput, FormOutput>({
    resolver: zodResolver(RecipeCreateSchema),

    defaultValues: {
      recipe: {
        title: "",
        description: "",
        output_weight_mode: "auto",
        base_servings: 1,
        base_output_weight_g: 0,
        container_weight_g: 0,
      },
      videos: [],
      ingredients: [],
      steps: [],
      cuisine_ids: [],
      dietary_tag_ids: [],
    },
  });

  const flow = useRecipeFormFlow();

  return {
    form,
    onSubmit: flow.submit,
    isSubmitting: flow.isSubmitting,
  };
}
