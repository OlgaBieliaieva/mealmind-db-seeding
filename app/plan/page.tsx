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

  const weekStart = getWeekStart(activeDate);
  const fullWeek = generateFullWeek(weekStart);

  const familyId = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

  // 🔹 Plan + data
  const plan = await getOrCreateMenuPlan(familyId, activeDate);
  const fullData = await getMenuPlanFullData(familyId, activeDate);

  const entries = fullData?.entries ?? [];

  // 🔹 Filter once by selected days
  const filteredEntries = entries.filter((entry) =>
    selectedDays.includes(entry.date),
  );

  const members = await getFamilyMembers(familyId);
  const mealTypes = await getMealTypes();

  // =========================
  // 🔥 PHASE 1 — AGGREGATION
  // =========================

  const planNutritionResult = await buildPlanNutrition({
    entries: filteredEntries,
    recipeWeightMap: fullData?.recipeWeightMap ?? {},
    recipeNutrientsMap: {},
  });

  const planNutrition: AggregatedNutrients = planNutritionResult.aggregated;

  // Per-member
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

  // Per-meal
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

  // =========================
  // 🔥 PHASE 2 — READ REFERENCES
  // =========================

  const nutrientRefRows = await readSheet("nutrients_reference!A2:L");

  const nutrientRefs: NutrientReference[] = nutrientRefRows.map((row) => {
    const group = row[5];

    // 🔥 Runtime safety
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

  // =========================
  // 🔥 PHASE 3 — ADAPT FOR UI
  // =========================

  const planNutritionDisplay: NutritionDisplayItem[] = mapNutritionToDisplay(
    planNutrition,
    nutrientRefs,
  );

  const memberNutritionDisplayMap: Record<string, NutritionDisplayItem[]> = {};

  for (const member of members) {
    memberNutritionDisplayMap[member.user_id] = mapNutritionToDisplay(
      memberNutritionMap[member.user_id],
      nutrientRefs,
    );
  }

  const mealNutritionDisplayMap: Record<number, NutritionDisplayItem[]> = {};

  for (const meal of mealTypes) {
    mealNutritionDisplayMap[meal.meal_type_id] = mapNutritionToDisplay(
      mealNutritionMap[meal.meal_type_id],
      nutrientRefs,
    );
  }

  const periodDays = selectedDays.length;

  const memberBalanceMap: Record<string, BalanceResult> = {};

  for (const member of members) {
    const nutrition = memberNutritionDisplayMap[member.user_id];

    const targets = await getOrCreateUserTargets(member.user_id);

    const balance = evaluateUserBalance({
      nutrition,
      targets,
      periodDays,
    });

    memberBalanceMap[member.user_id] = balance;
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
        mealNutritionMap={mealNutritionDisplayMap}
        memberBalanceMap={memberBalanceMap}
      />
    </>
  );
}
