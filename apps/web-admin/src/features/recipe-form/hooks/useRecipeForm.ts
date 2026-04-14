"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { RecipeCreateSchema } from "../schemas/recipe.create.schema";
import { mapRecipeFormToInput } from "../adapters/recipe-form.adapter";

import { createRecipe } from "@/shared/api/recipes/recipes.api";
import { clearRecipeDraft } from "@/shared/lib/recipe/recipe-draft";

type FormInput = z.input<typeof RecipeCreateSchema>;
type FormOutput = z.output<typeof RecipeCreateSchema>;

export function useRecipeForm() {
  const router = useRouter();
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
      ingredients: [],
      steps: [],
      cuisine_ids: [],
      dietary_tag_ids: [],
    },
  });

  async function onSubmit(values: FormInput) {
    const input = mapRecipeFormToInput(values);

    try {
      await createRecipe(input);
      clearRecipeDraft();
      router.push("/admin/recipes");
    } catch (e) {
      console.error("Create recipe failed", e);
      throw e; 
    }
  }

  return {
    form,
    onSubmit,
  };
}
