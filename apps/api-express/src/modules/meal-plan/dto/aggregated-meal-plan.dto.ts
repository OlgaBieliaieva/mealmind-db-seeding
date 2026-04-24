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

  mealTypeId: string;
  mealTypeName: string;

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
