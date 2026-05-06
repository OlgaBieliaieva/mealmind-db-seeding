"use client";

import { RecipeDetailsDTO } from "../../types/recipe-details.types";

export function RecipeHeaderCard({ recipe }: { recipe: RecipeDetailsDTO }) {
  return (
    <div className="space-y-3">
      {/* TITLE */}
      <h1 className="text-xl font-semibold text-gray-900 leading-tight">
        {recipe.name}
      </h1>

      {/* META */}
      {/* <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
        {recipe.categoryName && <span>{recipe.categoryName}</span>}
        {recipe.cuisines?.length > 0 && (
          <span>• {recipe.cuisines[0].name}</span>
        )}
      </div> */}

      {/* DESCRIPTION */}
      {recipe.description && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {recipe.description}
        </p>
      )}
    </div>
  );
}

// export function RecipeHeaderCard({ recipe }: { recipe: RecipeDetailsDTO }) {
//   return (
//     <div className="space-y-2">
//       <h1 className="text-xl font-semibold text-gray-900">{recipe.name}</h1>

//       <div className="text-sm text-gray-500">{recipe.description}</div>
//     </div>
//   );
// }
