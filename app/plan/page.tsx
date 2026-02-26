export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { readSheet } from "@/lib/sheets.read";
import { getOrCreateUserTargets } from "@/lib/nutrition/user-targets.service";
import { getOrCreateMenuPlan } from "@/lib/menu-plans/menu-plan.service";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getWeekStart } from "@/lib/date/getWeekStart";
import { generateFullWeek } from "@/lib/date/week";
import { getMenuPlanFullData } from "@/lib/menu-plans/menu-plans.read";
import { buildPlanNutrition } from "@/lib/nutrition/nutrition.service";
import { aggregateSingleEntryNutrients } from "@/lib/nutrition/nutrition.aggregate";
import { AggregatedNutrients } from "@/types/nutrition-aggregation";
import { NutrientReference } from "@/types/nutrient.dto";
import {
  mapNutritionToDisplay,
  NutritionDisplayItem,
} from "@/lib/nutrition/nutrition.adapter";
import PlanLayout from "@/components/menu-plan/PlanLayout";
import PlanHeader from "@/components/menu-plan/PlanHeader";
import { evaluateUserBalance } from "@/lib/nutrition/balance.service";
import { BalanceResult } from "@/types/nutrition-balance";

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
  const periodDays = selectedDays.length;

  const weekStart = getWeekStart(activeDate);
  const fullWeek = generateFullWeek(weekStart);

  const familyId = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

  // =========================
  // 🔹 PLAN + DATA
  // =========================

  const plan = await getOrCreateMenuPlan(familyId, activeDate);
  const fullData = await getMenuPlanFullData(familyId, activeDate);

  const entries = fullData?.entries ?? [];

  const filteredEntries = entries.filter((entry) =>
    selectedDays.includes(entry.date),
  );

  const members = await getFamilyMembers(familyId);
  const mealTypes = await getMealTypes();

  // =========================
  // 🔥 PHASE 1 — PLAN AGGREGATION
  // =========================

  const planNutritionResult = await buildPlanNutrition({
    entries: filteredEntries,
    recipeWeightMap: fullData?.recipeWeightMap ?? {},
    recipeNutrientsMap: {},
  });

  const planNutrition: AggregatedNutrients = planNutritionResult.aggregated;

  const productNutrientsMap = planNutritionResult.productNutrientsMap;

  // =========================
  // 🔥 PHASE 2 — MEMBER AGGREGATION
  // =========================

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

  // =========================
  // 🔥 PHASE 3 — MEMBER / MEAL AGGREGATION
  // =========================

  const memberMealNutritionMap: Record<
    string,
    Record<number, AggregatedNutrients>
  > = {};

  for (const member of members) {
    const mealMap: Record<number, AggregatedNutrients> = {};

    for (const meal of mealTypes) {
      const mealEntries = filteredEntries.filter(
        (e) =>
          e.user_id === member.user_id && e.meal_type_id === meal.meal_type_id,
      );

      const result = await buildPlanNutrition({
        entries: mealEntries,
        recipeWeightMap: fullData?.recipeWeightMap ?? {},
        recipeNutrientsMap: {},
      });

      mealMap[meal.meal_type_id] = result.aggregated;
    }

    memberMealNutritionMap[member.user_id] = mealMap;
  }

  // =========================
  // 🔥 PHASE 4 — DISH-LEVEL AGGREGATION
  // =========================

  const memberDishNutritionMap: Record<
    string,
    Record<string, NutritionDisplayItem[]>
  > = {};

  // Потрібні nutrientRefs для map → тому читаємо їх раніше

  const nutrientRefRows = await readSheet("nutrients_reference!A2:L");

  const nutrientRefs: NutrientReference[] = nutrientRefRows.map((row) => {
    const group = row[5];

    if (
      group !== "macro" &&
      group !== "vitamin" &&
      group !== "mineral" &&
      group !== "other"
    ) {
      throw new Error(`Invalid nutrient_group value: ${group}`);
    }

    return {
      nutrient_id: row[0],
      code: row[1],
      name: {
        en: row[2],
        ua: row[3],
      },
      default_unit: row[4],
      nutrient_group: group,
      sort_order: Number(row[6]),
      rda_value: row[7] ? Number(row[7]) : undefined,
      rda_unit: row[8] || undefined,
    };
  });

  for (const member of members) {
    const dishMap: Record<string, NutritionDisplayItem[]> = {};

    const memberEntries = filteredEntries.filter(
      (e) => e.user_id === member.user_id,
    );

    for (const entry of memberEntries) {
      const aggregated = aggregateSingleEntryNutrients(entry, {
        recipeWeightMap: fullData?.recipeWeightMap ?? {},
        recipeNutrientsMap: {},
        productNutrientsMap,
      });

      dishMap[entry.menu_entry_id] = mapNutritionToDisplay(
        aggregated,
        nutrientRefs,
      );
    }

    memberDishNutritionMap[member.user_id] = dishMap;
  }

  // =========================
  // 🔥 PHASE 5 — DISPLAY MAPS
  // =========================

  const planNutritionDisplay = mapNutritionToDisplay(
    planNutrition,
    nutrientRefs,
  );

  const memberNutritionDisplayMap: Record<string, NutritionDisplayItem[]> = {};

  const memberMealNutritionDisplayMap: Record<
    string,
    Record<number, NutritionDisplayItem[]>
  > = {};

  for (const member of members) {
    memberNutritionDisplayMap[member.user_id] = mapNutritionToDisplay(
      memberNutritionMap[member.user_id],
      nutrientRefs,
    );

    const mealDisplayMap: Record<number, NutritionDisplayItem[]> = {};

    for (const meal of mealTypes) {
      mealDisplayMap[meal.meal_type_id] = mapNutritionToDisplay(
        memberMealNutritionMap[member.user_id][meal.meal_type_id],
        nutrientRefs,
      );
    }

    memberMealNutritionDisplayMap[member.user_id] = mealDisplayMap;
  }

  // =========================
  // 🔥 PHASE 6 — BALANCE
  // =========================

  const memberBalanceMap: Record<string, BalanceResult> = {};

  const memberTargetsMap: Record<string, Record<string, number>> = {};

  for (const member of members) {
    const nutrition = memberNutritionDisplayMap[member.user_id];

    const targets = await getOrCreateUserTargets(member.user_id);

    const balance = evaluateUserBalance({
      nutrition,
      targets,
      periodDays,
    });

    memberBalanceMap[member.user_id] = balance;

    memberTargetsMap[member.user_id] = targets;
  }

  // =========================
  // 🔥 RENDER
  // =========================

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
        planNutrition={planNutritionDisplay}
        memberNutritionMap={memberNutritionDisplayMap}
        memberMealNutritionMap={memberMealNutritionDisplayMap}
        memberDishNutritionMap={memberDishNutritionMap}
        memberBalanceMap={memberBalanceMap}
        memberTargetsMap={memberTargetsMap}
      />
    </>
  );
}
