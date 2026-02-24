export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getOrCreateMenuPlan } from "@/lib/menu-plans/menu-plan.service";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getWeekStart } from "@/lib/date/getWeekStart";
import { generateFullWeek } from "@/lib/date/week";
import { getMenuPlanFullData } from "@/lib/menu-plans/menu-plans.read";
import { buildPlanNutrition } from "@/lib/nutrition/nutrition.service";
import { AggregatedNutrients } from "@/types/nutrition-aggregation";
import PlanLayout from "@/components/menu-plan/PlanLayout";
import PlanHeader from "@/components/menu-plan/PlanHeader";

type Props = {
  searchParams: Promise<{
    date?: string;
    days?: string;
    view?: string;
  }>;
};

export default async function PlanPage({ searchParams }: Props) {
  const { date, days } = await searchParams;

  const today = new Date().toISOString().split("T")[0];

  if (!date) {
    redirect(`/plan?date=${today}&view=members`);
  }

  const activeDate = date;
  const selectedDays = days ? days.split(",").sort() : [activeDate];

  const weekStart = getWeekStart(activeDate);
  const fullWeek = generateFullWeek(weekStart);

  const familyId = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

  const plan = await getOrCreateMenuPlan(familyId, activeDate);
  const fullData = await getMenuPlanFullData(familyId, activeDate);

  const entries = fullData?.entries ?? [];

  // 🔹 Фільтруємо по selectedDays один раз
  const filteredEntries = entries.filter((entry) =>
    selectedDays.includes(entry.date),
  );

  const members = await getFamilyMembers(familyId);
  const mealTypes = await getMealTypes();

  // 🔹 Загальна агрегація
  const planNutritionResult = await buildPlanNutrition({
    entries: filteredEntries,
    recipeWeightMap: fullData?.recipeWeightMap ?? {},
    recipeNutrientsMap: {}, // рецепти поки що не підключені
  });

  const planNutrition: AggregatedNutrients = planNutritionResult.aggregated;

  // 🔹 Per-member агрегація
  const memberNutritionMap: Record<string, AggregatedNutrients> = {};

  for (const member of members) {
    const memberEntries = filteredEntries.filter(
      (e) => e.user_id === member.user_id,
    );

    const result = await buildPlanNutrition({
      entries: memberEntries,
      recipeWeightMap: fullData?.recipeWeightMap ?? {},
      recipeNutrientsMap: {},
    });

    memberNutritionMap[member.user_id] = result.aggregated;
  }

  // 🔹 Per-meal агрегація
  const mealNutritionMap: Record<number, AggregatedNutrients> = {};

  for (const meal of mealTypes) {
    const mealEntries = filteredEntries.filter(
      (e) => e.meal_type_id === meal.meal_type_id,
    );

    const result = await buildPlanNutrition({
      entries: mealEntries,
      recipeWeightMap: fullData?.recipeWeightMap ?? {},
      recipeNutrientsMap: {},
    });

    mealNutritionMap[meal.meal_type_id] = result.aggregated;
  }

  return (
    <>
      <PlanHeader
        familyName="Родина Шаповал"
        fullWeek={fullWeek}
        activeDate={activeDate}
        selectedDays={selectedDays}
      />

      <PlanLayout
        planId={plan.menu_plan_id}
        members={members}
        mealTypes={mealTypes}
        entries={entries}
        activeDate={activeDate}
        selectedDays={selectedDays}
        recipesMap={fullData?.recipesMap ?? {}}
        productsMap={fullData?.productsMap ?? {}}
        recipeWeightMap={fullData?.recipeWeightMap ?? {}}
        productUnitMap={fullData?.productUnitMap ?? {}}
        planNutrition={planNutrition}
        memberNutritionMap={memberNutritionMap}
        mealNutritionMap={mealNutritionMap}
      />
    </>
  );
}
