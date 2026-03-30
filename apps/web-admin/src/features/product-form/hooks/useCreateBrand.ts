"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand } from "@/shared/api/brands/brands.api";

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
    mutationFn: (data) => createBrand(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
}
