export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getOrCreateMenuPlan } from "@/lib/menu-plans/menu-plan.service";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getWeekStart } from "@/lib/date/getWeekStart";
import { generateFullWeek } from "@/lib/date/week";
import { getMenuPlanFullData } from "@/lib/menu-plans/menu-plans.read";
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

  const members = await getFamilyMembers(familyId);
  const mealTypes = await getMealTypes();

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
        entries={fullData?.entries ?? []}
        activeDate={activeDate}
        selectedDays={selectedDays}
        recipesMap={fullData?.recipesMap ?? {}}
        productsMap={fullData?.productsMap ?? {}}
        recipeWeightMap={fullData?.recipeWeightMap ?? {}}
        productUnitMap={fullData?.productUnitMap ?? {}}
      />
    </>
  );
}
