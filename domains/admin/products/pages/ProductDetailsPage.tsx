"use client";

import { useProductDetails } from "../hooks/useProductDetails";
import { PageLoader } from "@/domains/shared/components/page/PageLoader";
import { PageError } from "@/domains/shared/components/page/PageError";
import { ProductDetailsHeaderCard } from "../components/details/ProductDetailsHeaderCard";
import { ProductDetailsBasicInfoSection } from "../components/details/ProductDetailsBasicInfoSection";
import { ProductDetailsCategorySection } from "../components/details/ProductDetailsCategorySection";

export function ProductDetailsPage() {
  const { data, isLoading, isError, refetch } = useProductDetails();

  if (isLoading) {
    return <PageLoader title="Loading product..." />;
  }

  if (isError || !data) {
    return <PageError title="Failed to load product" onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <ProductDetailsHeaderCard product={data} />

      <ProductDetailsBasicInfoSection product={data} />
      <ProductDetailsCategorySection
        category={data.category}
        brand={data.brand}
        parent={data.parent}
      />
    </div>
  );
}
