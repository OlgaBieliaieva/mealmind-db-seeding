"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateProduct } from "./useCreateProduct";
import { useCreateBrand } from "./useCreateBrand";
import { usePhotoLifecycle } from "./usePhotoLifecycle";

import { mapProductFormToProductInput } from "../mappers/productFormToProductInput.mapper";
import { ProductFormValues } from "../schemas/product-form.schema";

export function useProductFormSubmit() {
  const createProduct = useCreateProduct();
  const createBrand = useCreateBrand();
  const { finalizePhotos } = usePhotoLifecycle();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  async function submit(values: ProductFormValues) {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      let brandId = values.brand_id;

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

      const payload = mapProductFormToProductInput({
        ...values,
        brand_id: brandId,
        photos: [],
      });

      const result = await createProduct.mutateAsync(payload);

      const productId = result.product_id;

      const finalizedPhotos = await finalizePhotos(
        values.photos ?? [],
        productId,
      );

      if (finalizedPhotos.length) {
        await fetch(`/api/v2/products/${productId}/photos`, {
          method: "POST",
          body: JSON.stringify({
            photos: finalizedPhotos,
          }),
        });
      }

      toast.success("Новий продукт успішно створений");
      setIsSuccess(true);
      router.push(`/admin/products/${productId}`);
    } catch (e) {
      toast.error("При створенні продукту виникла помилка");
      setIsError(true);
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submit,
    isSubmitting,
    isError,
    isSuccess,
  };
}
