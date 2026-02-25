export type BalanceStatus = "balanced" | "warning" | "critical";

export type BalanceResult = {
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
