"use client";

// import { ProductForm } from "@/domains/product/components/ProductForm/ProductForm";
import { PRODUCT_ADMIN_LABELS } from "@/domains/product/constants/product.admin.labels";

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        {PRODUCT_ADMIN_LABELS.form.title}
      </h1>

      {/* <ProductForm mode="create" /> */}
    </div>
  );
}
