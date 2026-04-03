"use client";

import { useRouter } from "next/navigation";
import { useProductStatusActions } from "../../hooks/useProductStatusActions";
import { useDeleteProduct } from "@/features/product-form/hooks/useDeleteProduct";
import { ProductDetailsDto } from "@/shared/api/products/products.types";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsFooterActions({ product }: Props) {
  const router = useRouter();
  const { archive, activate, restore } = useProductStatusActions();
  const { mutate, isPending } = useDeleteProduct();

  return (
    <div className="mt-10 border-t pt-6">
      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
          className="text-sm border px-3 py-1 rounded"
        >
          Змінити
        </button>

        {/* ---------- STATUS ACTIONS ---------- */}

        {product.status === "draft" && (
          <button
            className="text-sm border px-3 py-1 rounded bg-green-100 text-green-700"
            onClick={() => activate.mutate(product.id)}
            disabled={activate.isPending}
          >
            Опублікувати
          </button>
        )}

        {product.status === "active" && (
          <button
            className="text-sm border px-3 py-1 rounded bg-gray-100 text-gray-700"
            onClick={() => archive.mutate(product.id)}
            disabled={archive.isPending}
          >
            Архівувати
          </button>
        )}

        {product.status === "archived" && (
          <>
            <button
              className="text-sm border px-3 py-1 rounded bg-gray-100 text-gray-700 bg-yellow-100 text-yellow-700"
              onClick={() => restore.mutate(product.id)}
              disabled={restore.isPending}
            >
              Відновити
            </button>

            <button
              className="text-sm border px-3 py-1 rounded bg-gray-100 text-gray-700 bg-red-100 text-red-700"
              onClick={() => mutate(product.id)}
              disabled={isPending}
            >
              Видалити
            </button>
          </>
        )}
      </div>
    </div>
  );
}
