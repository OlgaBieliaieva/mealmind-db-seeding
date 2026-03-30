"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getProductDetails } from "@/shared/api/products/products.api";

export function useProductDetails() {
  const params = useParams();
  const productId = params?.id as string;

  return useQuery({
    queryKey: ["product", productId],

    queryFn: () => getProductDetails(productId),

    enabled: !!productId,
  });
}
