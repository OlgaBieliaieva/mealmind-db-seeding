"use client";

import { useEffect, useMemo, useState } from "react";
import { NutrientsMap } from "@/types/nutrients";

export function useProductNutrients(productIds: string[]) {
  const [map, setMap] = useState<Record<string, NutrientsMap>>({});

  // ✅ стабільний ключ
  const productIdsKey = useMemo(() => productIds.join(","), [productIds]);

  useEffect(() => {
    if (productIds.length === 0) return;

    fetch("/api/products/nutrients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_ids: productIds,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMap(data.items ?? {}));
  }, [productIds, productIdsKey]); // ✅ ОБИДВА

  return map;
}
