export type NutrientValue = {
  value: number;
  unit?: string; // якщо відрізняється від default
};

export type NutrientsMap = Record<string, NutrientValue>;
