"use client";

import { useCreateProduct } from "./useCreateProduct";
import { useCreateBrand } from "./useCreateBrand";
import { usePhotoLifecycle } from "./usePhotoLifecycle";

import { mapProductFormToProductInput } from "../mappers/productFormToProductInput.mapper";
import { ProductFormValues } from "../schemas/product-form.schema";

export function useProductFormSubmit() {
  const createProduct = useCreateProduct();
  const createBrand = useCreateBrand();
  const { finalizePhotos } = usePhotoLifecycle();

  async function submit(values: ProductFormValues) {
    let brandId = values.brand_id;

    // ⭐ inline brand creation
    if (values.type === "branded" && brandId === "__new__") {
      const created = await createBrand.mutateAsync({
        name: {
          en: values.new_brand_name_en!,
          ua: values.new_brand_name_ua!,
        },
        country: values.new_brand_country || undefined,
      });

      brandId = created.brand_id;
    }

    // ⭐ create product FIRST
    const payload = mapProductFormToProductInput({
      ...values,
      brand_id: brandId,
      photos: [], // important
    });

    const result = await createProduct.mutateAsync(payload);

    const productId = result.product_id;

    // ⭐ finalize photos
    const finalizedPhotos = await finalizePhotos(
      values.photos ?? [],
      productId,
    );

    // ⭐ second mutation (update)
    if (finalizedPhotos.length) {
      await fetch(`/api/v2/products/${productId}/photos`, {
        method: "POST",
        body: JSON.stringify({
          photos: finalizedPhotos,
        }),
      });
    }
  }

  return {
    submit,
    isSubmitting: createProduct.isPending || createBrand.isPending,
    isError: createProduct.isError || createBrand.isError,
    isSuccess: createProduct.isSuccess,
  };
}
