"use client";
import { useMemo } from "react";
import { ProductForm } from "@/domains/product/components/ProductForm/ProductForm";
import { ProductDetailsDTO } from "../types/product-details.dto";
import { mapProductDetailsToForm } from "@/domains/product/mappers/mapProductDetailsToForm";

type Props = {
  product: ProductDetailsDTO;
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
