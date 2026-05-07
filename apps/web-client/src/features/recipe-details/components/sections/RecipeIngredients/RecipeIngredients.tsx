"use client";

import { ServingsInfo } from "./components/ServingsInfo";
import { IngredientItem } from "./components/IngredientItem";
import { SectionTitle } from "./components/SectionTitle";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";

export function RecipeIngredients({ recipe }: { recipe: RecipeDetailsDTO }) {
  return (
    <div className="mt-4 space-y-5 pb-16">
      {/* SERVINGS INFO */}
      <ServingsInfo recipe={recipe} />

      {/* INGREDIENTS */}
      <div className="space-y-2">
        <SectionTitle>Інгредієнти ({recipe.ingredients.length})</SectionTitle>

        <div className="space-y-2">
          {recipe.ingredients.map((ingredient) => (
            <IngredientItem key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </div>
  );
}
