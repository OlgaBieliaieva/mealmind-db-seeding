import { useQuery } from "@tanstack/react-query";
import { getProductRecipes } from "@/shared/api/product-details/product-details.api";

export function useProductRecipes(productId: string, page: number) {
  return useQuery({
    queryKey: ["product-recipes", productId, page],

    queryFn: () => getProductRecipes(productId, page),

    enabled: !!productId,
  });
}
