export const dynamic = "force-dynamic";

import { getMenuEntryById } from "@/lib/menu-entries/menu-entries.read";
import { getRecipeById } from "@/lib/recipes/getRecipeById";
import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getMenuPlanDetails } from "@/lib/menu-plans/menu-plan-details.read";
import { generateFullWeek, getWeekRangeFromDate } from "@/lib/date/week";
import { formatDateDDMMYY } from "@/lib/date/format";
import RecipeEntryDetailsClient from "@/components/menu-plan/recipe-entry/RecipeEntryDetailsClient";

type Props = {
  params: {
    planId: string;
    menuEntryId: string;
  };
};

export default async function EditMenuEntryPage({ params }: Props) {
  const { planId, menuEntryId } = await params;

  const entry = await getMenuEntryById(menuEntryId);
  if (!entry) return <div className="p-4">Entry not found</div>;

  if (entry.entry_type !== "recipe") {
    return <div className="p-4">Only recipe editing supported</div>;
  }

  const recipeFull = await getRecipeById(entry.entry_id);
  if (!recipeFull) return <div className="p-4">Recipe not found</div>;

  // 🔹 meal types
  const mealTypes = await getMealTypes();

  const selectedMealType = mealTypes.find(
    (m) => m.meal_type_id === entry.meal_type_id,
  );

  // 🔹 week
  const { start, end } = getWeekRangeFromDate(entry.date);
  const fullWeek = generateFullWeek(start);

  // 🔹 plan → family
  const plan = await getMenuPlanDetails(planId);

  if (!plan) return <div className="p-4">Menu plan not found</div>;

  const members = await getFamilyMembers(plan.family_id);
  return (
    <RecipeEntryDetailsClient
      formMode="edit"
      planId={planId}
      recipeFull={recipeFull}
      // entryType="recipe"
      // entryId={entry.entry_id}
      // mealTypeId={entry.meal_type_id}
      date={entry.date}
      mealTypes={mealTypes}
      initialMealTypeId={entry.meal_type_id}
      mealName={selectedMealType?.name_ua ?? ""}
      weekLabel={`${formatDateDDMMYY(start)} – ${formatDateDDMMYY(end)}`}
      members={members}
      fullWeek={fullWeek}
      existingEntry={entry}
    />
  );
}
