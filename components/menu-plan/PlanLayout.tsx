"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";
import { NutritionDisplayItem } from "@/lib/nutrition/nutrition.adapter";
import { UserBalanceResult } from "@/types/nutrition-balance";
import ByMembersLayout from "./ByMembersLayout";
import ByMealsLayout from "./ByMealsLayout";
import ViewToggle from "./ViewToggle";

type ViewMode = "members" | "meals";

type Props = {
  planId: string;
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDate: string;
  selectedDays: string[];
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
  recipeWeightMap: Record<string, number>;
  productUnitMap: Record<string, string>;
  planNutrition: NutritionDisplayItem[];
  memberNutritionMap: Record<string, NutritionDisplayItem[]>;
  mealNutritionMap: Record<number, NutritionDisplayItem[]>;
  memberBalanceMap: Record<string, UserBalanceResult>;
};

export default function PlanLayout({
  planId,
  members,
  mealTypes,
  entries,
  activeDate,
  selectedDays,
  recipesMap,
  productsMap,
  recipeWeightMap,
  productUnitMap,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMultiMode = searchParams.get("days") !== null;

  const rawView = searchParams.get("view");

  const view: ViewMode = rawView === "meals" ? "meals" : "members";

  function setView(next: ViewMode) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);

    router.replace(`?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      <ViewToggle mode={view} setMode={setView} />

      {view === "members" ? (
        <ByMembersLayout
          planId={planId}
          members={members}
          mealTypes={mealTypes}
          entries={entries}
          activeDayId={activeDate}
          selectedDays={selectedDays}
          isMultiMode={isMultiMode}
          recipesMap={recipesMap}
          productsMap={productsMap}
          recipeWeightMap={recipeWeightMap}
          productUnitMap={productUnitMap}
        />
      ) : (
        <ByMealsLayout
          planId={planId}
          members={members}
          mealTypes={mealTypes}
          entries={entries}
          activeDayId={activeDate}
          selectedDays={selectedDays}
          isMultiMode={isMultiMode}
          recipesMap={recipesMap}
          productsMap={productsMap}
          recipeWeightMap={recipeWeightMap}
          productUnitMap={productUnitMap}
        />
      )}
    </div>
  );
}
