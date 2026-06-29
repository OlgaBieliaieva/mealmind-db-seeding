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

export type AggregatedMealTypeRefDTO = {
  id: string;
  name: string;
  orderIndex: number;
};

export type AggregatedMealItemDTO = {
  id: string;
  type: "recipe" | "product";

  name: string;

  photoUrl?: string;
  totalTime?: number;
  difficulty?: Difficulty;
  categoryId?: string;
  categoryCode?: string;
  categoryName?: string;

  totalWeight: number;
  portions: number;
  unit: string;

  users: {
    id: string;
    firstName: string;
    sex: string;
    avatarUrl: string | null;
  }[];

  entryIds: string[];

  isPrepared: boolean;

  mealTypes: AggregatedMealTypeRefDTO[];

  sort: {
    firstCreatedAt: string;
    firstMealTypeOrderIndex: number;
  };
};

export type AggregatedSummaryDTO = {
  totalItems: number;
  preparedItems: number;
  progress: number;
};

export type AggregatedMealListDTO = {
  summary: AggregatedSummaryDTO;
  items: AggregatedMealItemDTO[];
};

export type AggregatedMealTypeGroupDTO = {
  mealType: AggregatedMealTypeRefDTO;
  summary: AggregatedSummaryDTO;
  items: AggregatedMealItemDTO[];
};

export type AggregatedMealPlanDTO = {
  tabs: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
  views: {
    all: AggregatedMealListDTO;
    byMealType: AggregatedMealTypeGroupDTO[];
  };
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

export type Difficulty = "easy" | "medium" | "hard";
