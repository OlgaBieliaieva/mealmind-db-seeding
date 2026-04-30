import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleRecipeFavorite,
  toggleProductFavorite,
  SearchResponse,
} from "@/shared/api/search/search.api";

type Input = {
  id: string;
  type: "recipe" | "product";
};

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, type }: Input) => {
      return type === "recipe"
        ? toggleRecipeFavorite(id)
        : toggleProductFavorite(id);
    },

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async ({ id, type }) => {
      await queryClient.cancelQueries({ queryKey: ["search"] });

      const prev = queryClient.getQueriesData<SearchResponse>({
        queryKey: ["search"],
      });

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

      return { prev };
    },

    // ❌ rollback
    onError: (_err, _vars, context) => {
      context?.prev?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    // ✅ sync з беком
    onSuccess: (data, { id, type }) => {
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
    },
  });
}
