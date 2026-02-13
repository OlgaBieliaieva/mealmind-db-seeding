export const dynamic = "force-dynamic";

import { getMenuPlanDetails } from "@/lib/menu-plans/menu-plan-details.read";
import { getWeekRangeFromDate, generateFullWeek } from "@/lib/date/week";
import { formatDateDDMMYY } from "@/lib/date/format";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import PlanLayout from "@/components/menu-plan/PlanLayout";
import { getFamilyMembers } from "@/lib/families/family-members.read";

type Props = {
  params: {
    id: string;
  };
};

export default async function MenuPlanDetailsPage({ params }: Props) {
  const { id } = await params;
  const plan = await getMenuPlanDetails(id);
  const mealTypes = await getMealTypes();

  if (!plan) {
    return <div>Menu plan not found</div>;
  }
  const members = await getFamilyMembers(plan.family_id);
  const week = getWeekRangeFromDate(plan.start_date);
  const fullWeek = generateFullWeek(week.start);

  const planDaysMap = new Map(plan.days.map((d) => [d.date, d.menu_day_id]));
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-gray-900">Menu planning</h1>
          <p className="text-sm text-gray-500">
            {formatDateDDMMYY(week.start)} — {formatDateDDMMYY(week.end)}
          </p>
        </div>
      </div>
      <PlanLayout
        planId={plan.menu_plan_id}
        members={members}
        mealTypes={mealTypes}
        entries={plan.entries}
        fullWeek={fullWeek}
        planDaysMap={planDaysMap}
        recipesMap={plan.recipesMap}
        productsMap={plan.productsMap}
      />
    </>
  );
}
