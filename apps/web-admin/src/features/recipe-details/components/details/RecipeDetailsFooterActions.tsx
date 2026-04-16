"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";
import { useRecipeStatusActions } from "../../hooks/useRecipeStatusActions";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";

import { ConfirmModal } from "@/shared/ui/modal/ConfirmModal";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsFooterActions({ recipe }: Props) {
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
      <div className="mt-10 border-t pt-6">
        <div className="flex justify-end gap-3 flex-wrap">
          {/* EDIT */}
          <button
            onClick={handleEdit}
            className="text-sm border px-4 py-2 rounded hover:bg-gray-50"
          >
            Змінити
          </button>

          {/* STATUS ACTIONS */}
          {(recipe.status === "draft" || recipe.status === "ready") && (
            <button
              onClick={() => publish.mutate(recipe.id)}
              disabled={publish.isPending}
              className="text-sm border px-4 py-2 rounded bg-green-100 text-green-700 disabled:opacity-50"
            >
              Опублікувати
            </button>
          )}

          {recipe.status === "published" && (
            <button
              onClick={() => archive.mutate(recipe.id)}
              disabled={archive.isPending}
              className="text-sm border px-4 py-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              Архівувати
            </button>
          )}

          {recipe.status === "archived" && (
            <>
              <button
                onClick={() => restore.mutate(recipe.id)}
                disabled={restore.isPending}
                className="text-sm border px-4 py-2 rounded bg-yellow-100 text-yellow-700 disabled:opacity-50"
              >
                Відновити
              </button>

              <button
                onClick={() => setConfirmOpen(true)}
                className="text-sm border px-4 py-2 rounded bg-red-100 text-red-700"
              >
                Видалити
              </button>
            </>
          )}
        </div>
      </div>

      {/* CONFIRM MODAL */}
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
