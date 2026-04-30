export type RecipeSearchItemDTO = {
  id: string;
  type: "recipe";

  name: string;
  photoUrl?: string;

  totalTime?: number;
  difficulty?: "easy" | "medium" | "hard";

  categoryCode?: string;
  categoryName?: string;

  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;

  cuisines?: {
    id: string;
    name: string;
  }[];

  author?: {
    name: string;
    avatarUrl?: string;
  };

  isFavorite?: boolean;
};

export type ProductSearchItemDTO = {
  id: string;
  type: "product";

  name: string;
  photoUrl?: string;

  categoryName?: string;
  categoryCode?: string;

  brand?: {
    name: string;
    country: string;
  } | null;

  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;

  isFavorite?: boolean;
};

export type SearchItemDTO = RecipeSearchItemDTO | ProductSearchItemDTO;
