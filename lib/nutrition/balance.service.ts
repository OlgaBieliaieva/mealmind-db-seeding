import { NutritionDisplayItem } from "./nutrition.adapter";
import { UserNutrientTargetsMap } from "@/types/user-nutrient-targets";
import { BalanceResult } from "@/types/nutrition-balance";

type Props = {
  nutrition: NutritionDisplayItem[];
  targets: UserNutrientTargetsMap;
  periodDays: number;
};

export function evaluateUserBalance({
  nutrition,
  targets,
  periodDays,
}: Props): BalanceResult {
  // 🔹 перетворюємо display[] → map<code, value>

  const nutritionMap: Record<string, number> = {};

  nutrition.forEach((item) => {
    nutritionMap[item.code] = item.value;
  });

  // =========================
  // 🔥 ENERGY
  // =========================

  const energyTarget = targets["energy_kcal"] ?? 0;
  const energyActual = nutritionMap["energy_kcal"] ?? 0;

  const energyPercent =
    energyTarget > 0 ? (energyActual / (energyTarget * periodDays)) * 100 : 0;

  // =========================
  // 🔥 MACRO DISTRIBUTION
  // =========================

  const protein = nutritionMap["protein"] ?? 0;
  const fat = nutritionMap["fat"] ?? 0;
  const carbs = nutritionMap["carbohydrates"] ?? 0;

  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;
  const carbsKcal = carbs * 4;

  const totalMacroKcal = proteinKcal + fatKcal + carbsKcal || 1;

  const macroPercents = {
    protein: (proteinKcal / totalMacroKcal) * 100,
    fat: (fatKcal / totalMacroKcal) * 100,
    carbs: (carbsKcal / totalMacroKcal) * 100,
  };

  // =========================
  // 🔥 CRITICAL NUTRIENTS CHECK
  // =========================

  const issues: string[] = [];
  const highlightedNutrients: string[] = [];

  const checkNutrient = (code: string, label: string, isUpperLimit = false) => {
    const target = targets[code];
    if (!target) return;

    const actual = nutritionMap[code] ?? 0;
    const percent = (actual / (target * periodDays)) * 100;

    if (!isUpperLimit && percent < 80) {
      issues.push(`Недостатньо ${label}`);
      highlightedNutrients.push(code);
    }

    if (isUpperLimit && percent > 110) {
      issues.push(`Перевищено ${label}`);
      highlightedNutrients.push(code);
    }
  };

  // Мінімальні (повинні бути ≥)
  checkNutrient("protein", "білка");
  checkNutrient("fiber", "клітковини");

  // Максимальні (повинні бути ≤)
  checkNutrient("sugar", "цукру", true);
  checkNutrient("sodium", "натрію", true);
  checkNutrient("cholesterol", "холестерину", true);

  // =========================
  // 🔥 STATUS
  // =========================

  let status: "balanced" | "warning" | "critical" = "balanced";

  if (issues.length > 0) {
    status = issues.length > 2 ? "critical" : "warning";
  }

  return {
    energyPercent,
    macroPercents,
    status,
    issues,
    highlightedNutrients,
  };
}
