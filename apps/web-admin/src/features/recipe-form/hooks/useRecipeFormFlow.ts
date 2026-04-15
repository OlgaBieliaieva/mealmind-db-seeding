"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { mapRecipeFormToInput } from "@/features/recipe/mappers/recipe.mapper";

import { useCreateRecipe } from "./useCreateRecipe";
import { clearRecipeDraft } from "@/shared/lib/recipe/recipe-draft";

export function useRecipeFormFlow() {
  const router = useRouter();

  const createRecipeMutation = useCreateRecipe();

  async function submit(values: RecipeCreateInput) {
    try {
      const payload = mapRecipeFormToInput(values);
      console.log(payload);

      await createRecipeMutation.mutateAsync(payload);

      clearRecipeDraft();

      toast.success("Рецепт створено");

      router.push("/admin/recipes");
    } catch (e) {
      console.error(e);
      toast.error("Помилка при створенні рецепта");
      throw e;
    }
  }

  return {
    submit,
    isSubmitting: createRecipeMutation.isPending,
    isError: createRecipeMutation.isError,
    isSuccess: createRecipeMutation.isSuccess,
  };
}
