"use client";

import { RecipeDetailsDTO } from "../../types/recipe-details.types";

export function RecipeHeaderCard({ recipe }: { recipe: RecipeDetailsDTO }) {
  return (
    <div className="space-y-3">
      {/* TITLE */}
      <h1 className="text-xl font-semibold text-gray-900 leading-tight">
        {recipe.name}
      </h1>

      {/* DESCRIPTION */}
      {recipe.description && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {recipe.description}
        </p>
      )}
    </div>
  );
}
