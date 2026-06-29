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
