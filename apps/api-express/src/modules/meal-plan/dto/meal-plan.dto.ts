export type MealEntryDTO = {
  id: string;
  type: "recipe" | "product";

  // 🔥 INPUT
  amount: number;

  // 🔥 NORMALIZED
  amountInGrams: number;

  // 🔥 NEW
  unit: string;

  user: {
    id: string;
    firstName: string;
    sex: string;
    avatarUrl?: string | null;
  };

  recipe?: {
    id: string;
    title: string;
    baseServings: number;
    baseOutputWeightG: number;
  };

  product?: {
    id: string;
    nameUa: string;
    unit: string;
  };
};

export type MealDTO = {
  mealTypeId: string;
  mealTypeName: string;
  entries: MealEntryDTO[];
};

export type DayDTO = {
  date: string;
  meals: MealDTO[];
};

export type MealPlanDTO = {
  week: {
    start: string;
    end: string;
  };
  days: DayDTO[];
};
