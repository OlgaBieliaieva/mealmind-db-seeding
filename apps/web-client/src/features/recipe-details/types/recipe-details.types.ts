export type RecipeDetailsDTO = {
  id: string;

  name: string;
  description: string;
  fullDescription?: string;
  photoUrl?: string;

  baseServings?: number;
  baseServingWeightG: number;

  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  difficulty?: "easy" | "medium" | "hard";

  categoryName?: string;
  categoryCode?: string;

  author?: {
    name: string;
    bio?: string | null;
    avatarUrl?: string | null;
    profileUrl?: string | null;
    links?: {
      type: string;
      url: string;
    }[];
  } | null;

  cuisines: {
    id: string;
    name: string;
  }[];

  ingredients: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    isOptional: boolean;
  }[];

  steps: {
    id: string;
    stepNumber: number;
    instruction: string;
    timerSec?: number;
  }[];

  nutrients: {
    code: string;
    name: string;
    value: number; // per 100g
    unit: string;
    group: string;
    uiGroup: string;
    sortOrder: number;
  }[];

  macros: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };

  isFavorite: boolean;
};

export type NutrientDTO = {
  code: string;
  name: string;
  value: number;
  unit: string;

  group: string;
  sortOrder: number;
  uiGroup: string;
};

export type NutrientGroupDTO = {
  group: string;
  items: NutrientDTO[];
};
