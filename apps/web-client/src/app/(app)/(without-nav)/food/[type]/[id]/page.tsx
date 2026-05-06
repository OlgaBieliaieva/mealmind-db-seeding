import { notFound } from "next/navigation";
import { ProductDetailsPage } from "@/features/product-details/components/ProductDetailsPage";
import { RecipeDetailsPage } from "@/features/recipe-details/components/RecipeDetailsPage";

export default async function FoodDetailsPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = await params;

  if (type === "product") {
    return <ProductDetailsPage id={id} />;
  }

  if (type === "recipe") {
    return <RecipeDetailsPage id={id} />;
  }

  return notFound();
}
