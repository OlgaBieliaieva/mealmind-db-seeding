export const dynamic = "force-dynamic";

import { getProductById } from "@/lib/v1/products.read";
import { getMealTypes } from "@/lib/v1/meal-types/meal-types.read";
import { getFamilyMembers } from "@/lib/v1/families/family-members.read";
import { getMenuPlanDetails } from "@/lib/v1/menu-plans/menu-plan-details.read";
import { generateFullWeek, getWeekRangeFromDate } from "@/lib/v1/date/week";
import ProductEntryDetailsClient from "@/components/menu-plan/recipe-entry/ProductEntryDetailsClient";

type Props = {
  params: { planId: string; productId: string };
  searchParams: { date?: string; mealTypeId?: string };
};

export default async function Page({ params, searchParams }: Props) {
  const { planId, productId } = await params;
  const { date, mealTypeId } = await searchParams;

  const product = await getProductById(productId);
  if (!product) return <div className="p-4">Product not found</div>;

  const mealTypes = await getMealTypes();

  const { start, end } = getWeekRangeFromDate(date ?? "");
  const fullWeek = generateFullWeek(start);

  const plan = await getMenuPlanDetails(planId);
  if (!plan) return <div className="p-4">Plan not found</div>;

  const members = await getFamilyMembers(plan.family_id);

  return (
    <ProductEntryDetailsClient
      formMode="create"
      planId={planId}
      product={product}
      date={date ?? ""}
      mealTypes={mealTypes}
      initialMealTypeId={Number(mealTypeId)}
      weekLabel={`${start} – ${end}`}
      members={members}
      fullWeek={fullWeek}
    />
  );
}
