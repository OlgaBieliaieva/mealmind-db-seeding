"use client";
import { useMemo } from "react";
import { ProductForm } from "@/features/product-form/components/ProductForm/ProductForm";
import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { mapProductDetailsToForm } from "../mappers/mapProductDetailsToForm";

type Props = {
  product: ProductDetailsDto;
};

export function ProductEditPage({ product }: Props) {
  const initialValues = useMemo(
    () => mapProductDetailsToForm(product),
    [product],
  );

  return (
    <ProductForm
      mode="edit"
      initialValues={initialValues}
      productId={product.id}
    />
  );
}
