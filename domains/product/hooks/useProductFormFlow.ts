"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductFormValues } from "../schemas/product-form.schema";

import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { useCreateBrand } from "./useCreateBrand";
import { usePhotoLifecycle } from "./usePhotoLifecycle";

import { mapProductFormToProductInput } from "../mappers/productFormToProductInput.mapper";

export function useProductFormFlow(
  mode: "create" | "edit",
  productId?: string,
) {
  const router = useRouter();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const createBrandMutation = useCreateBrand();

  const { finalizePhotos } = usePhotoLifecycle();

  async function submit(values: ProductFormValues) {
    try {
      let brandId = values.brand_id;

      // ⭐ INLINE BRAND CREATION — через mutation hook
      if (values.type === "branded" && brandId === "__new__") {
        const created = await createBrandMutation.mutateAsync({
          name: {
            en: values.new_brand_name_en!,
            ua: values.new_brand_name_ua!,
          },
          country: values.new_brand_country || undefined,
        });

        brandId = created.brand_id;
      }

      const normalizedValues: ProductFormValues = {
        ...values,
        brand_id: values.type === "branded" ? brandId : undefined,
      };

      const payload = mapProductFormToProductInput(
        normalizedValues,
        undefined,
        mode === "edit" ? productId : undefined,
      );

      // ================= CREATE =================

      if (mode === "create") {
        const result = await createProductMutation.mutateAsync(payload);

        const id = result.product_id;

        const finalized = await finalizePhotos(values.photos ?? [], id);

        if (finalized.length) {
          await fetch(`/api/v2/products/${id}/photos`, {
            method: "POST",
            body: JSON.stringify({ photos: finalized }),
          });
        }

        toast.success("Новий продукт успішно створено");

        router.push(`/admin/products/${id}`);
        return;
      }

      // ================= EDIT =================

      if (mode === "edit") {
        if (!productId) throw new Error("Missing productId");

        await updateProductMutation.mutateAsync({
          id: productId,
          data: payload,
        });

        const finalized = await finalizePhotos(values.photos ?? [], productId);

        if (finalized.length) {
          await fetch(`/api/v2/products/${productId}/photos`, {
            method: "POST",
            body: JSON.stringify({ photos: finalized }),
          });
        }

        toast.success("Інформацію про продукт оновлено");

        router.push(`/admin/products/${productId}`);
      }
    } catch (e) {
      toast.error("Помилка при збереженні змін");
      throw e;
    }
  }

  return {
    submit,
    isSubmitting:
      createProductMutation.isPending ||
      updateProductMutation.isPending ||
      createBrandMutation.isPending,

    isError:
      createProductMutation.isError ||
      updateProductMutation.isError ||
      createBrandMutation.isError,

    isSuccess:
      createProductMutation.isSuccess || updateProductMutation.isSuccess,
  };
}
