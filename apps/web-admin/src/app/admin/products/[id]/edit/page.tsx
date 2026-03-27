"use client";

import { ProductEditPage } from "@/src/features/product-form/pages/ProductEditPage";
import { PRODUCT_ADMIN_LABELS } from "@/src/features/product/constants/product.admin.labels";
import { useProductDetails } from "@/src/features/product-details/hooks/useProductDetails";

export default function Page() {
  const { data: product, isLoading, isError } = useProductDetails();

  if (isLoading) {
    return <div className="text-sm text-gray-500">Завантаження...</div>;
  }

  if (isError || !product) {
    return <div className="text-sm text-red-500">Продукт не знайдено</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        {PRODUCT_ADMIN_LABELS.edit_form.title}
      </h1>

      <ProductEditPage product={product} />
    </div>
  );
}
