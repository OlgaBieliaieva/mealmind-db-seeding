import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProductDetails } from "@/shared/api/product-details/product-details.api";
import { ProductDetailsDTO } from "../types/product-details.types";

type Options = Omit<UseQueryOptions<ProductDetailsDTO>, "queryKey" | "queryFn">;

export function useProductDetails(id?: string, options?: Options) {
  return useQuery<ProductDetailsDTO>({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
