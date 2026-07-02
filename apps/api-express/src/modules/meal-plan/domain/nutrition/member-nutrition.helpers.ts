import { MealEntryWithRelations } from "../../transport/client/types/meal-plan.types";
import { MacroTotals, UserNutritionContext } from "./meal-plan-nutrition.types";
import {
  getMealTypeShare,
  resolveMealDistribution,
} from "./meal-distribution.helpers";
import { resolveUserTargets } from "./user-targets.helpers";
import {
  AggregatedControlledNutrientDTO,
  AggregatedMealItemNutritionDTO,
  AggregatedNutritionSnapshotDTO,
} from "../../dto/aggregated-meal-plan.dto";
import { NutrientTotalsMap } from "./meal-plan-nutrition.types";
import { getControlledNutrientDefinitions } from "./user-targets.helpers";

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

export function extractEntryMacros(entry: MealEntryWithRelations): MacroTotals {
  if (entry.recipe) {
    const totalWeight = entry.recipe.baseOutputWeightG || 0;
    const actualWeight = entry.amountInGrams ?? 0;

    if (!totalWeight || !actualWeight) {
      return { energyKcal: 0, protein: 0, fat: 0, carbs: 0 };
    }

    let energyKcal = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    for (const nutrient of entry.recipe.nutrients) {
      const perGram = nutrient.valueTotal / totalWeight;
      const value = perGram * actualWeight;

      switch (nutrient.nutrient.code) {
        case "energy_kcal":
          energyKcal = value;
          break;
        case "protein":
          protein = value;
          break;
        case "fat":
          fat = value;
          break;
        case "carbohydrates":
          carbs = value;
          break;
      }
    }

    return { energyKcal, protein, fat, carbs };
  }

  if (entry.product) {
    const actualWeight = entry.amountInGrams ?? 0;
    const factor = actualWeight / 100;

    let energyKcal = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    for (const nutrient of entry.product.nutrients) {
      const value = nutrient.valuePer100g * factor;

      switch (nutrient.nutrient.code) {
        case "energy_kcal":
          energyKcal = value;
          break;
        case "protein":
          protein = value;
          break;
        case "fat":
          fat = value;
          break;
        case "carbohydrates":
          carbs = value;
          break;
      }
    }

    return { energyKcal, protein, fat, carbs };
  }

  return { energyKcal: 0, protein: 0, fat: 0, carbs: 0 };
}

export function sumEntryMacros(entries: MealEntryWithRelations[]): MacroTotals {
  let energyKcal = 0;
  let protein = 0;
  let fat = 0;
  let carbs = 0;

  for (const entry of entries) {
    const macros = extractEntryMacros(entry);
    energyKcal += macros.energyKcal;
    protein += macros.protein;
    fat += macros.fat;
    carbs += macros.carbs;
  }

  return { energyKcal, protein, fat, carbs };
}

function getMacroPercents(totals: MacroTotals) {
  const proteinKcal = totals.protein * 4;
  const fatKcal = totals.fat * 9;
  const carbsKcal = totals.carbs * 4;
  const totalMacroKcal = proteinKcal + fatKcal + carbsKcal;

  return {
    proteinPercent:
      totalMacroKcal > 0 ? (proteinKcal / totalMacroKcal) * 100 : 0,
    fatPercent: totalMacroKcal > 0 ? (fatKcal / totalMacroKcal) * 100 : 0,
    carbsPercent: totalMacroKcal > 0 ? (carbsKcal / totalMacroKcal) * 100 : 0,
  };
}

