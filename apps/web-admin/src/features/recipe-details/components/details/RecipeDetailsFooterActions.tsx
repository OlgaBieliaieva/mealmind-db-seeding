"use client";

import { useRouter } from "next/navigation";
import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsFooterActions({ recipe }: Props) {
  const router = useRouter();

  function handleEdit() {
    router.push(`/admin/recipes/${recipe.id}/edit`);
  }

  function handlePublish() {
    console.log("publish", recipe.id);
  }

  function handleArchive() {
    console.log("archive", recipe.id);
  }

  function handleRestore() {
    console.log("restore", recipe.id);
  }

  function handleDelete() {
    console.log("delete", recipe.id);
  }

  return (
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

        {recipe.status === "draft" && (
          <button
            onClick={handlePublish}
            className="text-sm border px-4 py-2 rounded bg-green-100 text-green-700"
          >
            Опублікувати
          </button>
        )}

        {recipe.status === "ready" && (
          <button
            onClick={handlePublish}
            className="text-sm border px-4 py-2 rounded bg-green-100 text-green-700"
          >
            Опублікувати
          </button>
        )}

        {recipe.status === "published" && (
          <button
            onClick={handleArchive}
            className="text-sm border px-4 py-2 rounded bg-gray-100 text-gray-700"
          >
            Архівувати
          </button>
        )}

        {recipe.status === "archived" && (
          <>
            <button
              onClick={handleRestore}
              className="text-sm border px-4 py-2 rounded bg-yellow-100 text-yellow-700"
            >
              Відновити
            </button>

            <button
              onClick={handleDelete}
              className="text-sm border px-4 py-2 rounded bg-red-100 text-red-700"
            >
              Видалити
            </button>
          </>
        )}
      </div>
    </div>
  );
}
