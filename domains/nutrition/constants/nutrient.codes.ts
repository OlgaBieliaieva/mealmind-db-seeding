// SECTION ███ NUTRIENT CODE CONSTANTS ███
// WHY: centralized nutrition taxonomy

export const NUTRIENT_CODES = {
  // macro
  PROTEIN: "protein",
  FAT: "fat",
  CARBOHYDRATES: "carbohydrates",
  ENERGY_KCAL: "energy_kcal",

  // micro
  POLYUNSATURATED_FAT: "polyunsaturated_fat",
  MONOUNSATURATED_FAT: "monounsaturated_fat",
  SATURATED_FAT: "saturated_fat",

  CHOLESTEROL: "cholesterol",
  FIBER: "fiber",
  SUGAR: "sugar",

  //   mineral
  SODIUM: "sodium",
  POTTASSIUM: "potassium",
} as const;

export type NutrientCode = (typeof NUTRIENT_CODES)[keyof typeof NUTRIENT_CODES];
