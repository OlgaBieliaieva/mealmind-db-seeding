export type AggregatedMealTypeRefDTO = {
  id: string;
  name: string;
  orderIndex: number;
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
  difficulty?: string;
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

export type AggregatedMemberRefDTO = {
  id: string;
  firstName: string;
  sex: string;
  avatarUrl: string | null;
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

export type AggregatedMealViewDTO = {
  tabs: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
  all: AggregatedMealListDTO;
  byMealType: AggregatedMealTypeGroupDTO[];
};

export type AggregatedMealPlanDTO = {
  views: {
    meal: AggregatedMealViewDTO;
    member: AggregatedMemberViewDTO;
  };
};
