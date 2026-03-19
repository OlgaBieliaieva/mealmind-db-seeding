"use client";

import { useRouter } from "next/navigation";
import { ProductDetailsDTO } from "../../types/product-details.dto";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsFooterActions({ product }: Props) {
  const router = useRouter();

  return (
    <div className="mt-10 border-t pt-6">
      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Edit product
        </button>

        <button className="rounded-lg border px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          Delete product
        </button>
      </div>
    </div>
  );
}