function evaluateAgainstTargets(
  totals: MacroTotals,
  targets: Record<string, number>,
) {
  const issues: string[] = [];

  const energyTarget = targets["energy_kcal"] ?? 0;
  const proteinTarget = targets["protein"] ?? 0;
  const fatTarget = targets["fat"] ?? 0;
  const carbsTarget = targets["carbohydrates"] ?? 0;

  const energyPercent =
    energyTarget > 0 ? (totals.energyKcal / energyTarget) * 100 : undefined;

  const checkLower = (actual: number, target: number, label: string) => {
    if (!target) return;
    if ((actual / target) * 100 < 80) {
      issues.push(`Недостатньо ${label}`);
    }
  };

  const checkUpper = (actual: number, target: number, label: string) => {
    if (!target) return;
    if ((actual / target) * 100 > 115) {
      issues.push(`Забагато ${label}`);
    }
  };

  checkLower(totals.protein, proteinTarget, "білка");
  checkUpper(totals.fat, fatTarget, "жирів");
  checkUpper(totals.carbs, carbsTarget, "вуглеводів");

  if (energyPercent !== undefined) {
    if (energyPercent < 75) {
      issues.push("Замало енергії");
    } else if (energyPercent > 120) {
      issues.push("Забагато енергії");
    }
  }

  let energyStatus: "balanced" | "warning" | "critical" | undefined;

  if (energyPercent !== undefined) {
    if (issues.length === 0 && energyPercent >= 90 && energyPercent <= 110) {
      energyStatus = "balanced";
    } else if (issues.length <= 2) {
      energyStatus = "warning";
    } else {
      energyStatus = "critical";
    }
  }

  return {
    energyPercent:
      energyPercent !== undefined ? round1(energyPercent) : undefined,
    energyStatus,
    issues: issues.length ? issues : [],
  };
}

export function buildUserNutritionContext(
  entries: MealEntryWithRelations[],
  periodDaysCount: number,
): UserNutritionContext | undefined {
  const user = entries[0]?.user;

  if (!user) return undefined;

  return {
    user,
    targets: resolveUserTargets(user),
    mealDistribution: resolveMealDistribution(user),
    periodDaysCount,
  };
}

export function makeNutritionSnapshot(
  entries: MealEntryWithRelations[],
  periodDaysCount: number,
): AggregatedNutritionSnapshotDTO | undefined {
  if (!entries.length) return undefined;

  const totals = sumEntryMacros(entries);
  const percents = getMacroPercents(totals);
  const context = buildUserNutritionContext(entries, periodDaysCount);

  const periodTargets = context
    ? scaleTargetsForPeriod(context.targets, context.periodDaysCount)
    : undefined;

  const evaluation = periodTargets
    ? evaluateAgainstTargets(totals, periodTargets)
    : {
        energyPercent: undefined,
        energyStatus: undefined,
        issues: [] as string[],
      };

  return {
    energyKcal: round1(totals.energyKcal),
    protein: round1(totals.protein),
    fat: round1(totals.fat),
    carbs: round1(totals.carbs),
    proteinPercent: round1(percents.proteinPercent),
    fatPercent: round1(percents.fatPercent),
    carbsPercent: round1(percents.carbsPercent),
    energyPercent: evaluation.energyPercent,
    energyStatus: evaluation.energyStatus,
    controlledNutrients: makeControlledNutrientsSnapshot(
      entries,
      periodDaysCount,
    ),
    issues: evaluation.issues,
  };
}

export function makeMealTypeNutritionSnapshot(
  entries: MealEntryWithRelations[],
  periodDaysCount: number,
): AggregatedNutritionSnapshotDTO | undefined {
  if (!entries.length) return undefined;

  const totals = sumEntryMacros(entries);
  const percents = getMacroPercents(totals);
  const context = buildUserNutritionContext(entries, periodDaysCount);

  if (!context) {
    return {
      energyKcal: round1(totals.energyKcal),
      protein: round1(totals.protein),
      fat: round1(totals.fat),
      carbs: round1(totals.carbs),
      proteinPercent: round1(percents.proteinPercent),
      fatPercent: round1(percents.fatPercent),
      carbsPercent: round1(percents.carbsPercent),
    };
  }

  const mealTypeCode = entries[0]?.mealType.code;
  const fallbackMealsPerDay = context.user.mealSettings?.[0]?.mealsPerDay ?? 3;

  const share = getMealTypeShare(
    context.mealDistribution,
    mealTypeCode,
    fallbackMealsPerDay,
  );

  const periodTargets = scaleTargetsForPeriod(
    context.targets,
    context.periodDaysCount,
  );

  const adjustedTargets = Object.fromEntries(
    Object.entries(periodTargets).map(([code, value]) => [code, value * share]),
  );

  const evaluation = evaluateAgainstTargets(totals, adjustedTargets);

  return {
    energyKcal: round1(totals.energyKcal),
    protein: round1(totals.protein),
    fat: round1(totals.fat),
    carbs: round1(totals.carbs),
    proteinPercent: round1(percents.proteinPercent),
    fatPercent: round1(percents.fatPercent),
    carbsPercent: round1(percents.carbsPercent),
    energyPercent: evaluation.energyPercent,
    energyStatus: evaluation.energyStatus,
    issues: evaluation.issues,
  };
}

