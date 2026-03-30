"use client";

import { PageEmpty } from "@/shared/ui/page/PageEmpty";
import { PRODUCT_ADMIN_LABELS } from "@/features/product/constants/product.admin.labels";

export function ProductListEmpty() {
  return (
    <PageEmpty
      title={PRODUCT_ADMIN_LABELS.empty.title}
      description={PRODUCT_ADMIN_LABELS.empty.description}
    />
  );
}
