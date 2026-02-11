import { getRecipeById } from "@/lib/recipes/getRecipeById";
import { RecipeForm } from "@/components/recipe/RecipeForm";

type Props = {
  params: { id: string };
};

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <RecipeForm mode="edit" initialData={recipe} />;
}
