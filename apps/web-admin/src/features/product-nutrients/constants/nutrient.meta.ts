import { NUTRIENT_CODES } from "./nutrient.codes";

export const NUTRIENT_META = {
  [NUTRIENT_CODES.PROTEIN]: {
    label: "Білки",
    required: true,
  },
  [NUTRIENT_CODES.FAT]: {
    label: "Жири",
    required: true,
  },
  [NUTRIENT_CODES.CARBOHYDRATES]: {
    label: "Вуглеводи",
    required: true,
  },
  [NUTRIENT_CODES.ENERGY_KCAL]: {
    label: "Калорії",
    required: true,
  },

  // приклад optional
  [NUTRIENT_CODES.FIBER]: {
    label: "Клітковина",
    required: false,
  },
} as const;

export type NutrientMeta = typeof NUTRIENT_META;

export const REQUIRED_NUTRIENTS = Object.entries(NUTRIENT_META)
  .filter(([, meta]) => meta.required)
  .map(([code]) => code);