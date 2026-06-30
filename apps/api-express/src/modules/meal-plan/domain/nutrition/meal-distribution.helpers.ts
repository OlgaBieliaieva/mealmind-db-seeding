import { MealEntryWithRelations } from "../../transport/client/types/meal-plan.types";
import { MealDistributionMap } from "./meal-plan-nutrition.types";

function buildThreeMealDistribution(
  snacksEnabled: boolean,
): MealDistributionMap {
  if (snacksEnabled) {
    return {
      breakfast: 0.3,
      lunch: 0.3,
      dinner: 0.2,
      snack: 0.1,
      second_snack: 0.1,
    };
  }

  return {
    breakfast: 0.35,
    lunch: 0.35,
    dinner: 0.30,
  };
}

function buildFourMealDistribution(
  snacksEnabled: boolean,
): MealDistributionMap {
  if (snacksEnabled) {
    return {
      breakfast: 0.3,
      lunch: 0.3,
      dinner: 0.2,
      snack: 0.1,
      second_snack: 0.1,
    };
  }

  return {
    breakfast: 0.3,
    lunch: 0.35,
    dinner: 0.25,
    snack: 0.1,
  };
}

export function resolveMealDistribution(
  user: MealEntryWithRelations["user"],
): MealDistributionMap {
  const settings = user.mealSettings?.[0];

  if (!settings) {
    return buildThreeMealDistribution(false);
  }

  if (settings.mealsPerDay >= 4) {
    return buildFourMealDistribution(settings.snacksEnabled);
  }

  return buildThreeMealDistribution(settings.snacksEnabled);
}

export function getMealTypeShare(
  distribution: MealDistributionMap,
  mealTypeCode?: string,
  fallbackMealsPerDay = 3,
): number {
  if (!mealTypeCode) {
    return 1 / fallbackMealsPerDay;
  }

  const normalizedCode = mealTypeCode.toLowerCase();

  if (distribution[normalizedCode] !== undefined) {
    return distribution[normalizedCode];
  }

  if (normalizedCode.includes("snack")) {
    return distribution.snack ?? 0.1;
  }

  return 1 / fallbackMealsPerDay;
}
