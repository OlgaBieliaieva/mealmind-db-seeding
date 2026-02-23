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
  searchParams: {
    date?: string;
    view?: string;
  };
};

export default async function PlanPage({ searchParams }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const { date: queryDate, view: userView } = await searchParams;

  if (!queryDate || !userView) {
    redirect(`/plan?date=${today}&view=members`);
  }

  const date = queryDate ?? today;

  const familyId = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

  const plan = await getOrCreateMenuPlan(familyId, date);

  const fullData = await getMenuPlanFullData(familyId, date);

  const members = await getFamilyMembers(familyId);
  const mealTypes = await getMealTypes();

  const weekStart = getWeekStart(date);
  const fullWeek = generateFullWeek(weekStart);

  return (
    <>
      <PlanHeader
        familyName="Родина Шаповал"
        fullWeek={fullWeek}
        activeDate={date}
      />
      <PlanLayout
        planId={plan.menu_plan_id}
        members={members}
        mealTypes={mealTypes}
        entries={fullData?.entries ?? []}
        activeDate={date}
        recipesMap={fullData?.recipesMap ?? {}}
        productsMap={fullData?.productsMap ?? {}}
        recipeWeightMap={fullData?.recipeWeightMap ?? {}}
        productUnitMap={fullData?.productUnitMap ?? {}}
      />
    </>
  );
}
