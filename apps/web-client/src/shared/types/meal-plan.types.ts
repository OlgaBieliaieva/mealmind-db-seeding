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

export type AggregatedMemberRefDTO = {
  id: string;
  firstName: string;
  sex: string;
  avatarUrl: string | null;
};

export type AggregatedMealItemNutritionDTO = {
  energyKcalPer100g: number;
  energyKcalPerPortion: number;
  proteinPerPortion: number;
  fatPerPortion: number;
  carbsPerPortion: number;
};

export type AggregatedControlledNutrientDTO = {
  code: string;
  name: string;
  unit: string;
  actualValue: number;
  targetValue?: number;
  percentOfTarget?: number;
  direction: "min" | "max" | "target";
  status: "low" | "ok" | "high" | "unknown";
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
  nutrition?: AggregatedMealItemNutritionDTO;

  sort: {
    firstCreatedAt: string;
    firstMealTypeOrderIndex: number;
  };
};

export type AggregatedNutritionSnapshotDTO = {
  energyKcal: number;
  protein: number;
  fat: number;
  carbs: number;

  proteinPercent: number;
  fatPercent: number;
  carbsPercent: number;

  energyPercent?: number;
  energyStatus?: "balanced" | "warning" | "critical";
  controlledNutrients?: AggregatedControlledNutrientDTO[];
  issues?: string[];
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

export type AggregatedMemberMealTypeGroupDTO = {
  mealType: AggregatedMealTypeRefDTO;
  summary: AggregatedSummaryDTO;
  nutrition?: AggregatedNutritionSnapshotDTO;
  items: AggregatedMealItemDTO[];
};

export type AggregatedMealViewDTO = {
  tabs: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
  all: AggregatedMealListDTO;
  byMealType: AggregatedMealTypeGroupDTO[];
};

export type AggregatedMemberDayGroupDTO = {
  date: string;
  summary: AggregatedSummaryDTO;
  nutrition?: AggregatedNutritionSnapshotDTO;
  byMealType: AggregatedMemberMealTypeGroupDTO[];
};

export type AggregatedMemberGroupDTO = {
  member: AggregatedMemberRefDTO;
  summary: AggregatedSummaryDTO;
  nutrition?: AggregatedNutritionSnapshotDTO;
  byMealType: AggregatedMemberMealTypeGroupDTO[];
  byDay: AggregatedMemberDayGroupDTO[];
};

export type AggregatedMemberViewDTO = {
  summary: AggregatedSummaryDTO;
  members: AggregatedMemberGroupDTO[];
};

export type AggregatedMealPlanDTO = {
  views: {
    meal: AggregatedMealViewDTO;
    member: AggregatedMemberViewDTO;
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
