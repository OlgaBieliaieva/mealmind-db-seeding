"use client";

import { useRouter } from "next/navigation";

import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";
import { Badge } from "@/shared/ui/badge/Badge";

import { getRecipeStatusLabel, getRecipeStatusVariant } from "../../adapters/recipe-status.adapter";

import { getRecipeVisibilityLabel, getRecipeVisibilityVariant } from "../../adapters/recipe-visibility.adapter";

import { RecipeDetailsBackLink } from "./RecipeDetailsBackLink";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsStickyHeader({ recipe }: Props) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-xl flex flex-col gap-2 px-4 py-3">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          <RecipeDetailsBackLink />

          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/admin/recipes/${recipe.id}/edit`)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
            >
              Змінити
            </button>
          </div>
        </div>

        {/* TITLE */}
        <div className="font-semibold truncate">{recipe.title}</div>

        {/* BADGES */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant={getRecipeStatusVariant(recipe.status)}>
            {getRecipeStatusLabel(recipe.status)}
          </Badge>

          <Badge variant={getRecipeVisibilityVariant(recipe.visibility)}>
            {getRecipeVisibilityLabel(recipe.visibility)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
