export const dynamic = "force-dynamic";

import { getMenuPlanDetails } from "@/lib/menu-plans/menu-plan-details.read";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getWeekRangeFromDate, generateFullWeek } from "@/lib/date/week";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import PlanLayout from "@/components/menu-plan/PlanLayout";
import PlanHeader from "@/components/menu-plan/PlanHeader";

type Props = {
  params: { id: string };
  searchParams: {
    date?: string;
    view?: string;
  };
};

export default async function MenuPlanDetailsPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;

  const plan = await getMenuPlanDetails(id);
  const mealTypes = await getMealTypes();

  if (!plan) {
    return <div>Menu plan not found</div>;
  }

  const members = await getFamilyMembers(plan.family_id);

  // 🟣 Week based on selected date OR plan start
  const { date } = await searchParams;
  const baseDate = date ?? plan.start_date;
  const week = getWeekRangeFromDate(baseDate);
  const fullWeek = generateFullWeek(week.start);

  const activeDate = date ?? fullWeek[0];

  return (
    <>
      <PlanHeader
        familyName="Родина Шаповал"
        fullWeek={fullWeek}
        activeDate={activeDate}
      />

      <PlanLayout
        planId={plan.menu_plan_id}
        members={members}
        mealTypes={mealTypes}
        entries={plan.entries}
        recipesMap={plan.recipesMap}
        productsMap={plan.productsMap}
        activeDate={activeDate}
      />
    </>
  );
}
