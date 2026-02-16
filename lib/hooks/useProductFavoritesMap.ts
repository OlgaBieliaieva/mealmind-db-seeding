"use client";

import { useEffect, useState } from "react";

export function useProductFavoritesMap(userId: string, familyId: string) {
  const [map, setMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/products/favorites?user_id=${userId}&family_id=${familyId}`)
      .then((r) => r.json())
      .then((d) => setMap(d.map ?? {}));
  }, [userId, familyId]);

  async function toggle(productId: string) {
    const isFav = Boolean(map[productId]);

    await fetch("/api/products/favorites", {
      method: isFav ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        user_id: userId,
        family_id: familyId,
      }),
    });

    setMap((prev) => ({
      ...prev,
      [productId]: !isFav,
    }));
  }

  return { map, toggle };
}
