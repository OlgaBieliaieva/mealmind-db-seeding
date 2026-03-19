"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProductDetailsDTO } from "../types/product-details.dto";

export function useProductDetails() {
  const params = useParams();

  const productId = params?.id as string;

  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // TEMP mock

      await new Promise((r) => setTimeout(r, 400));

      const mock: ProductDetailsDTO = {
        id: productId,
        name: "Mock Product",

        type: "generic",
        unit: "g",
        rawOrCooked: "raw",

        category: {
          leafId: 12,
          leafName: "Chicken breast",
          rootId: 3,
          rootName: "Meat",
        },

        brand: {
          id: 4,
          name: "Nasha Ryaba",
        },

        parent: {
          id: "uuid-parent",
          name: "Generic Chicken Breast",
        },
      };

      return mock;
    },
    enabled: !!productId,
  });
}
