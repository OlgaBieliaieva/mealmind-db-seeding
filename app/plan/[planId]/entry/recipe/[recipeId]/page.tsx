export const dynamic = "force-dynamic";

import { getRecipeById } from "@/lib/recipes/getRecipeById";
import RecipeEntryDetailsClient from "@/components/menu-plan/RecipeEntryDetailsClient";

type Props = {
  params: {
    planId: string;
    recipeId: string;
  };
  searchParams: {
    date?: string;
    mealTypeId?: string;
    userId?: string;
  };
};

export default async function RecipeEntryDetailsPage({
  params,
  searchParams,
}: Props) {
  const { planId, recipeId } = params;
  const { date, mealTypeId, userId } = searchParams;

  const recipeFull = await getRecipeById(recipeId);

  if (!recipeFull) {
    return <div className="p-4">Recipe not found</div>;
  }

  return (
    <RecipeEntryDetailsClient
      planId={planId}
      recipeFull={recipeFull}
      date={date ?? ""}
      mealTypeId={Number(mealTypeId)}
      userId={userId ?? ""}
    />
  );
}
