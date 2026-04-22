export type MealEntryDTO = {
  id: string;
  type: "recipe" | "product";
  refId: string;
  name: string;
  amount: number;
};

export type MealDTO = {
  mealTypeId: string;
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

export type ViewMode = "meal" | "user";
