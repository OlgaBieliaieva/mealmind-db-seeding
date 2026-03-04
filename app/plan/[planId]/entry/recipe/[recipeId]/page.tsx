export const dynamic = "force-dynamic";

import { getRecipeById } from "@/lib/recipes/getRecipeById";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getMenuPlanDetails } from "@/lib/menu-plans/menu-plan-details.read";
import { formatDateDDMMYY } from "@/lib/date/format";
import { getWeekRangeFromDate, generateFullWeek } from "@/lib/date/week";

import RecipeEntryDetailsClient from "@/components/menu-plan/recipe-entry/RecipeEntryDetailsClient";

type Props = {
  params: {
    planId: string;
    recipeId: string;
  };
  searchParams: {
    date?: string;
    mealTypeId?: string;
  };
};

export default async function RecipeEntryDetailsPage({
  params,
  searchParams,
}: Props) {
  const { planId, recipeId } = await params;
  const { date, mealTypeId } = await searchParams;

  if (!date) {
    return <div className="p-4">Date is required</div>;
  }

  const recipeFull = await getRecipeById(recipeId);
  if (!recipeFull) {
    return <div className="p-4">Recipe not found</div>;
  }

  // 🟣 Meal types
  const mealTypes = await getMealTypes();

  const initialMealTypeId = mealTypeId
    ? Number(mealTypeId)
    : (mealTypes[0]?.meal_type_id ?? 1);

  // const mealType = mealTypes.find((m) => m.meal_type_id === initialMealTypeId);

  // const mealName = mealType?.name_ua ?? "Прийом їжі";

  // 🟣 Plan → family → members
  const plan = await getMenuPlanDetails(planId);
  if (!plan) {
    return <div className="p-4">Plan not found</div>;
  }

  const members = await getFamilyMembers(plan.family_id);

  // 🟣 Week
  const { start, end } = getWeekRangeFromDate(date);
  const fullWeek = generateFullWeek(start);

  return (
    <RecipeEntryDetailsClient
      formMode="create"
      planId={planId}
      recipeFull={recipeFull}
      date={date}
      mealTypes={mealTypes}
      initialMealTypeId={initialMealTypeId}
      // mealName={mealName}
      weekLabel={`${formatDateDDMMYY(start)} – ${formatDateDDMMYY(end)}`}
      members={members}
      fullWeek={fullWeek}
    />
  );
}
