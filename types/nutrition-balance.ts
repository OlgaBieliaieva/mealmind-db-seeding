export type UserNutritionTargets = {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  fiber_g?: number;
};

export type BalanceStatus = "balanced" | "warning" | "critical";

export type UserBalanceResult = {
  energyPercent: number;
  macroPercents: {
    protein: number;
    fat: number;
    carbs: number;
  };
  status: BalanceStatus;
  issues: string[];
  highlightedNutrients: string[];
};
