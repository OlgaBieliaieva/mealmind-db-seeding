import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/recipes/getRecipeById";
import RecipePageClient from "@/components/recipe/RecipePage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params;

  const data = await getRecipeById(id);

  if (!data) {
    notFound();
  }

  return <RecipePageClient data={data} />;
}
