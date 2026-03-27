// TODO DELETE after refactor
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";


export function useProductDetails() {
  const params = useParams();

  const productId = params?.id as string;

  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await fetch(`/api/v2/products/${productId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
    enabled: !!productId,
  });
}
