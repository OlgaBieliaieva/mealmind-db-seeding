"use client";

import { useRecipeEdit } from "../hooks/useRecipeEdit";

import { PageLoader } from "@/shared/ui/page/PageLoader";
import { PageError } from "@/shared/ui/page/PageError";

import { RecipeForm } from "@/features/recipe-form/components/RecipeForm";

export function RecipeEditPage() {
  const { recipe, isLoading, isError, refetch, update, isSaving } =
    useRecipeEdit();

  if (isLoading) {
    return <PageLoader title="Завантаження рецепта..." />;
  }

  if (isError || !recipe) {
    return (
      <PageError title="Не вдалося завантажити рецепт" onRetry={refetch} />
    );
  }

  return (
    <RecipeForm
      defaultValues={recipe}
      onSubmit={update}
      isSubmitting={isSaving}
      mode="edit"
    />
  );
}
