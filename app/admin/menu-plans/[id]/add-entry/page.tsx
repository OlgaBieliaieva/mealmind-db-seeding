export const dynamic = "force-dynamic";

import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import EntryPickerHeader from "@/components/entry-picker/EntryPickerHeader";

type Props = {
  params: { id: string };
  searchParams: {
    dayId?: string;
    mealTypeId?: string;
    userId?: string;
  };
};

export default async function AddEntryPage({ params, searchParams }: Props) {
  const { id: planId } = params;
  const { dayId, mealTypeId, userId } = searchParams;

  if (!dayId || !mealTypeId) {
    return <div className="p-4">Invalid context</div>;
  }

  const mealTypes = await getMealTypes();
  const mealType = mealTypes.find((m) => String(m.meal_type_id) === mealTypeId);

  if (!mealType) {
    return <div className="p-4">Meal type not found</div>;
  }

  // Нам потрібно family_id → дістаємо з плану
  const { getMenuPlanDetails } =
    await import("@/lib/menu-plans/menu-plan-details.read");

  const plan = await getMenuPlanDetails(planId);

  if (!plan) {
    return <div className="p-4">Menu plan not found</div>;
  }

  const members = await getFamilyMembers(plan.family_id);

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryPickerHeader
        mealName={mealType.name_ua}
        members={members}
        initialUserId={userId ?? null}
      />

      {/* Temporary placeholder */}
      <div className="p-4 text-sm text-gray-400">Entry list will be here</div>
    </div>
  );
}
