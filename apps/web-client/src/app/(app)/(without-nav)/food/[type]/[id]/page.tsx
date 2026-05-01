import { notFound } from "next/navigation";
import { ProductDetailsPage } from "@/features/product-details/components/ProductDetailsPage";

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
    return <div>Recipe details</div>;
  }

  return notFound();
}
