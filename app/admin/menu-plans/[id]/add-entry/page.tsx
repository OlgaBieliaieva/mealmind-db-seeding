export const dynamic = "force-dynamic";

import { getMealTypes } from "@/lib/meal-types/meal-types.read";
import { getFamilyMembers } from "@/lib/families/family-members.read";
import { getAllRecipes } from "@/lib/recipes.read";
import { getAllProducts } from "@/lib/products.read";
import EntryPickerClient from "@/components/entry-picker/EntryPickerClient";

type Props = {
  params: { id: string };
  searchParams: {
    dayId?: string;
    mealTypeId?: string;
    userId?: string;
  };
};

export default async function AddEntryPage({ params, searchParams }: Props) {
  const { id: planId } = await params;
  const { dayId, mealTypeId, userId } = await searchParams;

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
  const recipes = await getAllRecipes();
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryPickerClient
        dayId={dayId}
        mealTypeId={Number(mealTypeId)}
        mealName={mealType.name_ua}
        members={members}
        initialUserId={userId ?? null}
        recipes={recipes}
        products={products}
        familyId={plan.family_id}
      />
    </div>
  );
}
