"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

import { Badge } from "@/shared/ui/badge/Badge";
import { ConfirmModal } from "@/shared/ui/modal/ConfirmModal";

import {
  getRecipeStatusLabel,
  getRecipeStatusVariant,
} from "../../adapters/recipe-status.adapter";

import {
  getRecipeVisibilityLabel,
  getRecipeVisibilityVariant,
} from "../../adapters/recipe-visibility.adapter";

import { RecipeDetailsBackLink } from "./RecipeDetailsBackLink";

import { useRecipeStatusActions } from "../../hooks/useRecipeStatusActions";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsStickyHeader({ recipe }: Props) {
  const router = useRouter();

  const { publish, archive, restore } = useRecipeStatusActions();
  const deleteMutation = useDeleteRecipe();

  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleEdit() {
    router.push(`/admin/recipes/${recipe.id}/edit`);
  }

  function handleDelete() {
    deleteMutation.mutate(recipe.id, {
      onSuccess: () => {
        router.push("/admin/recipes");
      },
    });
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-xl flex flex-col gap-2 px-4 py-3">
          {/* TOP ROW */}
          <div className="flex items-center justify-between">
            <RecipeDetailsBackLink />

            <div className="flex gap-2 flex-wrap">
              {/* EDIT */}
              <button
                onClick={handleEdit}
                className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
              >
                Змінити
              </button>

              {/* STATUS ACTIONS */}

              {(recipe.status === "draft" || recipe.status === "ready") && (
                <button
                  onClick={() => publish.mutate(recipe.id)}
                  disabled={publish.isPending}
                  className="text-sm border px-3 py-1 rounded bg-green-100 text-green-700 disabled:opacity-50"
                >
                  Опублікувати
                </button>
              )}

              {recipe.status === "published" && (
                <button
                  onClick={() => archive.mutate(recipe.id)}
                  disabled={archive.isPending}
                  className="text-sm border px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
                >
                  Архівувати
                </button>
              )}

              {recipe.status === "archived" && (
                <>
                  <button
                    onClick={() => restore.mutate(recipe.id)}
                    disabled={restore.isPending}
                    className="text-sm border px-3 py-1 rounded bg-yellow-100 text-yellow-700 disabled:opacity-50"
                  >
                    Відновити
                  </button>

                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="text-sm border px-3 py-1 rounded bg-red-100 text-red-700"
                  >
                    Видалити
                  </button>
                </>
              )}
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

      {/* 🔥 CONFIRM MODAL */}
      <ConfirmModal
        open={confirmOpen}
        title="Видалити рецепт?"
        description="Цю дію неможливо скасувати"
        confirmText="Видалити"
        isLoading={deleteMutation.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
