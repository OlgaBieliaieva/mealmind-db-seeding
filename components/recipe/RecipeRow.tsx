"use client";

import Link from "next/link";

type Props = {
  recipe: {
    recipe_id: string;
    title: string;
    status: string;
    visibility: string;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function RecipeRow({ recipe, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="flex items-center justify-between rounded border p-3">
      <Link
        href={`/admin/recipes/${recipe.recipe_id}`}
        className="flex-1 hover:underline"
      >
        <div className="font-medium">{recipe.title}</div>
        <div className="text-xs text-gray-500">
          {recipe.status} · {recipe.visibility}
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="ml-3 text-xl"
      >
        {isFavorite ? "⭐" : "☆"}
      </button>
    </div>
  );
}
