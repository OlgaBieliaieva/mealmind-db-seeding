"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FamilyMember } from "@/lib/v1/families/family-members.read";
import { MealType } from "@/lib/v1/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";
import { NutritionDisplayItem } from "@/lib/v1/nutrition/nutrition.adapter";
import { BalanceResult } from "@/types/nutrition-balance";
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
  memberBalanceMap: Record<string, BalanceResult>;
  memberTargetsMap: Record<string, Record<string, number>>;
  memberMealNutritionMap: Record<
    string,
    Record<number, NutritionDisplayItem[]>
  >;
  memberDishNutritionMap: Record<
    string,
    Record<string, NutritionDisplayItem[]>
  >;
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
  memberBalanceMap,
  memberNutritionMap,
  memberTargetsMap,
  memberMealNutritionMap,
  memberDishNutritionMap,
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
          memberBalanceMap={memberBalanceMap}
          memberNutritionMap={memberNutritionMap}
          memberTargetsMap={memberTargetsMap}
          memberMealNutritionMap={memberMealNutritionMap}
          memberDishNutritionMap={memberDishNutritionMap}
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
