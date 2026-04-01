"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  ProductInput,
  ProductInputWithBrandDraft,
} from "../schemas/product.schema";
import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { useCreateBrand } from "./useCreateBrand";

import { usePhotoLifecycle } from "@/shared/media/hooks/usePhotoLifecycle";
import { addPhotos } from "@/shared/api/products/products.api";

export function useProductFormFlow(
  mode: "create" | "edit",
  productId?: string,
) {
  const router = useRouter();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const createBrandMutation = useCreateBrand();

  const { finalizePhotos } = usePhotoLifecycle();

  async function submit(payload: ProductInput) {
    try {
      let finalPayload = payload;

      // ================= BRAND CREATION =================

      if (payload.type === "branded" && payload.brand_id === "__new__") {
        const draft = payload as ProductInputWithBrandDraft;

        if (!draft.new_brand_name_en || !draft.new_brand_name_ua) {
          throw new Error("New brand data is missing");
        }

        const created = await createBrandMutation.mutateAsync({
          name: {
            en: draft.new_brand_name_en,
            ua: draft.new_brand_name_ua,
          },
          country: draft.new_brand_country || undefined,
        });

        finalPayload = {
          ...payload,
          brand_id: created.brand_id,
        };
      }

      // ================= CREATE =================

      if (mode === "create") {
        const result = await createProductMutation.mutateAsync(finalPayload);

        const id = result.product_id;

        const safePhotos = (payload.photos ?? []).map((p) => ({
          ...p,
          objectName: p.objectName ?? p.url,
        }));

        const finalized = await finalizePhotos(safePhotos, id);

        if (finalized.length) {
          await addPhotos(id, finalized);
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
          data: finalPayload,
        });

        const safePhotos = (payload.photos ?? []).map((p) => ({
          ...p,
          objectName: p.objectName ?? p.url,
        }));

        const finalized = await finalizePhotos(safePhotos, productId);

        if (finalized.length) {
          await addPhotos(productId, finalized);
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
