"use client";

import { useState } from "react";
import { useRecipeFavoritesMap } from "@/lib/hooks/useRecipeFavoritesMap";
import { RecipeFull } from "@/types/recipe-views";
import { MenuEntry } from "@/types/menu-entry";
import EntryHeader from "./EntryHeader";
import RecipeEntryTabs from "./RecipeEntryTabs";
import RecipeInfoBlock from "./RecipeInfoBlock";
import PlanningForm from "./PlanningForm";

type Props = {
  formMode: "create" | "edit";
  planId: string;
  recipeFull: RecipeFull;
  date: string;

  mealTypes: {
    meal_type_id: number;
    name_ua: string;
  }[];

  initialMealTypeId: number;
  // mealName: string;
  weekLabel: string;

  members: { user_id: string; first_name: string }[];
  fullWeek: string[];
  existingEntry?: MenuEntry;
};

const ADMIN_USER_ID = "9f3c2d44-6a91-4e5e-b8f3-2a1d7c0b5e11";
const ADMIN_FAMILY_ID = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

export default function RecipeEntryDetailsClient({
  formMode,
  planId,
  recipeFull,
  date,
  mealTypes,
  initialMealTypeId,
  weekLabel,
  members,
  fullWeek,
  existingEntry,
}: Props) {
  // 🔹 UI режим вкладок
  const [viewMode, setViewMode] = useState<"planning" | "cooking">("planning");

  const [selectedMealTypeId, setSelectedMealTypeId] =
    useState(initialMealTypeId);

  const { map, toggle } = useRecipeFavoritesMap(ADMIN_USER_ID, ADMIN_FAMILY_ID);

  const isFavorite = Boolean(map[recipeFull.recipe.recipe_id]);

  const defaultPortion =
    recipeFull.recipe.base_servings > 0
      ? Math.round(
          recipeFull.recipe.base_output_weight_g /
            recipeFull.recipe.base_servings,
        )
      : 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryHeader
        weekLabel={weekLabel}
        mealTypes={mealTypes}
        selectedMealTypeId={selectedMealTypeId}
        onMealTypeChange={setSelectedMealTypeId}
      />

      <RecipeEntryTabs mode={viewMode} onChange={setViewMode} />

      <RecipeInfoBlock
        recipeFull={recipeFull}
        isFavorite={isFavorite}
        onToggleFavorite={() => toggle(recipeFull.recipe.recipe_id)}
      />

      {viewMode === "planning" && (
        <PlanningForm
          formMode={formMode}
          planId={planId}
          entryType="recipe"
          entryId={recipeFull.recipe.recipe_id}
          mealTypeId={selectedMealTypeId}
          members={members}
          defaultWeight={defaultPortion}
          baseWeight={recipeFull.recipe.base_output_weight_g}
          nutrients={recipeFull.nutrients}
          unit="g"
          fullWeek={fullWeek}
          date={date}
          existingEntry={existingEntry}
        />
      )}

      {viewMode === "cooking" && (
        <div className="p-4 bg-white">Cooking режим буде тут</div>
      )}
    </div>
  );
}
