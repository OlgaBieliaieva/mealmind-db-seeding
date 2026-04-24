export type MealEntryDTO = {
  id: string;
  type: "recipe" | "product";
  amount: number;

  user: {
    id: string;
    firstName: string;
    avatarUrl: string | null;
  };

  recipe?: {
    id: string;
    title: string; // 🔥 було name
    baseServings: number;
    baseOutputWeightG: number;
  };

  product?: {
    id: string;
    nameUa: string; // 🔥 було name
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

export type WeekDTO = {
  week: {
    start: string;
    end: string;
  };
  days: DayDTO[];
};

export type AggregatedMealItemDTO = {
  id: string;
  type: "recipe" | "product";

  name: string;

  totalWeight: number;
  portions: number;

  users: {
    id: string;
    firstName: string;
    avatarUrl: string | null;
  }[];

  mealTypeId: string;

  entryIds: string[];

  isPrepared: boolean;
};

export type AggregatedSummaryDTO = {
  totalItems: number;
  preparedItems: number;
  progress: number;
};

export type AggregatedMealPlanDTO = {
  summary: AggregatedSummaryDTO;
  items: AggregatedMealItemDTO[];
};

export type AggregatedMealItem = {
  id: string;
  mealTypeId: string;
  name: string;
  type: "recipe" | "product";

  portions: number;
  totalWeight: number;

  entryIds: string[];
  isPrepared: boolean;

  users: {
    id: string;
    firstName: string;
    avatarUrl?: string | null;
  }[];
};

export type MealPlanResponseDTO = {
  week: WeekDTO;
  aggregated: AggregatedMealPlanDTO;
};

export type MealPlanDTO = {
  week: {
    start: string;
    end: string;
  };
  days: DayDTO[];
};

export type ViewMode = "meal" | "user";
