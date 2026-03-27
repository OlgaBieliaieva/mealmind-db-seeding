// TODO DELETE after refactor
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/api";
import { BrandCreateInput } from "../schemas/brand.schema";

type CreateBrandResponse = {
  brand_id: string;
  name: {
    en: string;
    ua: string;
  };
};

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation<CreateBrandResponse, Error, BrandCreateInput>({
    mutationFn: (data) =>
      apiFetch("/api/v2/brands", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
}
