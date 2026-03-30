"use client";

import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/features/product-form/hooks/useDeleteProduct";
import { ProductDetailsDto } from "@/shared/api/products/products.types";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsFooterActions({ product }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useDeleteProduct();

  return (
    <div className="mt-10 border-t pt-6">
      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Змінити
        </button>

        <button
          className="rounded-lg border px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          disabled={isPending}
          onClick={() => {
            if (confirm("Ви впевнені, що бажаєте видалити цей продукт?")) {
              mutate(product.id);
            }
          }}
        >
          Видалити
        </button>
      </div>
    </div>
  );
}
