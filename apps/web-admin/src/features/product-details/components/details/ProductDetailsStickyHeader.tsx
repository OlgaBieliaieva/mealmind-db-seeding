"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDeleteProduct } from "@/features/product-form/hooks/useDeleteProduct";
import { useProductStatusActions } from "../../hooks/useProductStatusActions";
import { ProductDetailsDto } from "@/shared/api/products/products.types";

import { Badge } from "@/shared/ui/badge/Badge";
import { ConfirmModal } from "@/shared/ui/modal/ConfirmModal";

import {
  getProductStatusBadgeVariant,
  getProductTypeBadgeVariant,
  getProductStateBadgeVariant,
} from "../../adapters/product.badge.adapters";

import { getProductStatusLabel } from "../../adapters/product-status-label.adapter";
import { getProductStateLabel } from "../../adapters/product-state-label.adapter";
import { getProductTypeLabel } from "../../adapters/product-type-label.adapter";
import { getProductUnitLabel } from "../../adapters/product-unit-label.adapter";

import { ProductDetailsBackLink } from "./ProductDetailsBackLink";
import { mapProductState } from "../../mappers/product.mapper";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsStickyHeader({ product }: Props) {
  const router = useRouter();

  const { archive, activate, restore } = useProductStatusActions();
  const { mutate, isPending } = useDeleteProduct();

  const state = mapProductState(product.rawOrCooked);

  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleDelete() {
    mutate(product.id);
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-xl flex flex-col items-center px-4 py-3 gap-2">
          <div className="w-full flex justify-between items-center">
            <ProductDetailsBackLink />

            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(`/admin/products/${product.id}/edit`)
                }
                className="text-sm border px-3 py-1 rounded"
              >
                Змінити
              </button>

              {/* STATUS ACTIONS */}

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
                    className="text-sm border px-3 py-1 rounded bg-yellow-100 text-yellow-700"
                    onClick={() => restore.mutate(product.id)}
                    disabled={restore.isPending}
                  >
                    Відновити
                  </button>

                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="text-sm border px-3 py-1 rounded bg-red-100 text-red-700"
                  >
                    Видалити
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-full font-semibold px-4">{product.name.ua}</div>

          <div className="w-full flex gap-2 px-4">
            <Badge variant={getProductStatusBadgeVariant(product.status)}>
              {getProductStatusLabel(product.status)}
            </Badge>

            <Badge variant={getProductTypeBadgeVariant(product.type)}>
              {getProductTypeLabel(product.type)}
            </Badge>

            <Badge>{getProductUnitLabel(product.unit)}</Badge>

            <Badge variant={getProductStateBadgeVariant(state)}>
              {getProductStateLabel(state)}
            </Badge>
          </div>
        </div>
      </div>

      {/* 🔥 CONFIRM MODAL */}
      <ConfirmModal
        open={confirmOpen}
        title="Видалити продукт?"
        description="Цю дію неможливо скасувати"
        confirmText="Видалити"
        cancelText="Скасувати"
        isLoading={isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
