export type AggregatedMealItemDTO = {
  id: string;
  type: "recipe" | "product";

  name: string;

  totalWeight: number;
  portions: number;

  unit: string; // 🔥 ДОДАТИ

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
  progress: number; // 0-1
};

export type AggregatedMealPlanDTO = {
  summary: AggregatedSummaryDTO;
  items: AggregatedMealItemDTO[];
};
