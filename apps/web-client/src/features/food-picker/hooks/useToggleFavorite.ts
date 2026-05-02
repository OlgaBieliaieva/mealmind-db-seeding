import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import {
  toggleRecipeFavorite,
  toggleProductFavorite,
  SearchResponse,
} from "@/shared/api/search/search.api";
import { ProductDetailsDTO } from "@/features/product-details/types/product-details.types";

type Input = {
  id: string;
  type: "recipe" | "product";
};

type Context = {
  prevSearch: [QueryKey, SearchResponse | undefined][];
  prevProduct?: ProductDetailsDTO;
};

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation<{ isFavorite: boolean }, Error, Input, Context>({
    mutationFn: async ({ id, type }) => {
      return type === "recipe"
        ? toggleRecipeFavorite(id)
        : toggleProductFavorite(id);
    },

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async ({ id, type }) => {
      // 1. cancel search queries
      await queryClient.cancelQueries({ queryKey: ["search"] });

      // 2. snapshot search cache
      const prevSearch = queryClient.getQueriesData<SearchResponse>({
        queryKey: ["search"],
      });

      // 3. snapshot product details (якщо відкрито)
      const prevProduct = queryClient.getQueryData<ProductDetailsDTO>([
        "product",
        id,
      ]);

      // 4. optimistic update search
      queryClient.setQueriesData<SearchResponse>(
        { queryKey: ["search"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.map((item) =>
              item.id === id && item.type === type
                ? { ...item, isFavorite: !item.isFavorite }
                : item,
            ),
          };
        },
      );

      // 5. optimistic update product details
      queryClient.setQueryData<ProductDetailsDTO>(["product", id], (old) => {
        if (!old) return old;

        return {
          ...old,
          isFavorite: !old.isFavorite,
        };
      });

      return { prevSearch, prevProduct };
    },

    // ❌ ROLLBACK
    onError: (_err, variables, context) => {
      if (!context) return;

      // rollback search
      context.prevSearch.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

      // rollback product
      if (context.prevProduct) {
        queryClient.setQueryData(
          ["product", variables.id],
          context.prevProduct,
        );
      }
    },

    // ✅ SYNC З БЕКОМ
    onSuccess: (data, { id, type }) => {
      // update search
      queryClient.setQueriesData<SearchResponse>(
        { queryKey: ["search"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.map((item) =>
              item.id === id && item.type === type
                ? { ...item, isFavorite: data.isFavorite }
                : item,
            ),
          };
        },
      );

      // 🔥 update product details
      queryClient.setQueryData<ProductDetailsDTO>(["product", id], (old) => {
        if (!old) return old;

        return {
          ...old,
          isFavorite: data.isFavorite,
        };
      });
    },
  });
}
