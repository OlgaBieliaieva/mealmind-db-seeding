import {
  UserNutritionTargets,
  UserBalanceResult,
} from "@/types/nutrition-balance";
import { NutritionDisplayItem } from "./nutrition.adapter";

type EvaluateParams = {
  nutrition: NutritionDisplayItem[];
  targets: UserNutritionTargets;
  periodDays: number;
};

export function evaluateUserBalance({
  nutrition,
  targets,
  periodDays,
}: EvaluateParams): UserBalanceResult {
  const getValue = (code: string) =>
    nutrition.find((n) => n.code === code)?.value ?? 0;

  const energy = getValue("energy_kcal");
  const protein = getValue("protein");
  const fat = getValue("fat");
  const carbs = getValue("carbohydrates");
  const sugar = getValue("sugar");
  const sodium = getValue("sodium");

  const targetEnergy = targets.calories * periodDays;
  const targetProtein = targets.protein_g * periodDays;
  const targetFat = targets.fat_g * periodDays;
  const targetCarbs = targets.carbs_g * periodDays;

  const energyPercent = targetEnergy ? (energy / targetEnergy) * 100 : 0;

  const proteinPercent = targetProtein ? (protein / targetProtein) * 100 : 0;

  const fatPercent = targetFat ? (fat / targetFat) * 100 : 0;

  const carbsPercent = targetCarbs ? (carbs / targetCarbs) * 100 : 0;

  const issues: string[] = [];
  const highlighted: string[] = [];

  // 🔴 Critical conditions
  if (energyPercent < 60 || energyPercent > 150) {
    issues.push("Енергія критично поза межами");
  }

  // 🟡 Warning conditions
  if (proteinPercent < 80) {
    issues.push("Недостатньо білка");
    highlighted.push("protein");
  }

  if (sugar > 0 && sugar > 0.1 * targetEnergy) {
    issues.push("Перевищено цукор");
    highlighted.push("sugar");
  }

  if (sodium > 0 && sodium > 2300 * periodDays) {
    issues.push("Перевищено натрій");
    highlighted.push("sodium");
  }

  const status: UserBalanceResult["status"] =
    issues.length === 0
      ? "balanced"
      : energyPercent < 60 || energyPercent > 150
        ? "critical"
        : "warning";

  return {
    energyPercent,
    macroPercents: {
      protein: proteinPercent,
      fat: fatPercent,
      carbs: carbsPercent,
    },
    status,
    issues,
    highlightedNutrients: highlighted,
  };
}