export function extractEntryNutrientsMap(
  entry: MealEntryWithRelations,
): NutrientTotalsMap {
  const result: NutrientTotalsMap = {};

  if (entry.recipe) {
    const totalWeight = entry.recipe.baseOutputWeightG || 0;
    const actualWeight = entry.amountInGrams ?? 0;
    if (!totalWeight || !actualWeight) return result;

    for (const nutrient of entry.recipe.nutrients) {
      const perGram = nutrient.valueTotal / totalWeight;
      result[nutrient.nutrient.code] =
        (result[nutrient.nutrient.code] ?? 0) + perGram * actualWeight;
    }
  }

  if (entry.product) {
    const factor = (entry.amountInGrams ?? 0) / 100;
    for (const nutrient of entry.product.nutrients) {
      result[nutrient.nutrient.code] =
        (result[nutrient.nutrient.code] ?? 0) + nutrient.valuePer100g * factor;
    }
  }

  return result;
}

export function sumEntryNutrients(
  entries: MealEntryWithRelations[],
): NutrientTotalsMap {
  const totals: NutrientTotalsMap = {};

  for (const entry of entries) {
    const map = extractEntryNutrientsMap(entry);
    for (const [code, value] of Object.entries(map)) {
      totals[code] = (totals[code] ?? 0) + value;
    }
  }

  return totals;
}

function resolveControlledStatus(
  actualValue: number,
  targetValue: number | undefined,
  direction: "min" | "max" | "target",
): "low" | "ok" | "high" | "unknown" {
  if (!targetValue || targetValue <= 0) return "unknown";

  const percent = (actualValue / targetValue) * 100;

  if (direction === "max") {
    return percent > 100 ? "high" : "ok";
  }

  if (direction === "min") {
    if (percent < 80) return "low";
    if (percent > 120) return "high";
    return "ok";
  }

  if (percent < 80) return "low";
  if (percent > 120) return "high";
  return "ok";
}

function makeControlledNutrientsSnapshot(
  entries: MealEntryWithRelations[],
  periodDaysCount: number,
): AggregatedControlledNutrientDTO[] | undefined {
  const context = buildUserNutritionContext(entries, periodDaysCount);
  if (!context) return undefined;

  const totals = sumEntryNutrients(entries);
  const periodTargets = scaleTargetsForPeriod(
    context.targets,
    context.periodDaysCount,
  );

  const items = getControlledNutrientDefinitions(context.user).map(
    (definition) => {
      const actualValue = totals[definition.code] ?? 0;
      const targetValue =
        periodTargets[definition.code] ?? definition.targetValue;
      const percentOfTarget =
        targetValue && targetValue > 0
          ? round1((actualValue / targetValue) * 100)
          : undefined;

      return {
        code: definition.code,
        name: definition.name,
        unit: definition.unit,
        actualValue: round1(actualValue),
        targetValue: targetValue ? round1(targetValue) : undefined,
        percentOfTarget,
        direction: definition.direction,
        status: resolveControlledStatus(
          actualValue,
          targetValue,
          definition.direction,
        ),
      };
    },
  );

  return items.filter(
    (item) => item.targetValue !== undefined || item.actualValue > 0,
  );
}

export function makeItemNutritionSnapshot(
  entries: MealEntryWithRelations[],
): AggregatedMealItemNutritionDTO | undefined {
  if (!entries.length) return undefined;

  const totals = sumEntryMacros(entries);
  const totalWeight = entries.reduce(
    (sum, entry) => sum + (entry.amountInGrams ?? 0),
    0,
  );
  const portions = entries.length;

  return {
    energyKcalPer100g:
      totalWeight > 0 ? round1((totals.energyKcal / totalWeight) * 100) : 0,
    energyKcalPerPortion:
      portions > 0 ? round1(totals.energyKcal / portions) : 0,
    proteinPerPortion: portions > 0 ? round1(totals.protein / portions) : 0,
    fatPerPortion: portions > 0 ? round1(totals.fat / portions) : 0,
    carbsPerPortion: portions > 0 ? round1(totals.carbs / portions) : 0,
  };
}

function scaleTargetsForPeriod(
  targets: Record<string, number>,
  periodDaysCount: number,
) {
  return Object.fromEntries(
    Object.entries(targets).map(([code, value]) => [
      code,
      value * periodDaysCount,
    ]),
  );
}
