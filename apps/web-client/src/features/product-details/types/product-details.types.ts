import { RecipeSearchItemDTO } from "@/shared/types/search.types";

export type ProductDetailsDTO = {
  id: string;

  name: string;
  photoUrl?: string;

  categoryName?: string;
  categoryCode?: string;

  brand?: {
    name: string;
    country?: string;
  };

  nutrients: {
    code: string;
    name: string;
    value: number;
    unit: string;
  }[];

  macros: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
};

export type ProductRecipesResponse = {
  items: RecipeSearchItemDTO[];
  total: number;
  page: number;
  limit: number;
};
