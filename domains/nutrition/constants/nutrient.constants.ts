// SECTION ███ NUTRITION DOMAIN CONSTANTS ███
// WHY: системні значення для нутрієнтів

// SECTION ━━ NUTRIENT GROUPS ━━━━━━━━━━━━━━━━━

export const NUTRIENT_GROUPS = {

  MACRO: "macro",

  MICRO: "micro",

  VITAMIN: "vitamin",

  MINERAL: "mineral",

  OTHER: "other"

} as const;


// SECTION ━━ OPTIONS FOR UI ━━━━━━━━━━━━━━━━━

export const NUTRIENT_GROUP_OPTIONS = [

  { value: NUTRIENT_GROUPS.MACRO, label: "Macronutrients" },

  { value: NUTRIENT_GROUPS.MICRO, label: "Micronutrients" },

  { value: NUTRIENT_GROUPS.VITAMIN, label: "Vitamins" },

  { value: NUTRIENT_GROUPS.MINERAL, label: "Minerals" },

  { value: NUTRIENT_GROUPS.OTHER, label: "Other" }

];


// SECTION ━━ TYPESCRIPT TYPES ━━━━━━━━━━━━━━
// NOTE: derive type from constants

export type NutrientGroup =
  typeof NUTRIENT_GROUPS[keyof typeof NUTRIENT_GROUPS];