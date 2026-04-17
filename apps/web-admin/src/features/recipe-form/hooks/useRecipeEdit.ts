"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getRecipeDetails,
  updateRecipe,
} from "@/shared/api/recipes/recipes.api";

import {
  mapRecipeDtoToForm,
  mapRecipeFormToInput,
} from "@/features/recipe/mappers/recipe.mapper";

import { RecipeFormInput } from "../forms/recipe-form.context";

export function useRecipeEdit() {
  const params = useParams();
  const router = useRouter();
  const qc = useQueryClient();

  const id = params.id as string;

  // 🔥 GET DETAILS
  const query = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => getRecipeDetails(id),
    enabled: !!id,
  });

  // 🔥 MUTATION
  const mutation = useMutation({
    mutationFn: (form: RecipeFormInput) => {
      const input = mapRecipeFormToInput(form);
      return updateRecipe(id, input);
    },

    onSuccess: () => {
      toast.success("Рецепт оновлено");

      qc.invalidateQueries({ queryKey: ["recipes"] });
      qc.invalidateQueries({ queryKey: ["recipe-details", id] });

      router.push(`/admin/recipes/${id}`);
    },
  });

  return {
    recipe: query.data ? mapRecipeDtoToForm(query.data) : null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,

    update: mutation.mutate,
    isSaving: mutation.isPending,
  };
}
