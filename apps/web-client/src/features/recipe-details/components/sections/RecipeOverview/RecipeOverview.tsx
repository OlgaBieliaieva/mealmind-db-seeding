"use client";

import { Card } from "./components/Card";
import { StatCard } from "./components/StatCard";
import { MacroItem } from "./components/MacroItem";
import { MetaRow } from "./components/MetaRow";
import { RecipeAuthorCard } from "./components/RecipeAuthorCard";
import { ExpandableText } from "./components/ExpandableText";

import { getCuisineLabel } from "./utils/getCuisineLabel";
import { getDifficultyLabel } from "./utils/getDifficultyLabel";

import { RecipeDetailsDTO } from "../../../types/recipe-details.types";

export function RecipeOverview({ recipe }: { recipe: RecipeDetailsDTO }) {
  const { macros } = recipe;

  return (
    <div className="mt-4 space-y-5">
      {/* PRIMARY */}
      <section className="grid grid-cols-4 gap-2">
        <StatCard label="Підготовка" value={`${recipe.prepTime ?? 0} хв`} />
        <StatCard label="Готування" value={`${recipe.cookTime ?? 0} хв`} />

        <StatCard
          label="Порції"
          value={`${recipe.baseServings ?? 0}`}
          sub={`~${Math.round(recipe.baseServingWeightG)} г`}
        />

        {recipe.difficulty && (
          <StatCard
            label="Складність"
            value={getDifficultyLabel(recipe.difficulty)}
          />
        )}
      </section>

      {/* MACROS */}
      <Card>
        <div className="text-xs text-gray-400 mb-2">На 100 г</div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <MacroItem label="Ккал" value={macros.calories} />
          <MacroItem label="Б" value={macros.proteins} />
          <MacroItem label="Ж" value={macros.fats} />
          <MacroItem label="В" value={macros.carbs} />
        </div>
      </Card>

      {/* META */}
      <Card>
        <MetaRow label="Тип" value={recipe.categoryName} icon="🍽" />
        <MetaRow
          label="Кухня"
          value={getCuisineLabel(recipe.cuisines)}
          icon="🌍"
        />
      </Card>

      {/* AUTHOR */}
      <RecipeAuthorCard author={recipe.author} />

      {/* DESCRIPTION */}
      {recipe.fullDescription && (
        <Card>
          <ExpandableText text={recipe.fullDescription} lines={2} />
        </Card>
      )}
    </div>
  );
}
