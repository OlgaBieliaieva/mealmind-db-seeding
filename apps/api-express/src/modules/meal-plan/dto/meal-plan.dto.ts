export type MealEntryDTO = {
  id: string;
  type: "recipe" | "product";
  amount: number;

  user: {
    id: string;
    firstName: string;
    avatarUrl?: string | null;
  };

  recipe?: {
    id: string;
    name: string;
    weightPerServing: number;
  };

  product?: {
    id: string;
    name: string;
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
