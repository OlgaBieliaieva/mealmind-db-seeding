export type RecipeSourceDTO = {
  id: string;
  title?: string;
  url: string;
  platform?: string;
};

export type OriginalRecipeDTO = {
  id: string;
  title: string;
  photoUrl?: string;
};

export type RecipeDetailsDTO = {
  id: string;

  // 🔹 BASIC
  name: string;
  description: string;
  fullDescription?: string;
  photoUrl?: string;

  // 🔹 PORTIONS
  baseServings?: number;
  baseServingWeightG: number;
  baseOutputWeightG: number;

  // 🔹 TIME
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  difficulty?: "easy" | "medium" | "hard";

  // 🔹 CATEGORY
  categoryName?: string;
  categoryCode?: string;

  // 🔹 AUTHOR
  author?: {
    name: string;
    bio?: string;
    avatarUrl?: string;
    profileUrl?: string;
    links?: {
      type: string;
      url: string;
    }[];
  };

  // 🔹 CUISINES
  cuisines: {
    id: string;
    name: string;
  }[];

  // 🔹 INGREDIENTS
  ingredients: {
    id: string;
    productId?: string;
    name: string;
    quantity: number;
    unit: string;
    isOptional: boolean;

    category: {
      name: string;
      code: string;
    };

    brand?: {
      name: string;
      country?: string;
    };
  }[];

  // 🔹 STEPS
  steps: {
    id: string;
    stepNumber: number;
    instruction: string;
    timerSec?: number;
  }[];

  // 🔹 NUTRIENTS
  nutrients: {
    code: string;
    name: string;
    value: number;
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

  // 🔹 VIDEOS
  videos: {
    id: string;
    title?: string;
    thumbnailUrl?: string;
    durationSec?: number;
    platform: string;
    url: string;
    author?: {
      name: string;
    };
  }[];

  // 🆕 🔹 SOURCES
  sources?: RecipeSourceDTO[];

  // 🆕 🔹 ORIGINAL
  originalRecipe?: OriginalRecipeDTO;
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
