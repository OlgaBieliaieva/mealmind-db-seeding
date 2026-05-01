import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "@/shared/api/product-details/product-details.api";

export function useProductDetails(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });
}
